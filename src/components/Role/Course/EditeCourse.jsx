import { Button, Divider, Input } from '@mui/material'
import React from 'react'

const EditeCourse = ({close}) => {
  return (
    <div className='fixed top-[50%] left-[50%] h-[300px] translate-x-[-50%] translate-y-[-50%] shadow-xl rounded-md bg-white p-10 text-center z-20 text-black flex flex-col justify-between items-center'>
        
        <h1 className='font-bold'>EditeCourse</h1>
        
        <Input type="text" placeholder='Course Name'/>
        <Button  variant='contained' color='error' onClick={()=>close()}>close</Button>
        </div>
  )
}

export default EditeCourse