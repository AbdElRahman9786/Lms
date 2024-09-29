import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
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
import { Await, defer, Link, useLoaderData, useNavigate } from "react-router-dom";
import { getinitialdata } from "./handelApi";

function AllCourses() {
  // const [data, setData] = useState([]);
  // const [skip, setSkip] = useState(10);
  // const [loading, setLoading] = useState(true);
  // const [editCourseName, seteditCourseName] = useState("");
  // const [editingCourseId, setEditingCourseId] = useState(null);
  // const [choose, setChoose] = useState("");
  // const [departmentId,setdepartmentId]=useState('');
  // const [Departments,setDepartments]=useState([]);
  const navigate = useNavigate();
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Optional: Ensure the Content-Type is set if needed
    },
  };
  // function getinitialdata() {
  //   axios
  //     .get(`https://localhost:7015/api/Course/All?take=10&skip=0`, config)
  //     .then((res) => {
  //       setData(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }
const loaderData=useLoaderData();
  // function handelediteCode(id) {
  //   setLoading(true);
  //   axios
  //     .put(
  //       `https://localhost:7015/api/Course/${id}/code`,
  //       editCourseName,
  //       config
  //     )
  //     .then((res) => {
  //       // Update the data locally after the API call succeeds
  //       setData((prevData) =>
  //         prevData.map((course) =>
  //           course.courseId === id
  //             ? { ...course, courseCode: editCourseName } // Replace with the updated course name
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

  // function handleEditName(id) {
  //   setLoading(true);

  //   axios
  //     .put(
  //       `https://localhost:7015/api/Course/${id}/name`, // API endpoint to update course name
  //       editCourseName, // Updated course data (likely an object with the updated name)
  //       config // Config for headers (e.g., authorization)
  //     )
  //     .then((res) => {
  //       // Update the data locally after the API call succeeds
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
  // function hanedlalledite(choose, id) {
  //   if (choose === "name") {
  //     handleEditName(id);
  //   } else if (choose === "code") {
  //     handelediteCode(id);
  //   } else if (choose === "cridete") {
  //     handelEditeCredits(id);
  //   } 
  // }
  // const handleLoadMore = () => {
  //   setLoading(true);
  //   axios
  //     .get(`https://localhost:7015/api/Course/All?take=10&skip=${skip}`, config)
  //     .then((res) => {
  //       setData([...data, ...res.data.data]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {alert(err)
  //       setLoading(false);
  //     } );
  //   setSkip(skip + 10);
  // };

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

  // const handleChange = (event) => {
  //   setChoose(event.target.value);
  // };
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
  return (
    <>
      <div className="allcourses grid grid-cols-12 grid-rows-12 gap-4 p-5">
         <Suspense fallback={<p>Loading..</p>}>
         <Await resolve={loaderData.Courses} errorElement={<p>Erorr loading posts</p>}>
         {(loadedCourses)=>
          loadedCourses.map((el) => (
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
                    Department: {el.departmentName}
                  </Typography>
                </CardContent>
          </Card>
</div>
          ))}
          </Await>
          </Suspense>
          </div>
    </>
  )}


export default AllCourses;
  

export function loader(){
  return defer({Courses:getinitialdata()}) ;
}