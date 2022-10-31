const Post =require('../Models.js/PostModel');
const User=require('../Models.js/UserModel');
const errorClass=require('../../utils/errorClass');
const asyncHandler=require('../../MiddleWare.js/asyncHandler');
const cloudinary = require('cloudinary');

//Creating Post
const createPost=asyncHandler(async (req,res,next)=>{
    let img=[];
    if(typeof req.body.avatar === 'string'){
          img.push(req.body.avatar);
    }else{
         img=req.body.avatar;
    };
    
    let imageLinks=[];

    //generating image links from cloud
    for(let i=0;i<img.length;i++){
        const mycloud = await cloudinary.v2.uploader.upload(img[i], {
            folder: "Post",
        });
        imageLinks.push({ public_Id: mycloud.public_id, url: mycloud.secure_url });
    };
    req.body.avatars = imageLinks;
     
    const post=await Post.create({...req.body,owner:req.user._id});
    
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();
    res.status(201).json({
        success:true,
        post
    });  
});

// like Or Unlike the Post
const likeOrUnlike = asyncHandler(async (req,res,next)=>{
    
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(new errorClass("Post not Found",404));
    };
    //already liked
    const isUserAlreadyLiked=post.likes.includes(req.user._id);
    if(isUserAlreadyLiked){
               post.likes.splice(post.likes.indexOf(req.user._id),1);
               await post.save();
               res.status(200).json({
                   success:true,
                   message:"Unliked"
               });
    }else{
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json({
            success:true,
            message:"liked"
        });
    };
   
});

// delete Post
const deletePost=asyncHandler(async (req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
         return next(new errorClass("Post not found",404));
    };
    // no authorization
    if(!post.owner.equals(req.user._id)){
        return next(new errorClass("You cannot Delete this Post", 401));
    };
    await  Post.deleteOne(post._id);
    const user = await User.findById(req.user._id);
    user.posts.splice(user.posts.indexOf(post._id),1);
    await user.save();
    res.status(200).json({
        success: true,
        message: "delete succesfully"
    });
});

//for updating Caption
const updateCaption = asyncHandler(async (req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(new errorClass("Post not found",404));
    };

    if(post.owner.toString()!==req.user._id.toString()){
        return next(new errorClass("You are n't authenticated to change caption",401));
    };
    post.caption=req.body.caption;
    await post.save();
    res.status(200).json({
        success:true,
        message:"Caption Updated sucessfully"
    });
});

// for commenting on Post
const commentOnPost = asyncHandler(async(req,res,next)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return next(new errorClass("Post not found",404));
    };
    let comment = {
        name:req.user._id,
        comment:req.body.comment
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).send({
        success:true,
        message:"Commented Successfully"
    })
})




module.exports={createPost,likeOrUnlike,deletePost,updateCaption,commentOnPost};