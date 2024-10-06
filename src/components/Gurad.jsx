import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/logInContext";
import {
    QueryClient,
    QueryClientProvider,
    
  } from '@tanstack/react-query'
  const queryClient = new QueryClient()

export default function Guard({children}){
    
    const navigate=useNavigate();
    const {logIn}=useContext(LoginContext)
    useEffect(()=>{
        
    
if(!logIn){
    navigate('/')
}
    },[])

    return(
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );

}