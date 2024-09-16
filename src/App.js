import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from "./Routes/Signup";
import Login from './Routes/Login';
import OTP from './Routes/OTP';
import Main from './Routes/Main';

function App() {
  return (
    <div className=' font-CAS overflow-scroll App  text-white flex flex-col background md:w-full overflow-x-hidden h-screen bg-blue-900  ' >


       <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/verifyEmail' element={<OTP/>}/>

       </Routes>


    </div>
  );
}

export default App;
