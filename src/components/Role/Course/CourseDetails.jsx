import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from "js-cookie";

export const CourseDetails = () => {
    const [course,setCourse]=useState([])
    const {courseCode}=useParams();
    let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      
    },
  };
  useEffect(()=>{
    getCourseDetails()
  },[])
    function getCourseDetails(){
        axios.get(`https://localhost:7015/api/Course/${courseCode}`,config).then(res=>setCourse(res.data.data)).catch(err=>console.log(err))
    }
  return (
    <div>
       <h1>{course.courseName}</h1> 
   </div>
  )
}
