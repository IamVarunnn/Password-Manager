import { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Footer from "./components/Footer"
function App() {
  

  return (
    <>
    <Navbar/>

    <div className=" bg-gradient-to-br from-green-100 via-white to-green-200" >
    
      <Manager/>
      </div>
    
    <Footer/>
    </>
  )
}

export default App
