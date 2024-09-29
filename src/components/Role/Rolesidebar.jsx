// 
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import { Link, NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import img from '../../Images/Computer Science NEW LOGO.png'
import AbcIcon from '@mui/icons-material/Abc';





export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  
const functions=[
  {link:'/allrooms',text:'All Rooms',icon:<SchoolIcon color='primary' />},
  {link:'/Allcourses',text:'All Courses',icon:<AbcIcon color='primary'/>},
  {link:'/',text:'Log out',icon:<LogoutIcon color='error'/>}


]
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img src={img} alt="image_log" className='w-16 mx-auto'/>
      <Divider />
      <List>
        {functions.map((el) => (
          <ListItem key={el.link} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {el.icon}
              </ListItemIcon>
              <ListItemText primary={<NavLink to={el.link}>{el.text}</NavLink>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='fixed z-10 top-[50%]'>
      <Button onClick={toggleDrawer(true)}  variant='contained' color='info'>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
