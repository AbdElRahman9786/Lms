import { Suspense, useState } from "react";
import { Await, defer, Link,  redirect,  useFetcher,  useLoaderData, useNavigate, useNavigation,  } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {  CircularProgress, Container  } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { getinitialdata } from "./hadelApi";
import { useQuery } from "@tanstack/react-query";


function Allrooms() {
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const[more,setMore] = useState(true)
  const [skip, setSkip] = useState(0);
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Optional: Ensure the Content-Type is set if needed
    },
  };

 const navigate=useNavigate();


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: getinitialdata,
  })
  if(isPending){
    return <Loading />;
  }
  if(isError){
    return <p>Error: {error.message}</p>;
  }
  function handelSearch(e) {
    e.preventDefault();
    
    axios
      .get(
        `https://localhost:7015/api/ClassRoom/Search?searchQuery=${searchvalues}`,
        config
      )
      .then((res) =>
        setTakenRooms(
            res.data.data
          )

        
        
      )
      .catch((err) => console.log(err));
  }


  
  return (
    <>
      <Container >

       
      <div className="p-10  ">
        <form onSubmit={handelSearch} className="mb-9 w-1/2 mx-auto flex justify-center items-center ">
          <TextField
            type="number"
            name="searchQuery"
            onChange={(e) => setSearchValues(e.target.value)}
            size="small"
            fullWidth
            label="Enter search values"
          />
          <Button type="submit" size="large" onSubmit={()=>handelSearch} variant="contained" color="info" >
          <SearchIcon />
          </Button>
         
        </form>
        <Link
          to="/addnewroom"
          className="w-[50%]  text-white   block py-2 text-center mx-auto mb-10"
        >
         <Button variant="contained" color="info" className="w-[100%]">
          Add
         </Button>
        </Link>
        <div className="overflow-x-auto">
  <table className="table-auto w-full border-collapse bg-white shadow-lg">
    <thead>
      <tr className="bg-gray-200 text-gray-700">
        <th className="px-4 py-2 border border-gray-300">Room Number</th>
        <th className="px-4 py-2 border border-gray-300">Building</th>
        <th className="px-4 py-2 border border-gray-300">Capacity</th>
        <th className="px-4 py-2 border border-gray-300">Action</th>
      </tr>
    </thead>
    <tbody>
      
          {
            
             data.map((room)=>{
              return(
                <tr className="text-center even:bg-gray-100 odd:bg-white hover:bg-gray-50" key={room.roomNumber}>
                <td className="px-4 py-2 border border-gray-300">{room.roomNumber}</td>
                <td className="px-4 py-2 border border-gray-300">{room.building}</td>
                <td className="px-4 py-2 border border-gray-300">{room.capacity}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button variant="contained" startIcon={<ModeEditIcon/>} color="primary">Edite</Button>
                  <Button variant="contained" startIcon={<DeleteIcon/>} color="error" >delete </Button>
                  </td>
              </tr>
              )
             })
            }            

          
      
    </tbody>
  </table>
</div>

<div className="w-full p-5 flex justify-center items-center">
     
        <Button variant="contained" color="secondary">seeMore</Button>
       
       </div>
        </div>
        
      </Container>
      
    </>
  );
}
export default Allrooms;


