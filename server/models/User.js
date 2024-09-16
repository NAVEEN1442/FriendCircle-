
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    friend_list:[
        {
            type:String,
        },
    ],
    friend_Request:[
        {
            type:String,
        },
    ],
    token:{
        type:String,
    },
    otp:{
        type:String,
        required:true,
    },
    created_At:{
        type:Date,
        
    },
    interest:[
        {
            type:String,
        },
    ],

})

const User = mongoose.model("User",userSchema);
module.exports = User;