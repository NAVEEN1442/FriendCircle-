const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    created_At:{
        type:Date,
        expireIn:"2h",
        default:Date.now(),
    },

})

async function otpMailSender (email,otp){
    try {      
        console.log("email and otp ",email,otp)
        const response = await mailSender(
            email,
            "OTP IS :",
            `${otp}`
        )
        console.log("response of the otp sender",response);
    } catch (error) {
        console.log(error);
    }
}

OTPSchema.pre("save",async function(next){
    
    if(this.isNew){
        try {

            await otpMailSender(this.email,this.otp);

        } catch (error) {
            next(error);
        }
    }
    next();

})



const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;

