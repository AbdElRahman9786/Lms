// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import img from '../../Images/Computer Science NEW LOGO.png'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 ">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold"><img className='w-[50px]' src={img} alt='img-logo' /></Link>
        <ul>
    <li><Link to='/allrooms'>Get All Rooms</Link></li>
  </ul>
      </div>

    </nav>
  );
};

export default Navbar;
