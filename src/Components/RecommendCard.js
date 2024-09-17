import React from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { sendRequestUSER } from '../Services/operations/friend';
import { CgBlock } from 'react-icons/cg';

function RecommendCard({name}) {

  const dispatch = useDispatch();

  const addFriend = async (friendUsername) => {
    try {
      if (friendUsername.trim().length === 0) {
        toast.error("Enter the username first");
        return;
      }

      console.log('username is:', friendUsername);
      dispatch(sendRequestUSER(friendUsername));
    
      
    } catch (error) {
      console.log(error);
    }
  }


  return (

   

    <div className=' shadow-inner shadow-white flex gap-4 justify-center items-center text-[25px] 
    border-4 rounded-xl hover:scale-105 hover:duration-75 bg-[black] text-white h-[80px] w-[100%] ' >
 {
      console.log("in the reco card")
    }
        {name}

        <button onClick={()=>{addFriend(name)}} className=' text-[30px] w-[20px] h-[full] text-red-700  ' ><CgBlock /></button>

    </div>
  )
}

export default RecommendCard