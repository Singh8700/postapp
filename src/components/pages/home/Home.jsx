import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'
import Postview from '../Posts/post'


const Home = () =>{
  const[loggedInfo,setLoggedInfo] = useState('')
  // const navigate = useNavigate()
  useEffect(()=>{
    setLoggedInfo(localStorage.getItem('loggedInUser'))
  },[])




  return(
    <>
    <div className="w-[100vw] absolute top-[12%] md:top-[15%]">
      <Postview/>
      <Outlet/>
    </div>
    </>
  )
}

export default Home