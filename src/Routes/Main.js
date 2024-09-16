import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import FriendBox from '../Components/FriendBox'

function Main() {
  return (
    <div className=' p-2 flex flex-col justify-normal items-center h-screen w-full bg-[#050124] ' >
        <Navbar/>
        <FriendBox/>
    </div>
  )
}

export default Main