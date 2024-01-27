"use client"
import React  from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {

const router = useRouter()
  const [data,setData] = useState({
    username:"",
    password:""
})


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  const changeHandler = (e)=>{
    
    setData({...data,[e.target.name]:e.target.value})
}



  const submitdata = async(e)=>{
    e.preventDefault()
   const res = await axios.post("http://localhost:3000/api/users/login",data)
   if (res.data.success) {
    alert(res.data.message)
    router.push("/admin")
   }
   else{
    alert(res.data.message)

   }

}


  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center">
       <div className="flex flex-col items-center">
      <form onSubmit={submitdata} className="bg-white shadow-lg rounded-lg max-w-sm mx-auto p-5  ">
        <div className="mb-4">
          <label className=" mt-4 mb-3" htmlFor="username ">
            Username :
          </label>
          <input
            className="w-full px-3 py-2 rounded border"
            onChange={changeHandler}
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </div>

        <label htmlFor="password " className=" mt-4 mb-3">
          Password :
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            name="password"
            required
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

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </div>
      </form>
      <h1 className="border  max-w-md w-full text-end mt-2 ">Forgot Password?</h1>
      </div>
    </div>
  );
};

export default page;
