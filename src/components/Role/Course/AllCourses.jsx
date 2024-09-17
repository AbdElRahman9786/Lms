import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { Button, Card, CardActions, CardContent, Container, Radio, RadioGroup, Skeleton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function AllCourses() {
    const [data , setData]=useState([])
    const [skip, setSkip]=useState(10)
    const [loading, setLoading] = useState(true);
    const [toggel,setToggel] = useState(false);
    // const [code,setCode]=useState('');
    // const [name,setName]=useState('');
    // const [department,setDepartment] = useState('');
    // const [cridet,setCridet] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Optional: Ensure the Content-Type is set if needed
      },
    };
    function getinitialdata(){
      axios.get(`https://localhost:7015/api/Course/All?take=10&skip=0`,config)
      .then((res)=>{setData(res.data.data)
    setLoading(false)}
    ).catch((err)=>console.error(err))
    }
    function handeldelete(id){

    }
    useEffect(()=>{
   getinitialdata();
    },[])
    const handleLoadMore=()=>{
      setLoading(true)
        axios.get(`https://localhost:7015/api/Course/All?take=10&skip=${skip}`,config)
       .then((res)=>{setData([...data,...res.data.data])
        setLoading(false)
       }).catch((err)=>console.error(err))
        setSkip(skip+10)
    }
    
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
    
  return (
    <>
    {toggel&&(
    <div className="edite_rooms absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-white p-10 z-20 shadow-lg rounded-lg">
    <form  className="mb-9 mx-auto flex flex-col justify-center items-center">
          <TextField
            type="number"
            name="searchQuery"
            size="medium"
            fullWidth
            label="Enter edite value"
            
          />
          
         <Button type='submit' variant='contained' color='primary'>Edite</Button>
         <Button variant='contained' onClick={()=>setToggel(false)} color='error'>close</Button>
        </form>

    </div>
    )}

    <div className='allcourses grid grid-cols-12 grid-rows-12 gap-4 p-5'>
        {loading?( 
         data.map((data)=>
          <div className='col-span-4 sm:col-span-12 row-span-4  '>
         <Skeleton animation="wave" width={400} height={300} />
         
          </div>)
        ):(data.map((el) => (
            <div className='col-span-4 sm:col-span-12 row-span-4  '>
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {el.courseName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 {`Course Code: ${el.courseCode}`}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 {`Course credits: ${el.credits}`}
                </Typography>
              </CardContent>
                <CardActions>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">please select what you want edite</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          onChange={handleSelectChange}
          label="please select what you want edite"
          
        >
          <MenuItem  value={`name`}>name</MenuItem>
          <MenuItem  value={`code`}>Code</MenuItem>
          <MenuItem  value={`cridet`}>Cridete</MenuItem>
          <MenuItem  value={`department`}>Department</MenuItem>
        </Select>
      </FormControl>
                <Button size="small" variant='contained' color='error' startIcon={<DeleteIcon/>}>Delete</Button>
                <Button size="small" onClick={()=>setToggel(true)} variant='contained' color='primary' startIcon={<EditIcon/>}>Edite</Button>

              </CardActions>
        </Card>
        
            </div>
              
            
          ))
        )}



    </div>
    <div className=' w-[200px] mx-auto'>
    <Button onClick={handleLoadMore} variant='contained'  color='primary'>Load More</Button>
  </div>
  </>
  )
}

export default AllCourses