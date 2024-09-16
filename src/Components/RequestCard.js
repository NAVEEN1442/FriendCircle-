import React from 'react'
import { useDispatch } from 'react-redux'
import { acceptRequest } from '../Services/operations/friend';
import { useNavigate } from 'react-router-dom';

function RequestCard({name}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const acceptInvite = async () =>{
    try {
      
      dispatch(acceptRequest(name));

    } catch (error) {
      
    }
  }

  return (
    <div className=' w-[100%] flex items-center justify-between p-5 h-[30%] bg-slate-800 border-4 shadow-inner ' >

       <p>{name}</p>

       <button onClick={acceptInvite} className=' border-2 rounded-xl bg-[#126d12]  w-[120px] h-[40px] justify-center items-center flex text-[17px] ' >Accept +</button>


        
    </div>
  )
}

export default RequestCard