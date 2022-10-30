const http=require('http');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
const app=require('./src/app');
const cloudinary=require('cloudinary');
const cors = require('cors');
dotenv.config({path:'config/config.env'});
app.use(cors());
const server=http.createServer(app);


// connection for cloud
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
  })

//connection for database and then start server  
connectDatabase().then((mess)=>{
    console.log(mess);
    server.listen(process.env.PORT,()=>{
        console.log(`Your server is listening on PORT ${process.env.PORT}`);
    });
}).catch((e)=>{
    console.log(e);
});
