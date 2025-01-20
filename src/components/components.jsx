import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate , Navigate, data} from 'react-router-dom'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Home from './pages/home/Home'
import CreatePost from './pages/Posts/CreatePost'
import OneByOnePost from './pages/Posts/onebyonepost'
import UserPost from './pages/UserPost/UserPost'
import EditPost from './pages/Posts/EditPost'

const Components = () => {
  const [dataGet,setDataGet] = useState()
  const [paths,setPaths] =useState("/login")
  const navigate = useNavigate()
  useEffect(()=>{
    setDataGet(localStorage.getItem("loggedInUser"))
  },[navigate])

  const handelPaths = () =>{
    if(dataGet){
      return setPaths("/create_post")
    }
  }
  
  return (
    <Routes>
      <Route path="/postapp" element={<Navigate to="/" />}/> 
        <Route path="/" element={<Home/>}/>
        <Route path="/postapp/login" element={<Login/>}/>
        <Route path='/postapp/create_post' element={<CreatePost/>}/>
        <Route path="/postapp/signup" element={<SignUp/>}/>
        <Route path={paths} element={<CreatePost/>}/>
        <Route path="/postapp/post/:postId" element={<OneByOnePost/>}/>
        <Route path="/postapp/account/:id" element={<UserPost/>}/>
        <Route path="/postapp/edit/:id" element={<EditPost />}/>
    </Routes>
  )
}

export default Components