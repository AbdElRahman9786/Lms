import React from 'react'
import Navbar from './Navbar/NavBar'
import { Outlet } from 'react-router-dom'

const LayOut = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        
    </div>
  )
}

export default LayOut