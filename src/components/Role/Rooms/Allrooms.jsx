import { useState } from "react";
import {  Link   } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Container  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function Allrooms() {
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const QueryClient=useQueryClient();
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  };
  const mutation=useMutation({
    mutationFn: async (roomNumber) => {
      await axios.delete(`https://localhost:7015/api/ClassRoom/${roomNumber}`, config);
    },
    onSettled: () => {
      QueryClient.invalidateQueries('rooms');
      toast.success("Room deleted successfully");
      
    },
    onError: (err) => {
      console.log(err);
    },
    throwOnError: true,
  })


 async function getinitialdata({pageParam}){
  
  const response = await axios.get(`https://localhost:7015/api/ClassRoom/All?take=10&skip=${pageParam}`, config)
  return response.data.data;
  }
  const { isPending, isError, data, error,fetchNextPage,isFetchingNextPage,hasNextPage } = useInfiniteQuery({
    queryKey: ['rooms'],
    queryFn: getinitialdata,
    initialPageParam:0,
    getNextPageParam:(LastPage,allPages)=>{
      console.log({LastPage,allPages});
      const nextPage=LastPage.length<10?undefined:allPages.length*10
      return nextPage
    }
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
 

const content=data?.pages.map((rooms)=>rooms.map(room=>{
  return(
    <tr className="text-center even:bg-gray-100 odd:bg-white hover:bg-gray-50" key={room.roomNumber}>
    <td className="px-4 py-2 border border-gray-300">{room.roomNumber}</td>
    <td className="px-4 py-2 border border-gray-300">{room.building}</td>
    <td className="px-4 py-2 border border-gray-300">{room.capacity}</td>
    <td className="px-4 py-2 border border-gray-300">
      <Button variant="contained"  color="primary">Edite</Button>
      <Button variant="contained" startIcon={<DeleteIcon/>} color="error" onClick={()=>{
        mutation.mutate(room.roomNumber);
      }}>delete  </Button>
      </td>
  </tr>
  )
}))
  
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
      
      {content}
          
      
    </tbody>
  </table>
</div>

<div className="w-full p-5 flex justify-center items-center">
     
      <Button disabled={!hasNextPage|| isFetchingNextPage} variant="contained" color="secondary" onClick={()=>fetchNextPage()}>{isFetchingNextPage?'loading...':hasNextPage?'lode more':'nothing more to load'}</Button>
      
       </div>
        </div>
        
      </Container>
      
    </>
  );
}
export default Allrooms;


