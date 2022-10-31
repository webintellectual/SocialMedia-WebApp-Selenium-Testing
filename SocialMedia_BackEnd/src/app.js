const express=require('express');
const userRouter=require('./Routers.js/UserRouter');
const postRouter=require('./Routers.js/PostRouter');
const errorMiddleWare=require('../MiddleWare.js/errorMiddleWare');
const cookieParser=require('cookie-parser');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());
//middleWare
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials:true
      }
));
app.use(express.json());
app.use(cookieParser());


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