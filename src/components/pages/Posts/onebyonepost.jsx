
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState } from 'react';
import {handelError, handelSuccess} from "../utils"
const OneByOnePost = () => {
    const {postId} = useParams();
    const [isPost,setIsPost] = useState([])
    const [postidsend,setPostidsend] = useState({
      id:postId
    })
  //  console.log(postId)
   const loadData = async()=>{
    const url = `http://localhost:3030/auth/post/${postId}`
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
      setIsPost(postResult.data.results)
      if(success){
        handelSuccess(msg)
       console.log(isPost)
      }else{
        handelError("Something want wrong")
      }
    }
     

   useEffect(()=>{
    loadData()
   },[])
  return (
    <div className='w-[100vw] absolute z-50 top-[10%] md:absolute md:top-[30%]'>
    user id {isPost._id}
    </div>
  )
}

export default OneByOnePost