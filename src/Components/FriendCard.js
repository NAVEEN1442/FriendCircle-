import React from 'react'
import { CgBlock } from "react-icons/cg";

import { useDispatch } from 'react-redux';
import { removeFriend } from '../Services/operations/friend';


function FriendCard({name}) {

  const dispatch = useDispatch();


  const removeFriendList = async ()=>{

    try {
      
      dispatch(removeFriend(name));

    } catch (error) {
      console.log("error in remove friend",error)
    }

  }
  

  return (


    <div className=' shadow-inner shadow-white flex gap-4 justify-center items-center text-[25px] 
    border-4 rounded-xl hover:scale-105 hover:duration-75 bg-[black] text-white h-[100px] w-[250px] ' >

        {name}

        <button onClick={removeFriendList} className=' text-[30px] w-[20px] h-[full] text-red-700  ' ><CgBlock /></button>

    </div>
  )
}

export default FriendCard