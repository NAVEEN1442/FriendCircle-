import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sendotp, signUp } from '../Services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';


function OTP() {

    const location = useLocation();
    const {email} = location.state || {};
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {signupData} = useSelector((state)=>state.auth)



    const verifyAndSignup = () =>{

        const {email, password, username, confirmPassword} = signupData


        dispatch(signUp(email, username, password, confirmPassword, otp, navigate))
    }
    


  return (
    <div className=' backdrop-blur-sm flex border-2 bg- border-white h-screen w-9/12  mx-auto my-20 gap-12 justify-center items-center flex-col'>
        <div className=' flex gap-4 justify-center items-center flex-col '>
            <div className='text-yellow-300  text-[44px]'>
            Verify Your Email
            </div>

            <div className=' text-[20px]'>
                A verification OTP has been sent to your Gmail input it below to Verify
            </div>

        </div>

        

        <div className=' flex gap-6 justify-center items-center flex-col '>
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            placeholder='-'
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
                <input

                {...props}

                placeholder="-"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 155, 155, 0.18)",
                  }}
                className="w-[48px] text-[24px] lg:w-[60px] border-2 bg-black rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"

                />
                
                
            )}

            containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button onClick={verifyAndSignup} className='button-30' >
                verify
            </button>
        </div>

        <div>
            Please Note that this code will expire in 5min
        </div>

        <div className='flex w-6/12 justify-between items-center'>
        <NavLink to="/signup">
        Back to SignUp
        </NavLink>
            
            <div onClick={()=>{dispatch(sendotp(email,navigate))}}>
            Resend
            </div>
        </div>

       


    </div>
  )
}

export default OTP