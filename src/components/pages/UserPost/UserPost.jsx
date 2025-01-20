import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { handelError, handelSuccess } from '../utils'

const UserPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userId, setUserId] = useState([])
    const [oldDta,setOldData] = useState({
        "title":"",
        "post":""
    })

    const userInfo = async () => {
        const url = `https://postserver-tjeg.onrender.com/user/account/${id}`
        await fetch(url, {
            method: "pOST",
            param: id
        })
        const response = await axios.post(url)
        // console.log(response.data)
        const results = response.data
        const { msg, success, userData } = results
        if (success) {
            handelSuccess(msg)
            setUserId(userData)
        } else {
            handelError("something want wrong")
        }
    }

    const likes = async (user, postId) => {
        // console.log("clicked")
        const url = "hhttps://postserver-tjeg.onrender.com/api/likes"
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": postId,
                "user": user
            })
        })
        setTimeout(()=>{
            navigate(`/postapp`)
        },100)        
    }
    const handelEdit = (data)=>{
        sessionStorage.setItem(
            "title",data.title)
        sessionStorage.setItem("post",data.post)
    }

    useEffect(() => {
        userInfo()
    }, [])

    const truncateContent = (content, length) => {
        if (content.length > length) {
            return content.slice(0, length) + '...';  // Add ellipsis if content is too long
        }
        return content;
    };

    const handelDelere = async(ids)=>{
        const url = `https://postserver-tjeg.onrender.com/auth/delete/${ids}`
        await fetch(url,{
            method:"POST",
            param:ids
        })
        setTimeout(()=>{
            navigate("/postapp")
        },100)
        
    }

    if (userId) {
        return (
            <>
                <div className="flex justify-center items-center w-[100vw] h-auto mt-20 flex-wrap gap-10">
                    {userId.map((item) => {
                        return (
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
                                    <Link to={!sessionStorage.getItem("id") ? "/postapp/login" : `/postapp/account/${item.user}`} className='flex justify-start items-end hover:text-zinc-100' onClick={() => likes(sessionStorage.getItem('id'), item._id)}>
                                        <span className='mr-2'>{item.likes.length}</span>
                                        {item.likes.length > 0 ? "Unlike" : "Like"}</Link>
                                    <div className="edit flex gap-5 text-sm">
                                        <Link to={`/postapp/edit/${item._id}`}
                                            className='text-zinc-600 hover:text-zinc-400' onClick={()=>handelEdit(item)}> Edit </Link>
                                        <Link to={`/postapp/account/${item.user}`} className='text-red-300 hover:text-red-500' onClick={()=>handelDelere(item._id)}> Delete</Link>
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
        <h1>Loading.....</h1>
        </>
    )
}

export default UserPost