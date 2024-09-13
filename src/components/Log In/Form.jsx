import React, { useContext, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import  "./form.css";
import Swal from "sweetalert2";
import { LoginContext } from "../../Context/logInContext";
import img from '../../Images/Computer Science NEW LOGO.png'
import Loading from "../Loading/Loading";

function Form() {

  const [formData, setFormData] =useState({ email: "", password: "" });
  const {logIn , setLogIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  
  


  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://localhost:7015/siginin", formData)

      .then((res) => {
        Cookies.set("token", res.data.data.token, { expires: 0.25 });
   setLogIn(true);
          navigate("/Home", { replace: true });
        })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Incorrect Email or Password",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }).finally(()=>setLoading(false));
  };

  return (
    <>
    {loading?(
      <Loading/>
    ):(
      <form
      onSubmit={onSubmit}
      className="    max-w-[100%] min-h-[100vh] form"
    > 
    
    <div className="bg-white flex flex-col justify-center items-center w-[500px] min-h-[90vh] mx-auto rounded-lg max-w-[100%]">
    <img src={img} alt="logo" className="h-[200px] w-[200px] mx-auto mb-10"/>
      <input
        type="email"
        placeholder="Email"
        className=" px-8 py-3 mb-5 w-2/3 rounded-md border-2"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className=" px-8 py-3 mb-10 w-2/3 rounded-md border-2"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <button className="rounded-lg text-white bg-[#0f47ad] w-2/3 py-1" type="submit">
        Submit
      </button>
      </div>
    </form>
    )}
   
    </>
  );
}

export default Form;
