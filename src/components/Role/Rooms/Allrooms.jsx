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


function Allrooms() {
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const[more,setMore] = useState(true)
  const [skip, setSkip] = useState(10);
  const [loading, setLoading] = useState(false);
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Optional: Ensure the Content-Type is set if needed
    },
  };
const loaderData=useLoaderData();
 const navigate=useNavigate();
 const fetcher = useFetcher();
  const navigation=useNavigation();

  function loadeMore(){
    setLoading(true)
    
    axios
    .get(`https://localhost:7015/api/ClassRoom/All?take=10&skip=${skip}`, config)
    .then((res) => {
      
      if(res.data.data.length<10){
        setMore(false)
      }
    
    
    setTakenRooms((prev)=>[...prev,...res.data.data]);
    setSkip(skip +10)
  }
    
  ).catch((err) => {
    
  alert('Error: ' + err.message);
  }).finally(()=>setLoading(false))
 
  }

  
  function handelSearch(e) {
    e.preventDefault();
    setLoading(true)
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
      .catch((err) => console.log(err)).finally(()=>setLoading(false));
  }

  const handleDelete = (roomNumber) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      fetcher.submit(null, { method: 'delete', action: `/course/${roomNumber}/delete` });
    }
   
  };
  
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
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.rooms} errorElement={<p>Error loading rooms</p>}>
          {(loadedRooms) => {
            const allrooms=[...loadedRooms,...takenRooms]
            return allrooms.map((room) => (
              <tr key={room.roomNumber} className="text-center even:bg-gray-100 odd:bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{room.roomNumber}</td>
                <td className="px-4 py-2 border border-gray-300">{room.building}</td>
                <td className="px-4 py-2 border border-gray-300">{room.capacity}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button variant="contained" startIcon={<ModeEditIcon/>} color="primary">Edite</Button>
                  <Button variant="contained" startIcon={<DeleteIcon/>} color="error" onClick={()=>handleDelete(room.roomNumber)}>{navigation.state==='submitting'?<CircularProgress/>:'Delete'} </Button>
                  </td>
              </tr>
            ));
          }}
        </Await>
      </Suspense>
    </tbody>
  </table>
</div>

<div className="w-full p-5 flex justify-center items-center">
     {loading?(<CircularProgress color="secondary" />):( 
        <Button variant="contained" color="secondary" onClick={()=>loadeMore()}>seeMore</Button>
       )} 
       </div>
        </div>
        
      </Container>
      
    </>
  );
}
export default Allrooms;

export function loader(){
  return defer({rooms:getinitialdata()})
}

export  async function deleteCourseAction({params}){
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Optional: Ensure the Content-Type is set if needed
    },
  };
  try{
  const { roomNumber } = params;

 await axios
  .delete(`https://localhost:7015/api/ClassRoom/${roomNumber}`, config)
  return redirect('/allrooms')
  }catch(err){
    console.error('Error deleting course:', err);
    // Handle error, maybe return an error message or redirect
    return { error: 'Failed to delete the course' };
  }
}
