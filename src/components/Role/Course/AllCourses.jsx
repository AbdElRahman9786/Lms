import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Await, defer, Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { getinitialdata } from "./handelApi";
import EditeCourse from "./EditeCourse";
import Loading from "../../Loading/Loading";

function AllCourses({children}) {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editeValue, setediteValue] = useState("");
  // const [editingCourseId, setEditingCourseId] = useState(null);
  const [choose, setChoose] = useState("");
  const [courseId, setCourseId] =useState(0)
  // const [departmentId,setdepartmentId]=useState('');
  // const [Departments,setDepartments]=useState([]);
  const [isOpen,setIsOpen]=useState(false);
  const navigate = useNavigate();
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Optional: Ensure the Content-Type is set if needed
    },
  };

const loaderData=useLoaderData();

  function handelediteCode(id) {
    setLoading(true);
    axios
      .put(
        `https://localhost:7015/api/Course/${id}/code`,
         editeValue,
        config
      )
      .then((res) => {
  
        setData((prevData) =>
          prevData.map((course) =>
            course.courseId === id
              ? { ...course, courseCode: editeValue } 
              : course
          )
        );
      })
      .catch((err) => {
        alert(err); // Handle error
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner
      });
  }

  // function handleEditName(id) {
  //   setLoading(true);

  //   axios
  //     .put(
  //       `https://localhost:7015/api/Course/${id}/name`, // API endpoint to update course name
  //       editCourseName, // Updated course data (likely an object with the updated name)
  //       config // Config for headers (e.g., authorization)
  //     )
  //     .then((res) => {
 
  //       setData((prevData) =>
  //         prevData.map((course) =>
  //           course.courseId === id
  //             ? { ...course, courseName: editCourseName } // Replace with the updated course name
  //             : course
  //         )
  //       );
  //     })
  //     .catch((err) => {
  //       alert(err); // Handle error
  //     })
  //     .finally(() => {
  //       setLoading(false); // Stop the loading spinner
  //     });
  // }

  // useEffect(() => {
    
  //   getAllDepartments();
  // }, []);

  const handleLoadMore = () => {
    setLoading(true);
    axios
      .get(`https://localhost:7015/api/Course/All?take=10&skip=${skip}`, config)
      .then((res) => {
        setData((prev)=>[...prev,...res.data.data]);
        setSkip(skip+10);
      })
      .catch((err) => {alert(err)
        
      } ).finally(()=>setLoading(false));
    
  };

  // function handelEditeCredits(id) {
  //   setLoading(true);
  //   const number = Number(editCourseName);

  //   axios
  //     .put(`https://localhost:7015/api/Course/${id}/Credits`, number, config)
  //     .then(() =>
  //       setData((prev) =>
  //         prev.map((course) =>
  //           course.courseId === id ? { ...course, credits: number } : course
  //         )
  //       )
  //     )
  //     .catch((err) => alert(err))
  //     .finally(() => setLoading(false));
  // }
  console.log(choose)
  function hanedlalledite(choose, id) {
    if (choose === "name") {
      // handleEditName(id);
    } else if (choose === "code") {
      handelediteCode(id);
      
    } else if (choose === "cridete") {
      // handelEditeCredits(id);
    } 
  }
  const handleChange = (event) => {
    setChoose(event.target.value);
  };
  // function handelDepartmentEdite(CourseId, departmentId) {
  //   setLoading(true);
  //   axios
  //     .put(
  //       `https://localhost:7015/api/Course/${CourseId}/Deprtment`,
  //       departmentId,
  //       config
  //     )
  //     .then(() =>
  //       setData((prev) =>
  //         prev.map((course) =>
  //           course.courseId === CourseId
  //             ? { ...course, departmentId: departmentId }
  //             : course
  //         )
  //       )
  //     ).catch((error) =>alert(error)).finally(()=>setLoading(false))
  // }
  // function getAllDepartments(){
  //   axios.get('https://localhost:7015/api/Department/All', config).then((res)=>setDepartments(res.data.data)).catch((err)=>console.error(err))
  // }
  function  getId(id){
    setCourseId(id);
   
  }


  return (
    <>  <Link to='/addnew'><Button variant="contained" color="secondary">Add new Course</Button></Link>
      <div className="allcourses grid grid-cols-12 grid-rows-12 gap-4 p-5">
       
         <Suspense fallback={<Loading/>}>
         <Await resolve={loaderData.Courses} errorElement={<p>Erorr loading posts</p>}>
         { (loadedCourses)=>{
          
const alldata=[...loadedCourses,...data]
    return    alldata.map((el) => (
            <div
              className="col-span-4 sm:col-span-12 row-span-4"
              key={el.courseId}
            >
             
          <Card>
            

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course Code: {el.courseCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Credits: {el.credits}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Department: {el.departmentId}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup>
                    <Button variant="contained" color="primary" onClick={()=>{setIsOpen(true) 
                      getId(el.courseId)}}>Edite</Button>
                    <Button variant="contained" color="error">Delete</Button>
                  </ButtonGroup>
                  
                  </CardActions>
          </Card>
</div>
          ))}}
          </Await>
          </Suspense>
{isOpen&&(
  <EditeCourse setIsOpen={setIsOpen} choose={choose} setChoose={setChoose} setediteValue={setediteValue} hanedlalledite={hanedlalledite} courseId={courseId}/>
)}
          </div>
          <div className="w-[100%] flex justify-center items-center ">
          {loading?(<CircularProgress color="secondary" />):(<Button variant="outlined" color="info" onClick={()=>handleLoadMore()}>Load More</Button>)}
          </div>
         
    </>
  )}


export default AllCourses;
  

export function loader(){
  return defer({Courses:getinitialdata()}) ;
}