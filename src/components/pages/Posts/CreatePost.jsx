import React, { useEffect, useState } from 'react'
import { handelError, handelSuccess } from '../utils'
import { useNavigate } from 'react-router-dom'
// import TestPost from './test'
import { ToastContainer } from 'react-toastify'

const CreatePost = () => {

    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState()
    const [open, setOpen] = useState(true)
    const [loggedId,setLoggedId] = useState()

    useEffect(() => {
        setLoggedUser(localStorage.getItem("loggedInUser"))
        setLoggedId(sessionStorage.getItem("id"))
    }, [])

    const [createPost,setCreatePost] = useState({
        id: sessionStorage.getItem("id"),
        title:"",
        post:"",
    })

    const handelOnChange = (e)=>{
        const {name,value} = e.target
        const copyPost = {...createPost}
        copyPost[name] = value
        setCreatePost(copyPost)
    }

    const handelCreatePost = async (e)=>{
       e.preventDefault()
        // extract the data to createPost usestate
        const {id,title,post} = createPost

        if(!id || !title || !post){
            handelError("Something want wrong")
        }
        try{
            const url = "https://postserver-tjeg.onrender.com/auth/create_post"
            const response = await fetch(url,{
                // difne method
                method:'POST',
                // define header for data
                  headers:{
                    "Content-Type" : "application/json",
                  },
                // define body data
                body: JSON.stringify(createPost)
              })

            const result = await response.json()
            const {msg,success} = result
            if(success){
               handelSuccess(msg)
                setTimeout(()=>{
                    navigate("/postapp")
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
            <>
                <div className={`form ${open?"flex":"hidden"} w-[100vw] backdrop:blur-4 flex-col float-start`}>
                    <div className="close flex justify-end m-10">
                        <button onClick={() => setOpen(false)}>close</button>
                    </div>
                    <form onSubmit={handelCreatePost}
                        className='flex w-full justify-center items-center flex-col gap-8'>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={handelOnChange}
                            className='w-[85%] lg:w-[65%] rounded-md bg-transparent'
                            autoFocus
                            placeholder='Which your Title' />
                        <textarea
                            name="post"
                            id="post"
                            placeholder='Describe yourself'
                            onChange={handelOnChange}
                            className='h-[200px] w-[85%] resize-none bg-transparent rounded-md'></textarea>
                        <button type="submit" className='border py-3 px-4 bg-blue-400'>Create Post</button>
                    </form>
                    
                </div> 
                </>
                :
                <></>}
        </div>
    )
}

export default CreatePost