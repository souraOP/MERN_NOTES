import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordIP from '../../components/Input/PasswordIP';
import { validateEmail } from '../../utils/helper';
import {Link, useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axios-instance';

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!name) {
      setError("Please enter your Name");
      return;
    }
    if(!validateEmail(email)) {
      setError("Please enter a correct email address");
      return;
    }
    if(!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    // signup api call
    try{
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      // console.log("Responses: ", response);
      if(response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      // for successfull user account creation
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
    <React.Fragment>
      <Navbar />

      <div className='flex items-center justify-center mt-32 text-yellow-50'>
        <div className="border-2 border-dashed border-green-500 w-96 rounded-lg px-8 py-12 drop-shadow-lg bg-green-950/10 filter backdrop-blur-md shadow-[0px_0px_60px_20px_rgba(242,242,242)]">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl lg:text-5xl mb-7 font-semibold text-center">
              Sign Up
            </h4>
            <input 
              type="text" 
              placeholder='Name' 
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordIP 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
            <button type='submit' className='btn-primary text-2xl'>Create New Account</button>

            <p className = "text-base mt-4 text-center text-balance">
              Already have an Account?{" "}
              <Link to="/login" className='font-medium text-primary underline'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
