const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator  = require("otp-generator")
const OTP = require("../models/OTP")
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

//signup


exports.signUp = async (req, res) => {
    try {
        const { email,username, password, confirmPassword, otp} = req.body;

        if (!email || !username || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        //Username should be unique

        const existingUsername = await User.findOne({username});

        if(existingUsername){
        return res.status(400).json({
                success:false,
                message:"Username already exists please choose a different username",
            })
        }

        //check for the otp and verify

    const savedOTP = await OTP.findOne({email}).sort( {created_At : -1} ).limit(1);
    const confirmOTP = savedOTP.otp;
    console.log("savedotp",confirmOTP)
    console.log("otp in body",otp)

    if(savedOTP.length ===0){
        return res.status(401).json({
            success:false,
            message:"OTP invalid",
        })
    }

    else if(confirmOTP !== otp){
        return res.status(401).json({
            success:false,
            message:"OTP dosen't match",
        })
    }
        console.log("here")
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("here")
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            otp,
            created_At:Date.now(),
        });
        console.log("here")
        return res.status(201).json({
            success: true,
            user,
            message: "Signup successful",
        });
       
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signup",
        });
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("in login")

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist. Please sign up first.",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const payload = {
            email: existingUser.email,
            id: existingUser._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        existingUser.token = token;
        existingUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            user: existingUser,
            token,
            message: "User logged in successfully",
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during login",
        });
    }
};
exports.sendotp = async (req,res) =>{

    try {
        

    const {email} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            success:"false",
            message:"Email already exists please login"
        })
    }

    const otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:true,
    })

    let uniqueOtp = crypto
            .createHash("sha256")
            .update(otp + email + Date.now())
            .digest("hex")
            .substring(0, 6);


    const newOTP = new OTP({email,otp : uniqueOtp,created_At:Date.now()});
    await OTP.create(newOTP);

    
    return res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        data:uniqueOtp,
    });


    } catch (error) {
        console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
    }


}


