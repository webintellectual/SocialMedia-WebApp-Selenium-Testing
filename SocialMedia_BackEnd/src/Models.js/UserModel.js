const mongoose = require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your UserName"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Correct Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        select:false,
        minlength:[6,"Atleast 6 character Password"]
    },

    role:{
        type:String,
        default:"user"
    },

    joinedAt:{
        type:Date,
        default:Date.now,
    },

    avatar:{
        public_Id:{
            type:String
        },
        public_Url:{
            type:String
        }
    },
    cover:{
        public_Id:{
            type:String
        },
        public_Url:{
            type:String
        }
    },
    posts:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Post"
        }
    ],
    followers:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"User"
        }
    ],
    followings:[
         {
          type:mongoose.Schema.ObjectId,
          ref:"User"
          }
    ],
    about:{
        firstName:String,
        lastName:String,
        livesIn:String,
        country:String,
        relation:String,
        workAt:String
    }
});

UserSchema.pre('save',async function(next){
    //only generate hash when password is modified
       if(!this.isModified("password")){
           next();
       }
       this.password=await bcryptjs.hash(this.password, bcryptjs.genSaltSync(12));
    });

UserSchema.methods.isCorrectPassword= async function(password){
    return await bcryptjs.compare(password,this.password);
};

UserSchema.methods.getJWTToken = async function(){
     return await jwt.sign({id:this._id},process.env.JWT_PRIVATE_ID,{
        expiresIn:process.env.JWT_EXPIRE
     });
} 
module.exports= mongoose.model('User',UserSchema);