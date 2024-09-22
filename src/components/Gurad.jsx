import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/logInContext";


export default function Guard({children}){
    const [mounted,setMounted]=useState(false)
    const navigate=useNavigate();
    const {logIn}=useContext(LoginContext)
    useEffect(()=>{
        setMounted(true)
    
if(!logIn){
    navigate('/')
}
    },[])

    return mounted && children;

}