import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate , Navigate} from 'react-router-dom'
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
  },[])
  
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/postapp/user"/>}/>
        <Route path="/postapp/user" element={<Home/>}/>
        <Route path="/postapp/login" element={<Login/>}/>
        <Route path="/postapp/signup" element={<SignUp/>}/>
        <Route path={(dataGet)?"/*:id":navigate("/login")} element={<Home/>}/>
        <Route path={(dataGet)?"/postapp/create_post":navigate("/postapp/login")} element={<CreatePost/>}/>
        <Route path={(dataGet)?"/postapp/post/postapp:postId":navigate("/postapp/login")} element={<OneByOnePost/>}/>
    </Routes>
  )
}

export default Components