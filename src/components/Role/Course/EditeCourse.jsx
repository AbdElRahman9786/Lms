import { Button, Divider, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'

const EditeCourse = ({setIsOpen,choose,setChoose,setediteValue,hanedlalledite,courseId}) => {
  

  const navigate=useNavigate();

  return (
    <div className='fixed top-[50%] left-[50%] h-[300px] translate-x-[-50%] translate-y-[-50%] shadow-xl rounded-md bg-white p-10 text-center z-20 text-black flex flex-col justify-between items-center'>
        
        <h1 className='font-bold'>EditeCourse</h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          hanedlalledite(choose,courseId);
          navigate('/AllCourses')

        }}>
        <FormControl fullWidth >
  <InputLabel id="demo-simple-select-label">choose any item to Edite </InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={choose}
    label="Age"
    onChange={(e)=>setChoose(e.target.value)}
  >
    <MenuItem value={'code'}>code</MenuItem>
    <MenuItem value={'name'}>name</MenuItem>
    <MenuItem value={'cridete'}>cridete</MenuItem>
  </Select>
</FormControl>
        <Input type="text" placeholder='Course Name' onChange={(e)=>setediteValue(e.target.value)}/>
        <Button type="submit" color='success' variant='contained'>Done</Button>
        <Button  variant='contained' color='error' onClick={()=>{setIsOpen(false)}
          
        }>close</Button>

        </form>
        </div>
  )
}

export default EditeCourse