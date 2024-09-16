import Form from './components/Log In/Form.jsx';
import { Route, Routes } from 'react-router-dom';
import RoleHome from './components/Role/RoleHome.jsx';
import Navbar from './components/Navbar/NavBar.jsx';
import Allrooms from './components/Role/Rooms/Allrooms.jsx';
import Editeroom from './components/Role/Rooms/Editeroom.jsx';
import Addnewroom from './components/Role/Rooms/Addnewroom.jsx';
import LogInProvider from './Context/logInContext.js';
import ResponsiveAppBar from './components/Navbar/NavBar.jsx';
import AllCourses from './components/Role/Course/AllCourses.jsx';


function App() {


  return (
    <div className="App ">
      <LogInProvider>

  <Navbar/>
  <Routes>
    <Route path='/' element={<Form/>} />
    <Route path='/Home' element={<RoleHome/>}/>
    <Route path='/allrooms' element={<Allrooms/>}/>
    <Route path='/allrooms/editeroom/:roomNumber' element={<Editeroom/>}/>
    <Route path='/addnewroom' element={<Addnewroom/>}/>
    <Route path='/Allcourses' element={<AllCourses/>}/>
  </Routes>

  </LogInProvider>


    </div>
  );
}

export default App;
