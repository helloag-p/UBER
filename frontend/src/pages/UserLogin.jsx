import React, { useState,useContext} from 'react'
import { Link, Route,Routes } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [userData,setUserData]= useState({})
  const navigate=useNavigate()
  const {user,setUser}=useContext(UserDataContext)
  const submitHandler = async (e) => {
  e.preventDefault();

  const userData = {
    email: email.trim(),
    password,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const data = response.data;
    setUser(data.user);
    localStorage.setItem("token", data.token);
    navigate("/home");

  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data);

    alert(
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      "Login failed"
    );
  }

  setEmail("");
  setPassword("");
};
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <form  onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input required value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
           className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com'></input>
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input required 
          value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password'></input>
          <button className='bg-[#111]  text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>New Here?<Link to='/signup' className='text-blue-600'>Create new account</Link></p>
      </div>
      <div>
        <Link to='/captainlogin' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Sign in as captain</Link>
      </div>
        
    </div>
  )
}

export default UserLogin
