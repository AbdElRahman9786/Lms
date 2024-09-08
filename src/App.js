
import createStore from 'react-auth-kit/createStore';
import Form from './components/Log In/Form.jsx';
import AuthProvider from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import RoleHome from './components/Role/RoleHome.jsx';
import RoleProvider from './Context/roleContext.js';
import Navbar from './components/Navbar/NavBar.jsx';
import Sidebar from './components/Role/Rolesidebar.jsx';
import Allrooms from './components/Role/Rooms/Allrooms.jsx';
import Editeroom from './components/Role/Rooms/Editeroom.jsx';
import Addnewroom from './components/Role/Rooms/Addnewroom.jsx';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
function App() {


  return (
    <div className="App ">
<AuthProvider store={store}>
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
      </AuthProvider>

    </div>
  );
}

export default App;
