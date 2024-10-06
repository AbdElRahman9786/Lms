import {  useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import {  useState } from "react";
import Loading from "../../Loading/Loading";

function Editeroom() {
    let { roomNumber } = useParams();
    let token = Cookies.get('token');
    const [capacity, setCapacity] = useState('');
    const [loading,setLoading] = useState(false);
    let navigate=useNavigate();
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Optional: Ensure the Content-Type is set if needed
        }
    };
  
    const EditCapacity = (e) => {
        e.preventDefault();

        // Convert capacity to a number if it isn't already
        const capacityValue = Number(capacity);

        // Ensure the value is a valid number before sending
        if (isNaN(capacityValue)) {
            console.error('Invalid capacity value');
            return;
        }
        setLoading(true); // Show a loading spinner while waiting for the API response

        axios.put(`https://localhost:7015/api/ClassRoom/${roomNumber}/Capacity`, capacityValue, config)
            .then((res) => {
                
                console.log(res);
            
                navigate('/allrooms')
                // Optionally handle successful response, e.g., show a success message
            })
            .catch(error => {
                console.error('There was an error updating the capacity!', error);
                // Optionally handle errors, e.g., show an error message
            }).finally(()=>setLoading(false));
    }

 

    return (
        <>
        {!loading?(
 <form onSubmit={EditCapacity} >
 <input 
     type="number" 
     placeholder="Enter new capacity" 
     name="capacity" 
     value={capacity} // Add value to control the input
     onChange={(e) => setCapacity(e.target.value)}
 />
 <button type="submit" >Edit</button>
</form>
        ):(
            <Loading/>
        )}
           
            
        </>
    );
}

export default Editeroom;
