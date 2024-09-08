import React, { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { jwtDecode } from "jwt-decode";
import { replace, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import  "./form.css";
import Swal from "sweetalert2";

function Form() {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("https://localhost:7015/siginin", formData)

      .then((res) => {
        if (
          signIn({
            auth: {
              token: res.data.token,
              type: "Bearer",
            },
          })
        ) {
          navigate("/Home", { replace: true });
        }

        Cookies.set("token", res.data.data.token, { expires: 0.25 });

        let { role } = jwtDecode(JSON.stringify(res.data));
        setRole(role);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Incorrect Email or Password",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="   flex flex-col justify-center items-center  max-w-[100%] min-h-[100vh] form"
      >
        <input
          type="email"
          placeholder="Email"
          className="enabled:hover:border-gray-400 disabled:opacity-75 px-8 py-3 mb-5 w-1/2 rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="enabled:hover:border-gray-400 disabled:opacity-75 px-8 py-3 mb-10 w-1/2 rounded-md"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button className="rounded-full bg-cyan-500 w-1/2 py-1" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
