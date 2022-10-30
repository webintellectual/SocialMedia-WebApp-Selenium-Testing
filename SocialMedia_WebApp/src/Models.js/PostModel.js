const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
      caption:{
        type:String,
      },

      avatars:[
        {
            public_Id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
      ],

      comments:[{
        name:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        comment:{
            type:String,
            required:true
        }
      }],

      likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
      ],

      owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
      }
});

module.exports = mongoose.model('Post',PostSchema); 
