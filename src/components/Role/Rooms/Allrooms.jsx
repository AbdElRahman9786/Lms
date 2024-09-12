import { useContext, useEffect, useState } from "react";
import { roleContext } from "../../../Context/roleContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Allrooms() {
  const [allrooms, setAllrooms] = useState([]);
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const [take,setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const room = useContext(roleContext);
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Optional: Ensure the Content-Type is set if needed
    },
  };

  useEffect(() => {
    setAllrooms(room);
    handelinitialdata();
    setLoading(true);
  
  }, []);
  
  const handelinitialdata=()=>{
axios.get(`https://localhost:7015/api/ClassRoom/All?take=10&skip=0`, config)
    .then((res) => {
      
       
    setSkip(skip +10)
      setTakenRooms(res.data.data)}).finally(()=>{setLoading(false)});
  }
  function handelTakeandSkip(){
    setLoading(true)
    axios
    .get(`https://localhost:7015/api/ClassRoom/All?take=${take}&skip=${skip}`, config)
    .then((res) => {console.log(res)
      
    
    setSkip(skip +10)
    
    setTakenRooms((prev)=>[...prev,...res.data.data]);
  }
    
  ).catch((err) => {
    
  alert('Error: ' + err.message);
  }).finally(()=>setLoading(false))
 
  }

  function getAllRooms() {
    axios
      .get("https://localhost:7015/api/ClassRoom/All", config)
      .then((res) => setTakenRooms(res.data.data))
      .catch((err) => console.log(err));
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

  function delteroom(id) {
    axios
      .delete(`https://localhost:7015/api/ClassRoom/${id}`, config)
      .then(() => getAllRooms())
      .catch((err) => alert("this room can not be deleted"));
  }
  
  return (
    <>
      <div className="mt-5   px-5">
      <div className="container mx-auto">
        <form onSubmit={handelSearch} className="mb-9 w-1/2 mx-auto flex justify-center items-center">
          <input
            type="number"
            name="searchQuery"
            onChange={(e) => setSearchValues(e.target.value)}
            className="mx-auto w-1/2 px-8 py-1  border-2 flex-1 "
            placeholder="Enter search values"
          />
          <button type="submit" className='bg-[#3b82f6]  px-3 py-1 '>
          <FontAwesomeIcon icon={faSearch} className="text-white text-xl   " />
          </button>
         
        </form>
        <Link
          to="/addnewroom"
          className="w-[50%] bg-[#0f47ad] text-white hover:bg-green-400 duration-200  block py-2 text-center mx-auto mb-10"
        >
          Add
        </Link>

        <table className="max-w-[100%] w-full text-sm  text-gray-500 dark:text-gray-400 text-center table-fixed">
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
 <Loading/>


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
        <Link
          to={`editeroom/${el.classroomId}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <button
          className="font-medium text-red-600 dark:text-blue-500 hover:underline ml-1"
          onClick={() => delteroom(el.classroomId)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
)}

        
          </tbody>
        </table>

        <button className="text-center w-[100%]" onClick={()=>handelTakeandSkip()} >see more</button>
        </div>
      </div>
    </>
  );
}
export default Allrooms;
