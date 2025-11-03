import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from './Category'
import Contact from './Contact'
import Home from './Home'
import ProductDetails from './ProductDetail'
import Cart from './Cart'
import AuthPage from './AuthPage'
import Checkout from './Checkout'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthPage/>} />
        <Route path='/about' element={<Category />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>

    </>
  )
}

export default Routing
