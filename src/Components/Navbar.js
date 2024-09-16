
import img1 from '../assets/Logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBell } from "react-icons/fa";
import { useAuth } from '../Components/AuthContext/AuthContext';
import { logout } from '../Services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PendingRequest from './PendingRequest';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModel,setShowModel] = useState(false);

  const logoutHandler = () =>{
    setIsLoggedIn(false)
    dispatch(logout(navigate));
  }

  const openModal = () => {
    setShowModel(true);
    
  };

  const closeModal = () => {
    setShowModel(false);
    
  };

  return (
    <div className=' md:gap-0 gap-40  mx-auto mt-3 text-white justify-evenly font-bold text-[22px] rounded-xl flex items-center w-11/12  '>

    <div> Hello !, {} </div>

    <NavLink to="/">
    <img src={img1} alt='Not Available Due to some error' className=' w-[100px] h-[100px] md:w-[150px] md:h-[150px]' />
    </NavLink>
   
        <div className=' flex w-[650px]  items-center  h-[100%] ' >
            <div className='w-[200px] bg-[white] h-[3px]' ></div>
            <div className='w-[74%]  h-[50%]' >"The only way to have a friend is to be one."</div>
            <div className='w-[200px] bg-[white] h-[3px]' ></div>
        </div>
        

        <div>
        {
          isLoggedIn ? (
            <button onClick={logoutHandler} className='button-30'>LogOut</button>

          ) : (
            
            <NavLink to={"/login"} >
            <button className='button-30 w-[120px] md:w-[150px] '>Login/SignUp</button>
            </NavLink>
            
          )
        }

        </div>


        <button onClick={openModal} className=' h-[40px] w-[50px] shadow-inner hover:bg-[#232b93] shadow-white border-2 border-white flex items-center justify-center  rounded-xl bg-[#1b3d99] text-white ' >
        <FaBell />
        </button>

        {showModel && <PendingRequest onClose={closeModal} />}
        

        
        
        
        
    </div>
  )
}

export default Navbar