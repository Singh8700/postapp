import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { handelSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import Navbar from './navbar'
import Postview from '../Posts/post'


const Home = () =>{
  const[loggedInfo,setLoggedInfo] = useState('')
  // const navigate = useNavigate()
  useEffect(()=>{
    setLoggedInfo(localStorage.getItem('loggedInUser'))
  },[])

 



  return(
    <>
    <div className="header w-screen">
      <Postview/>
      <Outlet/>
    </div>
    </>
  )
}

export default Home