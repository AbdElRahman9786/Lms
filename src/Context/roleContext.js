import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
export const roleContext = createContext([]);
function RoleProvider(props){
    let t=Cookies.get('token');
    const[room,setRoom]=useState([]);
    const config = {
     headers: { Authorization: `Bearer ${t}` }
 };


    useEffect(()=>{
     axios.get('https://localhost:7015/api/ClassRoom/All',config).then(res=>setRoom(res.data.data)).catch(err=>console.log(err))
    },[]);

    return(
        <>
            <roleContext.Provider value={room}>{props.children}</roleContext.Provider>
        
        
        </>
    )
}
export default RoleProvider;