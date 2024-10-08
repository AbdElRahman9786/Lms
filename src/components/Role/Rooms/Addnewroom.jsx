import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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
    const mutation=useMutation({
        mutationKey: 'addroom',
        mutationFn: async (data) => {
            try {
                return await axios.post('https://localhost:7015/api/ClassRoom', data, config);
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        onSuccess: (data) => {
            console.log('Room added successfully', data);
            navigate('/Allrooms');
        },
        onError: (error) => {
            console.error('Error adding room', error);
        }
     });
    

   
    return(
        <>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="number" placeholder="Enter room number"onChange={(e)=>setRoomNumber(e.target.value)} />
            <input type="number" placeholder="Enter room building" onChange={(e)=>setroombuilding(e.target.value)} />
            <input type="number" placeholder="Enter room capacity" onChange={(e)=>setroomCapacity(e.target.value)}/>
            <button type="submit" onClick={()=>{
                mutation.mutate({roomNumber,building,capacity});
            }} >Add Room</button>
        </form>
        </>
    )
}
export default Addnewroom;