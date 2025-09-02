import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Category from './Category'
import Contact from './Contact'
import Collection from './Collection'
import Login from './Login'
import Home from './Home'
import ProductDetails from './ProductDetail'
import App from '../App'
import LoginForm from './LoginForm'
import Signup from './Signup'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/about' element={<Category />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path='/home' element={<Home/>} />
      </Routes>

    </>
  )
}

export default Routing
