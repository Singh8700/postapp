import React, { useEffect, useState } from 'react'
import {  Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Home from './pages/home/Home'
import CreatePost from './pages/Posts/CreatePost'
import OneByOnePost from './pages/Posts/onebyonepost'

const Components = () => {
  const [dataGet,setDataGet] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    setDataGet(localStorage.getItem("loggedInUser"))
  },[navigate])
  
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/user"/>}/>
        <Route path="/user" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path={(dataGet)?"/*:id":navigate("/login")} element={<Home/>}/>
        <Route path={(dataGet)?"/create_post":navigate("/login")} element={<CreatePost/>}/>
        <Route path={(dataGet)?"/post/:postId":navigate("/login")} element={<OneByOnePost/>}/>
    </Routes>
  )
}

export default Components