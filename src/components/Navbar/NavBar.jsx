// src/Navbar.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import img from '../../Images/Computer Science NEW LOGO.png'
import { LoginContext } from '../../Context/logInContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";


const Navbar = () => {
  const {logIn , setLogIn } = useContext(LoginContext);
 
  return (
    <nav className="bg-blue-500 p-4 ">
      <div className="flex justify-between items-center">
        <Link to="/Home" className="text-white text-lg font-bold"><img className='w-[50px]' src={img} alt='img-logo' /></Link>
        
       {logIn&&   

       <ul className='flex justify-center text-white'>   
    <li className='mr-3'><Link to='/allrooms'>Get All Rooms</Link></li>
    <li><Link to='/' className='hover:text-red-400 duration-300' onClick={()=>{setLogIn(false)
      Cookies.remove('token')
    }}>LogOut  <FontAwesomeIcon icon={faRightFromBracket} /></Link></li>
    </ul>
  }
  
  
      </div>

    </nav>
  );
};

export default Navbar;
