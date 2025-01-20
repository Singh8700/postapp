import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handelError, handelSuccess } from '../utils'




const SignUp = () =>{
  const [show,setShow] = useState("Show Password")
    const [passtype,setPasstype] =useState("password")
  const navigate = useNavigate()
  const [signupInfo,setSignupInfo] = useState({
    userName:'',
    fullName:'',
    email:'',
    password:''
  })

  const handleChange = (e) =>{
    
    const {name,value} = e.target
    // console.log(name,value)
    const copySingupInfo = {...signupInfo}
    copySingupInfo[name] = value
    setSignupInfo(copySingupInfo)
  }
  // console.log(signupInfo)
  const handelSingup =async (e)=>{
    e.preventDefault()
    const {userName,fullName,email,password} = signupInfo
    if(!userName || !fullName || !email || !password){
      return handelError("All feild required")
    }
    try{
      const url = "https://postserver-tjeg.onrender.com/auth/signup"
      const response = await fetch(url,{
        method:'POST',
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json()
      console.log(result)
      const {msg,success} = result
      if(success){
        handelSuccess(msg)
         await setTimeout(() => {
          navigate("/login")
        }, 3000);
      
      }else{
        handelError(msg)
      }
    }catch(e){
      handelError(e)
    }
  }

  const handelPassword =(e)=>{
    const PasswordElement = document.getElementById("password")
    if(PasswordElement.type === "password"){
      setPasstype("text")
      setShow("Hide Password")
    }else{
      setPasstype("password")
      setShow("Show Password")
    }
  }

  return(
    <>
    <div className="formSection">
    <div className="container">
    {/* title section */}
    <div className="title">
      <h1>
        Create an Account
      </h1>
    </div>
    {/* form section */}
    <form onSubmit={handelSingup}>
      {/* userName section */}
      <div className="userName">
        <label htmlFor="userName">User Name</label>
          <input 
          type="text" 
          name="userName"
          onChange={handleChange}
          id="userName" 
          autoFocus
          placeholder='Enter User Name'
          />
       
      </div>
      {/* fullname section */}
      <div className="fullName">
        <label htmlFor="fullName">Full Name</label>
          <input 
          type="text" 
          name="fullName"
          id="fullName" 
          onChange={handleChange}
          placeholder='Enter Full Name'
          />
        
      </div>
      {/* email section */}
      <div className="email">
        <label htmlFor="email">E-mail</label>
          <input 
          type="email" 
          name="email"
          onChange={handleChange}
          id="email"
          placeholder='Enter Email'
          />
      
      </div>
     {/* password section */}
     <div className="password">
        <label htmlFor="password">Password</label>
          <input 
          type={passtype} 
          name="password"
          id="password" 
          className='relative'
          onChange={handleChange}
          placeholder='•••••••'
          />
          <label htmlFor='password' className='relative left-[70%] mt-2 text-xs cursor-pointer' onClick={handelPassword}>{show}</label>
      </div>
    <button type="submit" className='btn border bg-blue-400 hover:bg-zinc-600 py-2 px-3'>Sign Up</button>
    <span>
      Already have an account
        <Link to="/login" className='ml-4'>Login</Link>
    </span>
    </form>
    <ToastContainer/>
   </div>
    </div>
    </>
  )
}

export default SignUp