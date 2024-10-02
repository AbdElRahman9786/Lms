import axios from "axios";
import React, { Suspense, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Await,
  defer,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getinitialdata } from "./handelApi";
import Loading from "../../Loading/Loading";
import AddIcon from '@mui/icons-material/Add';

function AllCourses() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Optional: Ensure the Content-Type is set if needed
    },
  };

  const loaderData = useLoaderData();

  const handleLoadMore = () => {
    setLoading(true);
    axios
      .get(`https://localhost:7015/api/Course/All?take=10&skip=${skip}`, config)
      .then((res) => {
        setData((prev) => [...prev, ...res.data.data]);
        setSkip(skip + 10);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      
      <Link to="/addnew" className="w-[100%] flex justify-center items-center p-5">
        <Button startIcon={<AddIcon/>} variant="contained" color="secondary">
          Add new Course
        </Button>
      </Link>
      <div className="allcourses grid grid-cols-12 grid-rows-12 gap-4 p-5">
        <Suspense fallback={<Loading />}>
          <Await
            resolve={loaderData.Courses}
            errorElement={<p>Erorr loading posts</p>}
          >
            {(loadedCourses) => {
              const alldata = [...loadedCourses, ...data];
              return alldata.map((el) => (
                <div
                  className="col-span-4 sm:col-span-12 row-span-4"
                  key={el.courseId}
                >
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.courseName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Course Code: {el.courseCode}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Credits: {el.credits}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Department: {el.departmentId}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ButtonGroup>
                        <Button variant="contained" color="primary">
                          <Link to={`/EditeCourse/${el.courseId}`}>Edite</Link>
                        </Button>
                        <Button variant="contained" color="error">
                          Delete
                        </Button>
                      </ButtonGroup>
                    </CardActions>
                  </Card>
                </div>
              ));
            }}
          </Await>
        </Suspense>
      </div>
      <div className="w-[100%] flex justify-center items-center ">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}

export default AllCourses;

export function loader() {
  return defer({ Courses: getinitialdata() });
}
