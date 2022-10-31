const mongoose = require('mongoose');

const connectDatabase=()=>{
    return new Promise(async (resolve, reject)=>{
        try{
             await mongoose.connect(process.env.DATABASE_URL);
             resolve('Database has connect successfully...');
        }catch(e){
            reject(e);
        };
    })
};

module.exports=connectDatabase;