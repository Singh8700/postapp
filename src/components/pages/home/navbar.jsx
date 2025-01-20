import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [userId,setUserId] = useState()
    const [userData,setUserData] = useState()
    const [autoHide,setAutoHide] = useState("hidden")

    useEffect(()=>{
        setUserData(localStorage.getItem("loggedInUser"))
        setUserId(sessionStorage.getItem("id"))
        // alert(userData)
        
    },[navigate])

const handleAutoHide = (e)=>{
  if(autoHide == "hidden"){
     setAutoHide("block")
  }else{
    setAutoHide("hidden")
  }
}

const autoClose = (e)=>{
  setTimeout(() => {
    setAutoHide("hidden")
  }, 100);
}

    const handelLogOut = async(e)=>{
        // e.preventDefault()
        localStorage.clear()
        sessionStorage.clear()
        handelSuccess("LogOut Successfully")
       await setTimeout(()=>{
          navigate("/user")
          autoClose()
        },1000)
      }
  return (
    <>
        {/* nav section */}
<nav class="bg-white border-gray-900 dark:bg-gray-900 w-[100vw] absolute top-0 left-0 z-50">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
    <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">K Post</span>
    </Link>
    <button type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={handleAutoHide}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`${autoHide} w-full md:block md:w-auto`} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick={autoClose}>Home</Link>
        </li>
        <li>
    
        </li>
        {(userData)?<div className='flex gap-3 sm:flex-col sm:gap-5 md:flex-row'>
          <li>
          <Link to={`/account/${userId}`} class="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={autoClose}>My Post</Link>
        </li>
        
        <li>
          <Link to="/create_post" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={autoClose}>Create Post</Link>
        </li>

            <li>
          <Link to="/" class="block mr-5 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handelLogOut} >LogOut</Link>
        </li>
        
        </div>:
        <div className='flex gap-2 md:flex-row sm:flex-col sm:gap-0'>
            <li>
          <Link to="/login" class="block mr-5 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={autoClose}>login</Link>
        </li>
        <li>
          <Link to="/signup" class="block py-2 px-3  py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={autoClose}>Create an Account</Link>
        </li>    
        </div>}
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar