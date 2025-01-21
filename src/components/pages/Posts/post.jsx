import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Postview = () => {
    const [allPost, setAllPost] = useState([])
    const navigate = useNavigate()
   const [loginPath,setLoginPath] = useState("/")
    const truncateContent = (content, length) => {
        if (content.length > length) {
          return content.slice(0, length) + '...';  // Add ellipsis if content is too long
        }
        return content;
      };

      const likes = async(user,postId) =>{
        // console.log("clicked")
        if(!user){
            navigate("/postapp/login")
        }else{
        const url ="https://postserver-tjeg.onrender.com/api/likes"
       const data =  await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "id":postId,
                "user":user
            })
        })
        setTimeout(()=>{
            navigate("/postapp")
          },1000)
    }
    }
    const dataGet = async (e) => {
        const url = "https://postserver-tjeg.onrender.com/api/post"
        const response = await axios.get(url)
        // console.log(response.data)
        setAllPost(response.data)
    }
    useEffect(() => {
        dataGet()
    }, [])

    if(!allPost.length){
       return(
        <div className='w-screen h-screen flex justify-center items-center'>
        <h1>Loading.........</h1>
        </div>
       )
    }
   

    
    return (
        <>
            <div className="w-[90vw] m-auto overflow-x-hidden flex justify-center items-center flex-wrap gap-10">
            {
                    allPost.map((item, index) => {
                        return (
                            <div className="card w-full sm:w-[80%]  m-auto flex justify-center items-center" key={index}>
                                {/* first card */}
                                <p class="capitalize block w-[500px] h-[200px] overflow-hidden max-w-xlg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <small className='text-zinc-200 flex justify-end capitalize'>
                                        {item.userName}
                                    </small>
                                    <h5 class="mb-2 text-2xl font-mono font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    <p class="font-normal text-gray-700 dark:text-gray-400">{truncateContent(item.post, 150)}
                                    <Link to ={`/postapp/post/${item._id}`}  className='flex justify-end text-xs'>Read More</Link>
                                    </p>
                                    
                                    <Link to={!sessionStorage.getItem("id")?"/postapp/login":"/postapp"} className='flex justify-start items-end hover:text-zinc-100' onClick={()=>likes(sessionStorage.getItem('id'),item._id)}>
                                        <span className='mr-2'>{item.likes.length}</span>
                                    {item.likes.length > 0?"Unlike":"Like"}
                                    </Link>

                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Postview