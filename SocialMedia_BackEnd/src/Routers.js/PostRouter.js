const express=require('express');
const {createPost,likeOrUnlike,deletePost,updateCaption,commentOnPost}=require('../Controller.js/PostControllers');
const {isAuthenticated}=require('../../MiddleWare.js/isAuthenticated');
const postRouter=express();

postRouter.post('/createPost',isAuthenticated,createPost);
postRouter.put('/likeOrUnlike/:id',isAuthenticated,likeOrUnlike);
postRouter.delete('/deletePost/:id',isAuthenticated,deletePost);
postRouter.put('/updateCaption/:id',isAuthenticated,updateCaption);
postRouter.post('/comment/:id',isAuthenticated,commentOnPost);


module.exports=postRouter;