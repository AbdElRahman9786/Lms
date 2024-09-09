import Form from './components/Log In/Form.jsx';
import { Route, Routes } from 'react-router-dom';
import RoleHome from './components/Role/RoleHome.jsx';
import RoleProvider from './Context/roleContext.js';
import Navbar from './components/Navbar/NavBar.jsx';
import Sidebar from './components/Role/Rolesidebar.jsx';
import Allrooms from './components/Role/Rooms/Allrooms.jsx';
import Editeroom from './components/Role/Rooms/Editeroom.jsx';
import Addnewroom from './components/Role/Rooms/Addnewroom.jsx';
import LogInProvider from './Context/logInContext.js';


function App() {


  return (
    <div className="App ">
      <LogInProvider>
<RoleProvider>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Form/>} />
    <Route path='/Home' element={<RoleHome/>}/>
    <Route path='/allrooms' element={<Allrooms/>}/>
    <Route path='/allrooms/editeroom/:classroomId' element={<Editeroom/>}/>
    <Route path='/addnewroom' element={<Addnewroom/>}/>
  </Routes>
  </RoleProvider>
  </LogInProvider>


    </div>
  );
}

export default App;
