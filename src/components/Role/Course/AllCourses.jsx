import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { Button, Card, CardActions, CardContent, Container, Skeleton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function AllCourses() {
    const [data , setData]=useState([])
    const [skip, setSkip]=useState(10)
    const [loading, setLoading] = useState(false);
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Optional: Ensure the Content-Type is set if needed
      },
    };
    function getinitialdata(){
      setLoading(true)
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
    console.log(data)
  return (
    <>
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
                <Button size="small" variant='contained' color='error' startIcon={<DeleteIcon/>}>Delete</Button>
                <Button size="small" variant='contained' color='primary' startIcon={<EditIcon/>}>Edite</Button>
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