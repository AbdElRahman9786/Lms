import Form from './components/Log In/Form.jsx';
import { Route, Routes } from 'react-router-dom';
import RoleHome from './components/Role/RoleHome.jsx';
import Navbar from './components/Navbar/NavBar.jsx';
import Allrooms from './components/Role/Rooms/Allrooms.jsx';
import Editeroom from './components/Role/Rooms/Editeroom.jsx';
import Addnewroom from './components/Role/Rooms/Addnewroom.jsx';
import LogInProvider from './Context/logInContext.js';
import AllCourses from './components/Role/Course/AllCourses.jsx';
import Guard from './components/Gurad.jsx';


function App() {


  return (
    <div className="App ">
      <LogInProvider>

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
      <Allrooms/>
      </Guard>}/>
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
      <AllCourses/>
      </Guard>
      }/>
  </Routes>

  </LogInProvider>


    </div>
  );
}

export default App;
