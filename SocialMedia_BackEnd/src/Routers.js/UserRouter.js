const express=require('express');
const  {register,logIn,logOut,updatePassword,following,updateProfile,deleteAccount,myProfile,getUserProfile,getAllUsers}=require('../Controller.js/UserController');
const {isAuthenticated,isAuthorized}=require('../../MiddleWare.js/isAuthenticated');


const userRouter= express.Router();

userRouter.post('/Register',register);
userRouter.post('/logIn',logIn);
userRouter.get('/logOut',isAuthenticated,logOut);
userRouter.put('/updatePassword',isAuthenticated, updatePassword);
userRouter.get('/followingRequest:id',isAuthenticated,following);
userRouter.put('/updateProfile',isAuthenticated,updateProfile);
userRouter.delete('/deleteAccount',isAuthenticated,deleteAccount);
userRouter.get('/myProfile',isAuthenticated,myProfile);
userRouter.get('/getUserProfile',isAuthenticated,isAuthorized("admin"),getUserProfile);
userRouter.get('/getAllUser',isAuthenticated,isAuthorized("admin"),getAllUsers);



module.exports=userRouter;