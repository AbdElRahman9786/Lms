import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/logInContext";
import {
    QueryClient,
    QueryClientProvider,
    
  } from '@tanstack/react-query'
 

export default function Guard({children}){
    
    const navigate=useNavigate();
    const {logIn}=useContext(LoginContext)
    useEffect(()=>{
        
    
if(!logIn){
    navigate('/')
}
    },[])

    return children;

}