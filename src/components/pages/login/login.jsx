import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handelError, handelSuccess } from '../utils'


const Login = () =>{
  const navigate = useNavigate()
  const [show,setShow] = useState("Show Password")
  const [passtype,setPasstype] =useState("password")
  // login state create
  const [loginData,setLoginData] =useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    // console.log(name,value)
    const copyData = {...loginData}
    copyData[name] = value
    // console.log(copyData)
    setLoginData(copyData)
  }

  // login function
  const handleLogin =  async(e) =>{
    e.preventDefault()
    // extract the data
    const {email,password} = loginData

    // check feild is empty 
    if(!email || !password){
      return handelError("Something want wrong")
    }
try{

    // console.log(email,password)
    const url = "http://localhost:3030/auth/login"
    const response = await fetch(url,{
      // difne method
      method:'POST',
      // define header for data
        headers:{
          "Content-Type" : "application/json",
        },
      // define body data
      body: JSON.stringify(loginData)
    })

    // console.log(response)
    const result = await response.json()
    const {msg,success,id,token,name} = result
    if(success){
   await localStorage.setItem("loggedInUser",name)
   await localStorage.setItem("token",token)
  await sessionStorage.setItem("id",id)
   await handelSuccess(msg)
    await  setTimeout(()=>{
        navigate("/user")
      },1000)
    }else{
      handelError(msg)
    }
    
  }catch (e){
    handelError("Something want wrong",e)
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
        Login
      </h1>
    </div>
    {/* form section */}
    <form onSubmit={handleLogin}>
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
    <button type="submit" className='btn border bg-blue-400 hover:bg-zinc-600'>Login</button>
    <span>
      Don't have an account
        <Link to="/signup"> Create an account</Link>
    </span>
    </form>
    <ToastContainer/>
   </div>
   </div>
    </>
  )
}

export default Login