import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

function EditCourse() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editOption, setEditOption] = useState("name");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const handleEdit = () => {
    setLoading(true);
    const url = `https://localhost:7015/api/Course/${id}/${editOption}`;
    const data =
      editOption === "credits" || editOption === "departmentId"
        ? Number(editValue)
        : editValue; // Handle credits as a number

    axios
      .put(url, data, config)
      .then(() => {
        navigate("/AllCourses");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Edit Course
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="edit-option-label">Select Option</InputLabel>
          <Select
            labelId="edit-option-label"
            value={editOption}
            onChange={(e) => setEditOption(e.target.value)}
          >
            <MenuItem value="name">Course Name</MenuItem>
            <MenuItem value="code">Course Code</MenuItem>
            <MenuItem value="Credits">Credits</MenuItem>
            <MenuItem value="Department">Department ID</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={
            editOption === "credits"
              ? "Credits"
              : editOption.charAt(0).toUpperCase() + editOption.slice(1)
          }
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          fullWidth
          margin="normal"
          required
          type={
            editOption === "credits" || editOption === "Department"
              ? "number"
              : "text"
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress color="success" /> : "update course"}
        </Button>
      </form>
    </Box>
  );
}

export default EditCourse;
