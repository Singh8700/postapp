import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { handelError, handelSuccess } from '../utils'

const UserPost = () => {
    const {id} = useParams()
    const [userId,setUserId] = useState([])

    const userInfo = async() =>{
        const url = `https://postserver-tjeg.onrender.com/user/account/${id}`
        await fetch(url,{
            method:"pOST",
            param:id
        })
        const response = await axios.post(url)
        // console.log(response.data)
        const results = response.data
        const {msg,success,userData} = results
        if(success){
            handelSuccess(msg)
            setUserId(userData)
        } else{
            handelError("something want wrong")
        }
    }

    const likes = (e) =>{
        console.log("user id is ",e)
    }

    useEffect(()=>{
        userInfo()
    },[])

    const truncateContent = (content, length) => {
        if (content.length > length) {
          return content.slice(0, length) + '...';  // Add ellipsis if content is too long
        }
        return content;
      };

    if(userId){
        return(
            <>
               <div className="flex justify-center items-center w-[100vw] h-auto mt-20 flex-wrap gap-10">
                {userId.map((item)=>{
                    return(
                        <div className="post w-[400px] px-5 py-2 rounded-xl shadow-xl border border-zinc-500" key={item._id}>
                            <div className="title w-full flex justify-between items-center">
                            <h1 className='text-xl capitalize text-left'>
                                {item.title}
                            </h1>
                            <h4 className=''>
                                {item.userName}
                            </h4>
                            </div>
                            <div className="content capitalize">
                            {truncateContent(item.post, 150)}
                            </div>

                            <div className="button w-full flex justify-between mt-10">
                                <Link to={`#`} onClick={()=>likes(item.user)}>
                                0 likes
                                </Link>
                                <div className="edit flex gap-5 text-sm">
                                    <Link to={`/edit/${item._id}`}
                                    className='text-zinc-600 hover:text-zinc-400'> Edit </Link>
                                    <Link to={`/delete/${item._id}`} className='text-red-300 hover:text-red-500'> Delete</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
               </div>
            </>
        )
    }
  return (
    <>
    </>
  )
}

export default UserPost