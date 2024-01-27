"use client"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Page = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [data,setData] = useState({
        fullName:"",
        username:"",
        email:"",
        password:""
    })


    const changeHandler = (e)=>{
    
        setData({...data,[e.target.name]:e.target.value})
    }

    const submitdata = async(e)=>{
        e.preventDefault()
       const res = await axios.post("http://localhost:3000/api/users/signup",data)
       if (res.data.success) {
        alert(res.data.message)
       }
       else{
        alert(res.data.message)

       }

    }

  return (
    <div className='bg-gray-200 border border-green-800 h-screen'>
        
      <form onSubmit={submitdata} className='max-w-2xl mx-auto mt-10 shadow-lg bg-white rounded-lg p-4 border  ' >
      <h1 className='text-2xl mb-4 font-semibold '>Create <span className='text-blue-700 font-bold'>Your Account</span> </h1>
        <div className='mb-2'>
        <label  className='block text-lg mb-1' htmlFor="fullName">Full Name :</label >
        <input required onChange={changeHandler} value={data.fullName} className='border w-full py-1 px-2 rounded-sm ' name='fullName' placeholder='Full Name' type="text" />
        </div>

        <div className='mb-2'>
        <label  className='block text-lg mb-1' htmlFor="username">Username :</label >
        <input required onChange={changeHandler} value={data.username} className='border w-full py-1 px-2 rounded-sm ' name='username' placeholder='Username' type="text" />
        </div>

        <div className='mb-2'>
        <label  className='block text-lg mb-1' htmlFor="email">Email :</label >
        <input required onChange={changeHandler} value={data.email} className='border w-full py-1 px-2 rounded-sm ' name='email' placeholder='Email' type="text" />
        </div>
        
        <div className='mb-2'>
        <label  className='block text-lg mb-1' htmlFor="password">Password :</label >
        {/* <input className='border w-full py-1 px-2 rounded-sm ' name='password' placeholder='Password' type="text" /> */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            name="password"
            required
            onChange={changeHandler}
            value={data.password}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-0 right-0 mt-2 mr-4 cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-2-2m-2-2l-2-2m-2-2l-2-2m-2-2l-2-2m-2-2l-2-2m-2-2l-2-2m-2-2l-2-2m-2-2l-2-2M7 7l2 2m2 2L7 7m2 2l2 2m2 2-2 2"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"
                ></path>
              </svg>
            )}
          </button>
        </div>
       
       
        </div> 

        <button className='text-lg border px-3 py-1 mt-3 bg-blue-700 text-white rounded-md' >Register</button>

      </form>
    </div>
  )
}

export default Page
