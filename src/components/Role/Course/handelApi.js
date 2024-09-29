
import axios from "axios";
import Cookies from "js-cookie";
let token = Cookies.get("token");

const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     
    },
  };

export async function getinitialdata() {
  const response= await  axios.get(`https://localhost:7015/api/Course/All?take=10&skip=0`, config)
     
  
      return response.data.data;
  }