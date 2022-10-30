const sendToken = require('../../utils/sendToken');
const User = require('../Models.js/UserModel');
const Post = require('../Models.js/PostModel');
const asyncHandler=require('../../MiddleWare.js/asyncHandler');
const error= require('../../utils/errorClass');
const cloudinary =require('cloudinary');

//Registration
const register = asyncHandler( async (req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({name,email,password});
    const token=await user.getJWTToken();
    sendToken(user,token,res);
   
});

//logIn
const logIn = asyncHandler(async (req,res,next)=>{
     const user=await User.findOne({email:req.body.email}).select('+password');

     if(!user){
        return next(new error("Email or Password is wrong",400));
     };
     const isCorrectPassword = await user.isCorrectPassword(req.body.password);
     if(!isCorrectPassword){
        return next(new error("Email or Password is wrong",400));
     };
     const token = await user.getJWTToken();
     sendToken(user,token,res);
});

//LogOut
const logOut=asyncHandler(async (req,res,next)=>{
   res.status(200).cookie("token",null,{expires:new Date( Date.now()+1000),httpOnly:true}).json({
      success:true,
      message:"LogOut Succesfully"
   });
});

//updatePassword
const updatePassword = asyncHandler(async (req,res,next)=>{
   const user=await User.findById(req.user._id).select("+password");
   const {oldPassword, newPassword} = req.body;
   const isCorrectPassword = await user.isCorrectPassword(req.body.oldPassword);
   if(!isCorrectPassword){
         return next(new error("Old Password is wrong",400));
   };
  
   user.password=newPassword;
   await user.save();

   res.status(200).json({
      success:true,
      message:"Passsword updated successfully"
   });

});


//following
const following=asyncHandler(async (req,res,next)=>{
       const user=await User.findById(req.params.id);
       if(!user){
         return next(new error("User not found",404));
       };
       
       req.user.followings.push(user._id);
       user.followers.push(req.user._id);

       res.status(200).send({
         success:true,
         message:"following by you"
       });
      
});

//update Profile
const updateProfile=asyncHandler(async (req,res,next)=>{
   const {name,email,avatar} = req.body;
   const user = await User.findById(req.user._id);
   // for updating the image
   if(avatar){
      await cloudinary.v2.uploader.destroy(user.avatar.public_Id);
      const cloud= await cloudinary.v2.uploader.upload(avatar,{
         folder: "Post",
      });
      user.avatar.public_Id=cloud.public_id;
      user.avatar.public_Url=cloud.secure_url;
   };
   user.name=name;
   user.email=email;
   await user.save();
   res.status(200).json({
      success:true,
      message:"Updated Successfully"
   });

});

//for Deleting My Account
const deleteAccount = asyncHandler(async(req,res,next)=>{
   const user=await User.findById(req.user._id);
   const posts= user.posts;
   await user.delete();
   // Deleting the post of the user
   for(let i=0 ;i<posts.length;i++){
      let post = await Post.findById(posts[i]);
      await post.remove();
   };
   res.status(200).cookie('token',null,{expires:new Date( Date.now()),httpOnly:true}).send({
      success: true,
      message: "Account delete Successfully"
   });
});

// My Profile
const myProfile = asyncHandler(async (req,res,next)=>{
   const user = await User.findById(req.user._id).populate("posts");
   res.status(200).json({
      success:true,
      user
   });
});


// admin

// getting user profile
const getUserProfile = asyncHandler(async ()=>{
   const user = await User.findById(req.params.id);
   if(!user){
      return next(new error('User not found', 404));
   };
   res.status(200).send({
      user
   });
});

// getting all users
const getAllUsers = asyncHandler(async ()=>{
   const users = await User.find();
   res.status(200).send({
      users
   });
});

module.exports={register,logIn,logOut,updatePassword,following,updateProfile,deleteAccount,myProfile,getUserProfile,getAllUsers};

