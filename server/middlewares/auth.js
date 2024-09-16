const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

exports.auth = async (req,res,next)=>{

    try {
        
        //extraction of token 

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is not present",
            })
        }

        try {
            
            //verify the token , check who's logged in

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("decode",decode);

        //get the data

        req.user = decode;

        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Token is not valid",
            })
        }

        next();




    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }

}
