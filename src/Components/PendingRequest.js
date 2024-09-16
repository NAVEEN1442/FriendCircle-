import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { pendingFriendRequests } from '../Services/operations/friend';
import { ImCross } from "react-icons/im";
import RequestCard from './RequestCard';


function PendingRequest({onClose}) {

    const [requests,setRequests] = useState([]);

    const dispatch = useDispatch();

    function closeModal(){
        onClose();
    }

    const fetchPendingRequests = async ()=>{

        try {
            
            const response = await dispatch(pendingFriendRequests());

            

            if(response){
                setRequests(response);
            }

        } catch (error) {
            console.log("error", error);
        }

    }

    useEffect(()=>{
        fetchPendingRequests();
    },[])





  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto">
    <div className="w-[400px] text-white flex flex-col items-center justify-center h-[600px] gap-[10px] bg-gray-500 shadow-inner shadow-white rounded-[30px] border p-6">
            <div onClick={closeModal} className=' w-[100%] h-[30px] flex items-center justify-end ' ><ImCross /></div>
            
           <div className=' w-[100%] h-[100%] ' >
           {
                requests.length > 0 ? requests.map((item,index)=>(
                    <RequestCard key={index} name={item} />
                )) : <p>No Requests Pending</p>
            }

           </div>


        </div>
      </div>
    
  )
}

export default PendingRequest