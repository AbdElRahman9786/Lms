import React from 'react';
import Form from './components/Log In/Form.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import RoleHome from './components/Role/RoleHome.jsx';
import Navbar from './components/Navbar/NavBar.jsx';
import Editeroom from './components/Role/Rooms/Editeroom.jsx';
import Addnewroom from './components/Role/Rooms/Addnewroom.jsx';
import LogInProvider from './Context/logInContext.js';
import Guard from './components/Gurad.jsx';
import { CourseDetails } from './components/Role/Course/CourseDetails.jsx';
import LayOut from './components/LayOut.jsx';
import  { loader } from './components/Role/Course/AllCourses.jsx';
import Allrooms from'./components/Role/Rooms/Allrooms.jsx';
import AllCourses from'./components/Role/Course/AllCourses.jsx'



function App() {
const routes=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<LayOut/>}>
    <Route index element={<Form/>}/>
    <Route path='/Home' element={<Guard>
      <RoleHome/>
    </Guard>}/>
<Route path='/allrooms'  element={<Guard>
  
  <Allrooms/>
 
</Guard>}/>
<Route path='/Allcourses' loader={loader} element={<Guard>
  
  <AllCourses/>
  
</Guard>}/>

  </Route>
))

  return (
    <RouterProvider router={routes}/>
      
/* 
  <Navbar/>
  <Routes>
    <Route path='/' element={<Form/>} />
    <Route path='/Home' element={
      <Guard>
      <RoleHome/>
      </Guard>
      }/>
    <Route path='/allrooms' element={
      <Guard>
        <React.Suspense>
      <Allrooms/>
      </React.Suspense>
      </Guard>}>
      
      </Route>
    <Route path='/allrooms/editeroom/:roomNumber' element={
      <Guard>
      <Editeroom/>
      </Guard>}/>
    <Route path='/addnewroom' element={
      <Guard>
      <Addnewroom/>
      </Guard>
      }/>
    <Route path='/Allcourses' element={
      <Guard>
        <React.Suspense>
      <AllCourses/>
      </React.Suspense>
      </Guard>
      }/>
      <Route path='/details/:courseCode' element={
        <Guard>
        <CourseDetails/>
        </Guard>
      }/>
  </Routes> */

  


    
  );
}

export default App;
