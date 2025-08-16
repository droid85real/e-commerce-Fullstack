import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../component/Header/Navbar'
import About from './About'
import Contact from './Contact'
import Collection from './Collection'
import Login from './Login'

const Home = () => {
  return (
  <>
  <Routes>
    <Route path='/' element={<Navbar/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/collection' element={<Collection/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
  
  </>
  )
}

export default Home
