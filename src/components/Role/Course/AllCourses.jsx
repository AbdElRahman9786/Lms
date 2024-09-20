import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AllCourses() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(10);
  const [loading, setLoading] = useState(true);
  const [editCourseName, seteditCourseName] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courseCode, setCourseCode] = useState("");
  const [choose, setChoose] = useState("");
  const navigate = useNavigate();
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Optional: Ensure the Content-Type is set if needed
    },
  };
  function getinitialdata() {
    axios
      .get(`https://localhost:7015/api/Course/All?take=10&skip=0`, config)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  function handelediteCode(id) {
    setLoading(true);
    axios
      .put(
        `https://localhost:7015/api/Course/${id}/code`,
        editCourseName,
        config
      )
      .then((res) => {
        // Update the data locally after the API call succeeds
        setData((prevData) =>
          prevData.map((course) =>
            course.courseId === id
              ? { ...course, courseCode: editCourseName } // Replace with the updated course name
              : course
          )
        );
      })
      .catch((err) => {
        alert(err); // Handle error
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner
      });
  }
  function handleEditName(id) {
    setLoading(true);

    axios
      .put(
        `https://localhost:7015/api/Course/${id}/name`, // API endpoint to update course name
        editCourseName, // Updated course data (likely an object with the updated name)
        config // Config for headers (e.g., authorization)
      )
      .then((res) => {
        // Update the data locally after the API call succeeds
        setData((prevData) =>
          prevData.map((course) =>
            course.courseId === id
              ? { ...course, courseName: editCourseName } // Replace with the updated course name
              : course
          )
        );
      })
      .catch((err) => {
        alert(err); // Handle error
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner
      });
  }

  useEffect(() => {
    getinitialdata();
  }, []);
  function hanedlalledite(choose, id) {
    if (choose === "name") {
      handleEditName(id);
    } else if (choose === "code") {
      handelediteCode(id);
    } else if (choose === "cridete") {
    } else if (choose === "department") {
    }
  }
  const handleLoadMore = () => {
    setLoading(true);
    axios
      .get(`https://localhost:7015/api/Course/All?take=10&skip=${skip}`, config)
      .then((res) => {
        setData([...data, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    setSkip(skip + 10);
  };
  const handleChange = (event) => {
    setChoose(event.target.value);
  };

  return (
    <>
      <div className="allcourses grid grid-cols-12 grid-rows-12 gap-4 p-5">
        {loading ? (
          <>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
            <div className="col-span-4 sm:col-span-12 row-span-4  ">
              <Skeleton animation="wave" width={400} height={300} />
            </div>
          </>
        ) : (
          data.map((el) => (
            <div
              className="col-span-4 sm:col-span-12 row-span-4"
              key={el.courseId}
            >
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.courseName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {`Course Code: ${el.courseCode}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {`Course credits: ${el.credits}`}
                  </Typography>

                  <CardActions>
                    <ButtonGroup
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button onClick={() => setEditingCourseId(el.courseId)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => console.log(el.courseId)}>
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </CardContent>

                {editingCourseId === el.courseId && (
                  <div className="edit_rooms fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-10 z-20 shadow-lg rounded-lg">
                    <form
                      className="mb-9 mx-auto flex flex-col justify-center items-center"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          what you want to edite
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={choose}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={"name"}>name</MenuItem>
                          <MenuItem value={"code"}>code</MenuItem>
                          <MenuItem value={"cridete"}>cridete</MenuItem>
                          <MenuItem value={"department"}>department</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        type="text"
                        size="medium"
                        fullWidth
                        label="Enter edit value"
                        onChange={(e) => seteditCourseName(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => hanedlalledite(choose, el.courseId)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setEditingCourseId(null)}
                        color="error"
                      >
                        Close
                      </Button>
                    </form>
                  </div>
                )}
              </Card>
            </div>
          ))
        )}
      </div>
      <div className=" w-[200px] mx-auto">
        <Button onClick={handleLoadMore} variant="contained" color="primary">
          Load More
        </Button>
      </div>
      <div className="fixed top-[80%] left-0 ">
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/Home")}
        >
          Back
        </Button>
      </div>
    </>
  );
}

export default AllCourses;
