import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Postview = () => {
    const [allPost, setAllPost] = useState([])

    const dataGet = async (e) => {
        const url = "https://postserver-tjeg.onrender.com/api/post"
        const response = await axios.get(url)
        // console.log(response.data)
        setAllPost(response.data)
    }

    useEffect(() => {
        dataGet()
    }, [])

    if(!allPost){
       return(
        <div className='flex justify-center items-center'>
        <h1>Loading.........</h1>
        </div>
       )
    }
   

    const truncateContent = (content, length) => {
        if (content.length > length) {
          return content.slice(0, length) + '...';  // Add ellipsis if content is too long
        }
        return content;
      };

     
    
    return (
        <>
            <div className="w-[90vw] m-auto overflow-x-hidden flex justify-center items-center flex-wrap gap-10">
            {
                    allPost.map((item, index) => {
                        return (
                            <div className="card w-full sm:w-[80%] sm:bg-red-500 m-auto flex justify-center items-center" key={index}>
                                {/* first card */}
                                <p class="capitalize block w-[500px] h-[200px] overflow-hidden max-w-xlg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <small className='text-zinc-200 flex justify-end capitalize'>
                                        {item.userName}
                                    </small>
                                    <h5 class="mb-2 text-2xl font-mono font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                    <p class="font-normal text-gray-700 dark:text-gray-400">{truncateContent(item.post, 150)}
                                    <Link to ={`/postapp/post/${item._id}`}  className='flex justify-end text-xs'>Read More</Link>
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