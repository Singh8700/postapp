
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState } from 'react';
import {handelError, handelSuccess} from "../utils"
const OneByOnePost = () => {
  const [isLoading,setIsLoading] = useState(true)
    const {postId} = useParams();
    const [isPost,setIsPost] = useState([])
    const [date,setDate] = useState()
  
    const [postidsend,setPostidsend] = useState({
      id:postId
    })
  //  console.log(postId)
   const loadData = async()=>{
    const url = `https://postserver-tjeg.onrender.com/auth/post/${postId}`
    const response = await fetch(url,{
      // difne method
      method:'POST',
      // define header for data
        headers:{
          "Content-Type" : "application/json",
        },
      // define body data
      body: JSON.stringify(postidsend)
    })
    const postResult = await axios.post(url)
      // console.log(postResult.data)
      const {msg,success} = await postResult.data
      // console.log(postResult)
      setIsPost(postResult.data.results)

      const localDate = postResult.data.results.data
      // console.log("date is ", new Date(localDate))
      const dates = new Date(localDate)
    const day = String(dates.getDate()).padStart(2,"0")
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const month = months[dates.getMonth()]
    const year = dates.getFullYear()

    const fullDate = `${day}-${month}-${year}`
    // console.log(dates)
    setDate(fullDate)
      if(success){
        handelSuccess(msg)
      //  console.log(isPost)
      }else{
        handelError("Something want wrong")
      }
    }

   useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
    loadData()
   },[])

if(isLoading){
  return(
    <div className='w-screen h-screen flex justify-center items-center'>
      <h1>
        Loading....
      </h1>
    </div>
  )
}
  

  return (
    <div className='w-[100vw]  absolute top-[5%] md:absolute md:top-[10%] flex justify-center items-center flex-col'>
      <Link to="/" className='w-full text-right mr-10'>Back</Link>
       {/* title */}
     <div className="heading capitalize mt-5 font-serif">
        <h1 className=''>
          {isPost.title}
        </h1>
      </div>

     <div className="flex w-full bg-zinc-800 flex-wrap justify-between p-2 sm:flex-col md:flex-row ">
      <div className="left sm:w-full md:w-1/2">
        Date of Post : {date}
      </div>
      <div className="right sm:w-full md:w-1/2 text-right">
        Post Creater {isPost.userName}
      </div>
     </div>
    {/* post*/}
    <div className="para w-full p-5 flex justify-start items-start capitalize">
      <p className='text-left'>
        {isPost.post}
      </p>
    </div>
    </div>
  )
}

export default OneByOnePost