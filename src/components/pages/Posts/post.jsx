import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Postview = () => {
    const [allPost, setAllPost] = useState([])

    const dataGet = async (e) => {
        const url = "http://localhost:3030/api/post"
        const response = await axios.get(url)
        console.log(response.data)
        setAllPost(response.data)
    }

    useEffect(() => {
        dataGet()
    }, [])

    const truncateContent = (content, length) => {
        if (content.length > length) {
          return content.slice(0, length) + '...';  // Add ellipsis if content is too long
        }
        return content;
      };

      const handelPost = (e) =>{
        // console.log("post is is :",e)
        
      }
    
    return (
        <>
            <div className="main">

                {
                    allPost.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                {/* first card */}
                                <p class="capitalize block w-[500px] h-[200px] overflow-hidden max-w-xlg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <small className='text-zinc-200 flex justify-end capitalize'>
                                        {item.userName}
                                    </small>
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    <p class="font-normal text-gray-700 dark:text-gray-400">{truncateContent(item.post, 150)}
                                    <Link to={`/post/:${item._id}`} className='flex justify-end text-xs' onClick={()=> handelPost(item._id)}>Read More</Link>
                                    </p>
                                    
                                    <Link to="/" className='flex justify-start items-end hover:text-zinc-100'>
                                        <span className='mr-2'>0</span>
                                        Link</Link>

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