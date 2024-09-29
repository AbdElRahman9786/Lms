import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Container, Skeleton } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


function Allrooms() {
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const [take,setTake] = useState(10);
  const[more,setMore] = useState(true)
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Optional: Ensure the Content-Type is set if needed
    },
  };

  useEffect(() => {
    handelinitialdata();
    setLoading(true);
  
  }, []);
  
  const handelinitialdata=()=>{
axios.get(`https://localhost:7015/api/ClassRoom/All?take=10&skip=0`, config)
    .then((res) => {
      setSkip(skip +10)
      if(res.data.data.length<10){
        setMore(false)
      }
      setTakenRooms(res.data.data)}).finally(()=>{setLoading(false)});
  }
  console.log(more)
  function handelTakeandSkip(){
    setLoading(true)
    
    axios
    .get(`https://localhost:7015/api/ClassRoom/All?take=${take}&skip=${skip}`, config)
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

  function delteroom(roomNumber) {
    setLoading(true);
    axios
      .delete(`https://localhost:7015/api/ClassRoom/${roomNumber}`, config)
      .then(() =>{
        const newdata=takenRooms.filter((room)=>room.roomNumber !== roomNumber)
        setTakenRooms(newdata);
      })
      .catch((err) => alert("this room can not be deleted")).finally(()=>{setLoading(false)});
  }
  
  return (
    <>
      <Container >

       
      <div className="p-10  ">
        <form onSubmit={handelSearch} className="mb-9 w-1/2 mx-auto flex justify-center items-center">
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

        <table className=" w-[100%] text-sm mx-auto text-gray-500 dark:text-gray-400 text-center  border-2 table-fixed overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            
              <th scope="col" className="px-6 py-3">
                room Number
              </th> 
              <th scope="col" className="px-6 py-3">
                building
              </th>
              <th scope="col" className="px-6 py-3">
                capacity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                
              >
                <td className="px-6 py-4"><Skeleton animation="wave" /></td>
                <td className="px-6 py-4"><Skeleton animation="wave" /></td>
                <td className="px-6 py-4"><Skeleton animation="wave" /></td>
                <td className="px-6 py-4"><Skeleton animation="wave" /></td>
              </tr>
           


) : (
  takenRooms.map((el) => (
    <tr
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
      key={el.roomNumber}
    >
      <td className="px-6 py-4">{el.roomNumber}</td>
      <td className="px-6 py-4">{el.building}</td>
      <td className="px-6 py-4">{el.capacity}</td>
      <td className="px-6 py-4">
      <ButtonGroup variant="contained">
        <Link
          to={`editeroom/${el.roomNumber}`}
         
        >
                  <Button  color="success" variant="contained"size="small" startIcon={<ModeEditIcon fontSize="small"/>}>
  Edite
</Button>
        </Link>

        <Button onClick={() => delteroom(el.roomNumber)} color="error" variant="contained"size="small" startIcon={<DeleteIcon fontSize="small"/>}>
  Delete
</Button>
</ButtonGroup>
      </td>
    </tr>
  ))
)}

        
          </tbody>
        </table>
        
{more?<button className={`text-center w-[100%] ${loading&& 'invisible'}`} onClick={()=>handelTakeandSkip()} >see more</button>:<h1 className="text-center w-[100%]">no more data</h1>}
       
        </div>
        
      </Container>
      
    </>
  );
}
export default Allrooms;


