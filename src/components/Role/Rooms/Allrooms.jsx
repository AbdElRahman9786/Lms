import { useContext, useEffect, useState } from "react";
import { roleContext } from "../../../Context/roleContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Allrooms() {
  const [allrooms, setAllrooms] = useState([]);
  const [searchvalues, setSearchValues] = useState("");
  const [takenRooms, setTakenRooms] = useState([]);
  const [take,setTake] = useState(10);
  const [skip, setSkip] = useState(0);
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
  
  }, []);
  const handelinitialdata=()=>{
axios.get(`https://localhost:7015/api/ClassRoom/All?take=10&skip=0`, config)
    .then((res) => {
      
       
    setSkip(skip +10)
      setTakenRooms(res.data.data)});
  }
  function handelTakeandSkip(){
    axios
    .get(`https://localhost:7015/api/ClassRoom/All?take=${take}&skip=${skip}`, config)
    .then((res) => {console.log(res)
      
    
    setSkip(skip +10)
    
    setTakenRooms((prev)=>[...prev,...res.data.data]);
  }
    
  ).catch((err) => {
    
  alert('Error: ' + err.message);
  })
 
  }
console.log(take)
  function getAllRooms() {
    axios
      .get("https://localhost:7015/api/ClassRoom/All", config)
      .then((res) => setTakenRooms(res.data.data))
      .catch((err) => console.log(err));
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
console.log(takenRooms)
  function delteroom(id) {
    axios
      .delete(`https://localhost:7015/api/ClassRoom/${id}`, config)
      .then(() => getAllRooms())
      .catch((err) => alert("this room can not be deleted"));
  }
  
  return (
    <>
      <div className="mt-5 max-w-full">
      <div className="container my-0 mx-auto">
        <form onSubmit={handelSearch}>
          <input
            type="number"
            name="searchQuery"
            onChange={(e) => setSearchValues(e.target.value)}
          />
          <button type="submit" className="bg-blue-300">
            search
          </button>
          <button className="bg-red-500" onClick={()=>getAllRooms()}>show all data</button>
        </form>
        <Link
          to="/addnewroom"
          className="w-[100%] bg-cyan-400 block text-center rounded-lg"
        >
          Add
        </Link>

        <table className="max-w-full w-full text-sm  text-gray-500 dark:text-gray-400 text-center mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                class room Id
              </th>
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
            {takenRooms.map((el) => {
              return (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={el.classroomId}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.classroomId}
                  </th>
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
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline ml-1 "
                      onClick={() => delteroom(el.classroomId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="text-center w-[100%]" onClick={()=>handelTakeandSkip()} >see more</button>
        </div>
      </div>
    </>
  );
}
export default Allrooms;
