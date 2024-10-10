import { useEffect, useState } from "react";
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

  import 'react-toastify/dist/ReactToastify.css';

function Allrooms() {
  const [searchvalues, setSearchValues] = useState("");
  const QueryClient=useQueryClient();
  let token = Cookies.get("token");
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  };

  
  const deletmutation=useMutation({
    mutationFn: async (roomNumber) => {
      await axios.delete(`https://localhost:7015/api/ClassRoom/${roomNumber}`, config);
    },
      onSuccess: () => {
   
        QueryClient.invalidateQueries('rooms'); 

      
      
    },
    onError: (err) => {
      alert(err.message);
    },
    
  })
const searchMutation=useMutation({
  mutationKey: 'Searchrooms',
    mutationFn: async () => {
      
         await axios.get(`https://localhost:7015/api/ClassRoom/Search?searchQuery=${searchvalues}`, config);
     
    },
    onSuccess: (data) => {
      
    
    },
    onError: (err) => {
      alert(err.message);
    },
  
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
      
      const nextPage=LastPage.length<10?undefined:allPages.length*10
      return nextPage
    },
    
  })
  if(isPending){
    return <Loading />;
  }
  if(isError){
    return(
      <p className=" text-center">no more data</p>
    )
  }
 

const content=data?.pages.map((rooms)=>rooms.map(room=>{
  return(
    <tr className="text-center even:bg-gray-100 odd:bg-white hover:bg-gray-50" key={room.roomNumber}>
    <td className={`px-4 py-2 border border-gray-300`}> {room.roomNumber}</td>
    <td className={`px-4 py-2 border border-gray-300`}>{room.building}</td>
    <td className={`px-4 py-2 border border-gray-300`}>{room.capacity}</td>
    <td className={`px-4 py-2 border border-gray-300`}>
      <Button variant="contained"  color="primary"><Link to={`/allrooms/editeroom/${room.roomNumber}`}>Edite</Link></Button>
      <Button variant="contained" disabled={deletmutation.isPending} startIcon={<DeleteIcon/>} color="error" onClick={()=>{
        deletmutation.mutate(room.roomNumber);
      }}>delete  </Button>
      </td>
  </tr>
  )
}))
  
  return (
    <>

      <Container >

       
      <div className="p-10  ">
        <form onSubmit={(e)=>e.preventDefault()} className="mb-9 w-1/2 mx-auto flex justify-center items-center ">
          <TextField
            type="number"
            name="searchQuery"
            onChange={(e) => setSearchValues(e.target.value)}
            size="small"
            fullWidth
            label="Enter search values"
          />
          <Button type="submit" size="large" onClick={()=>searchMutation.mutate()} variant="contained" color="info" >
          {searchMutation.isLoading ? "Searching..." : "Search"} <SearchIcon />
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


