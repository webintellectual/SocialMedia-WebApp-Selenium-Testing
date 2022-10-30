const express=require('express');
const userRouter=require('./Routers.js/UserRouter');
const postRouter=require('./Routers.js/PostRouter');
const errorMiddleWare=require('../MiddleWare.js/errorMiddleWare');
const cookieParser=require('cookie-parser');
const cors = require('cors');
const path = require('path');



const app = express();

//middleWare
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended:true
}));

//Routers
app.use('/api',userRouter);
app.use('/api',postRouter);
app.use(express.static(path.join(__dirname,'../build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
});

//error handling middleWare
app.use(errorMiddleWare);

module.exports = app; 