const JWT=require('jsonwebtoken');
const errorClass=require('../utils/errorClass');
const User=require('../src/Models.js/UserModel');
const isAuthenticated=async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return next(new errorClass('please Sign In',401));
    };

    const decodeToken= JWT.verify(token,process.env.JWT_PRIVATE_ID);

    req.user= await User.findById(decodeToken.id);

    next();
};

const isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        }else{
            return next(new error("You aren't authorized",401));
        }
    };
};

module.exports={isAuthenticated,isAuthorized};