import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addnewroom(){
    const [roomNumber,setRoomNumber]=useState('');
    const [building,setroombuilding]=useState('');
    const [capacity,setroomCapacity]=useState('');
    let token = Cookies.get('token');
    const navigate=useNavigate();
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
             
        }
    };
    const handeladd=(e)=>{
        e.preventDefault();
        axios.post('https://localhost:7015/api/ClassRoom',{roomNumber,building,capacity},config)
        .then(res=>{console.log(res)
        navigate('/allrooms')}
    ).catch(err=>console.log(err));
    }
 
   
    return(
        <>
        <form onSubmit={handeladd}>
            <input type="number" placeholder="Enter room number"onChange={(e)=>setRoomNumber(e.target.value)} />
            <input type="number" placeholder="Enter room building" onChange={(e)=>setroombuilding(e.target.value)} />
            <input type="number" placeholder="Enter room capacity" onChange={(e)=>setroomCapacity(e.target.value)}/>
            <button type="submit" >Add Room</button>
        </form>
        </>
    )
}
export default Addnewroom;