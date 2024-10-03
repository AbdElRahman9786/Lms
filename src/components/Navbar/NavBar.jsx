// src/components/Navbar.js
import { useContext, useState } from 'react';
import img from '../../Images/Computer Science NEW LOGO.png'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LoginContext } from '../../Context/logInContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const {logIn}=useContext(LoginContext);


  return (
 <>
 <div className="navbar bg-[#910029] text-white sticky top-0 py-4 z-20 ">
  <Container className='flex justify-between items-center'>
  <div className="logo">
    <img src={img} alt="image_logo" className='w-14' />
  </div>
  {logIn && (
  <div className="links">
    <ul className="flex items-center space-x-5 sm:hidden">
      <li><NavLink to='/Allrooms'>Allrooms</NavLink></li>
      <li><Link to='/'>Grades</Link></li>
      <li><Link to='/'>Profile</Link></li>
    </ul>
    <div className="2xl:hidden sm:block relative">
      <Button variant='contained' color='primary' onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon />
      </Button>
      <ul
        className={`absolute right-5 bg-slate-300 p-5 rounded-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-5 scale-95'
        }`}
      >
        <li><h1>Hello</h1></li>
        <li><h1>Hello</h1></li>
        <li><h1>Hello</h1></li>
      </ul>
    </div>
  </div>
)}

 
  </Container>
 </div>
 <Outlet/>
 </>
  );
};

export default Navbar;
