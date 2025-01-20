import React, { useEffect, useState } from 'react'
import { handelError, handelSuccess } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
// import TestPost from './test'
import { ToastContainer } from 'react-toastify'

const EditPost = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [loggedUser, setLoggedUser] = useState()
    const [open, setOpen] = useState(true)
    const [loggedId,setLoggedId] = useState()

    useEffect(() => {
        setLoggedUser(localStorage.getItem("loggedInUser"))
        setLoggedId(sessionStorage.getItem("id"))
        // setOldData(sessionStorage.getItem(data))
    }, [])

    const [editPost,setEditPost] = useState({
        id: id,
        title:"",
        post:"",
    })

    const handelOnChange = (e)=>{
        const {name,value} = e.target
        const copyPost = {...editPost}
        copyPost[name] = value
        setEditPost(copyPost)
    }

    const handelEditPost = async (e)=>{
       e.preventDefault()
        // extract the data to createPost usestate
        const {id,title,post} = editPost
        console.log("id is",id,"titel is",title,"post is",post)
        if(!id || !title || !post){
            handelError("Something want wrong")
        }
        try{
            const url = `http://localhost:3030/auth/edit_post/${id}`
            const response = await fetch(url,{
                // difne method
                method:'POST',
                // define header for data
                  headers:{
                    "Content-Type" : "application/json",
                  },
                // define body data
                body: JSON.stringify(editPost)
              })

            const result = await response.json()
            const {msg,success} = result
            console.log(result)
            sessionStorage.removeItem("title")
            sessionStorage.removeItem("post")
            
            if(success){
               handelSuccess(msg)
                setTimeout(()=>{
                    navigate(`/postapp`)
                },100)
            }else{
                handelError("something wont")
            }
        }catch (error) {
            handelError(error)
        }
    }
    
   
  



    return (
        <div className='create-post w-[100vw] '>
            <div className="main">
                <h3>Welcome to <span className='text-green-300 capitalize '>{loggedUser}</span></h3>
            </div>
            {open ?
                <div className={`form ${open?"flex":"hidden"} w-[100vw] backdrop:blur-4 flex-col float-start`}>
                    <div className="close flex justify-end m-10">
                        <button onClick={() => setOpen(false)}>close</button>
                    </div>
                    <form onSubmit={handelEditPost}
                        className='flex w-full justify-center items-center flex-col gap-8'>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={handelOnChange}
                            className='w-[85%] lg:w-[65%] rounded-md bg-transparent'
                            autoFocus
                            required
                            placeholder={sessionStorage.getItem("title")}
                            />
                        <textarea
                            name="post"
                            id="post"
                            placeholder={sessionStorage.getItem("post")} 
                            required
                            onChange={handelOnChange}
                            className='h-[200px] w-[85%] resize-none bg-transparent rounded-md'>
                                {sessionStorage.getItem("post")} 
                            </textarea>
                        <button type="submit" className='border py-3 px-4 bg-yellow-400'>Update Post</button>
                    </form>
                    
                </div> 
                :
                <></>}
                <ToastContainer/>
        </div>
    )
}

export default EditPost