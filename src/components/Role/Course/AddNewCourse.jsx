import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Form, redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

function AddNewCourse() {


  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        margin: '0 auto',
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white'
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Add New Course
      </Typography>
      <Form method='post' action='Allcourses'>
        {/* Course Name Field */}
        <TextField
          label="Course Name"
          name="courseName"
          fullWidth
          margin="normal"
          required
        />

        {/* Course Description Field */}
        <TextField
          label="courseCode"
          name="courseCode"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />

        {/* Course Duration Field */}
        <TextField
          label="Course credits (in hours)"
          name="credits"
          type="number"
          fullWidth
          margin="normal"
          required
        />
               <TextField
          label="Course departmentId "
          name="departmentId"
          type="number"
          fullWidth
          margin="normal"
          required
        />

        {/* Submit Button */}
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Add Course
        </Button>
      </Form>
    </Box>
  );
}

export default AddNewCourse;
  
export const action = async ({ request }) => {
    const data = await request.formData();
    
    // Create the course submission object
    const submission = {
      courseName: data.get('courseName'),
      courseCode: data.get('courseCode'),
      credits: Number(data.get('credits')),
      departmentId: Number(data.get('departmentId')),
    };
  
    try {
        let token = Cookies.get("token");
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              // Optional: Ensure the Content-Type is set if needed
            },
          };
      // Send the data to your API
      const response = await axios.post('https://localhost:7015/api/Course',submission,config );
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to submit course');
      }
  
      // If successful, redirect to the AllCourses page
      return redirect('/Allcourses');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., show error message or log it)
      return { error: error.message };
    }
  };