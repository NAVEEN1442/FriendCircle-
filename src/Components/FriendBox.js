import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCircle } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { sendRequestUSER, showAllFriends } from '../Services/operations/friend';
import FriendCard from './FriendCard';

function FriendBox() {

  const [inputValue, setInputValue] = useState("");
  const [allFriends,setAllFriends] = useState([]);

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

  const fetchFriends = async ()=>{

    try {
      
      const response = await dispatch(showAllFriends());

      console.log("response in the friendzz box",response);

      if(response){
        setAllFriends(response);
      }


    } catch (error) {
      console.log(error);
    }

  }
  
  useEffect(()=>{
    fetchFriends();
  },[])



  return (
    <div className='w-full h-screen items-center justify-center gap-24 flex rounded-2xl shadow-xl shadow-cyan-800 border-4 border-[#1c1038]'>

      <div className='items-center justify-evenly flex flex-col rounded-2xl h-full w-[30%]'>
        <div className='pl-3 pr-3 h-[10%] flex justify-between items-center w-full bg-white rounded-3xl'>

          <button
            onClick={() => {
              addFriend(inputValue); // Pass inputValue directly to addFriend
            }}
            className='text-white bg-[#4aa523] p-2 w-[32%] gap-2 rounded-md items-center flex h-[80%]'>
            <FaTelegramPlane /> Add Friend
          </button>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search your friend's Username"
            className='pl-2 text-black h-[70%] w-[80%] rounded-md'
          />
        </div>

        <div className='flex p-3 flex-col items-center h-[80%] w-full bg-white rounded-3xl'>
          <div className='w-[100%] text-[22px] flex gap-3 flex-col items-center text-black'>
            Recommended Friends
            <div className='h-[3px] w-10/12 bg-gray-600'></div>
          </div>

          <div>
            {// Recommended cards yha aayenge
            }
          </div>
        </div>
      </div>

      <div className='bg-white flex flex-col rounded-2xl h-[90%] w-[60%]'>
            <div className='w-[100%] p-3 text-[22px] flex gap-3 flex-col items-center text-black'>
              <p className='flex items-baseline justify-baseline gap-2'>
                Available Friends
                <span className='text-green-400 text-[12px]'><FaCircle /></span>
              </p>
              <div className='h-[3px] w-10/12 bg-gray-600'> </div>

            </div>

            <div className=' h-[100%] p-5 flex justify-center flex-wrap gap-5 w-full  '  >

            {

                  allFriends.length > 0 ? allFriends.map((item,index)=>(
                    <FriendCard name={item} key={index} />
                  )) : <p className=' text-black ' >No Friends Added</p>
              }

            </div>

      </div>
    </div>
  )
}

export default FriendBox;
