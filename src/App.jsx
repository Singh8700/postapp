import { useEffect } from "react"
import "./App.css"
import Components from './components/components'
import Navbar from './components/pages/home/navbar'
import { ToastContainer } from 'react-toastify'

function App() {
 
  useEffect(()=>{
    if(!sessionStorage.getItem("id")){
      localStorage.clear()
      sessionStorage.clear()
    }
  },[])

  return (
    <>
    <Navbar/>
    <ToastContainer/>
      <Components/>
    </>
  )
}

export default App
