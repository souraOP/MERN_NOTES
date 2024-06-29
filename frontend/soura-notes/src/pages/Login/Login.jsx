import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordIP from '../../components/Input/PasswordIP';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axios-instance';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validatiing the email
    if(!validateEmail(email)) {
      setError("Please Enter correct Email Address");
      return;
    }

    if(!password){
      setError("Please Enter Password");
      return;
    }
    setError("");

    // calling our login api
    try{
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      // console.log("Responses: ", response);
      // for successfull login
      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // for invalid credentials
      // console.log("Error:", error);
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-32 text-yellow-50'>
        <div className="border-2 w-96 border-dashed border-green-500 rounded-lg bg-green-950/10 filter backdrop-blur-md px-8 py-12 shadow-[0px_0px_60px_20px_rgba(242,242,242)]">
          <form onSubmit={handleSubmit}>
            <h4 className="text-3xl lg:text-4xl mb-7 font-semibold text-center">
              Welcome Back !
            </h4>
            <input 
              type="text" 
              placeholder='Email' 
              className='input-box'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <PasswordIP 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>Login</button>

            <p className = "text-sm mt-4 text-center text-balance">
              Not Registered Yet?{" "}
              <Link to="/signup" className='font-medium text-primary underline'>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
