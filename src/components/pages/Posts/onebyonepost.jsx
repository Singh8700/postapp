import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
API = "http://localhost:3030/api/post"
const OneByOnePost = () => {
    const {postId} = useParams()   
    const [singlePost,setSinglePost] = useState()


    useEffect(async()=>{
        await setSinglePost(`${API}?id=${postId}`)
        console.log(singlePost)
    },[])
    return (
        <div className='mt-20'>
            <div className="card">
                <p>Post ID: {postId}</p>
            </div>
        </div>
    );
};

export default OneByOnePost;
