import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import useCoustomerAuth from '../../Auth/useCoustomerAuth'
import FrontendMainLayout from '../../Layout/Frontend/FrontendMainLayout'
import ProductPageLayout from '../../Layout/Frontend/ProductPageLayout'
import Cart from '../../Pages/Frontend/Cart'
import Checkout from '../../Pages/Frontend/Checkout'
import Home from '../../Pages/Frontend/Home'
import Login from '../../Pages/Frontend/Login'
import Order from '../../Pages/Frontend/Order'
import Products from '../../Pages/Frontend/Products'
import ProductSingle from '../../Pages/Frontend/ProductSingle'
import Profile from '../../Pages/Frontend/Profile'
import ProfileEdit from '../../Pages/Frontend/ProfileEdit'
import SignUp from '../../Pages/Frontend/SignUp'
import ProtectedFrontEndRoutes from './ProtectedFrontEndRoutes'

const FrontendRoutes = () => {

  useCoustomerAuth()

  return (
    <>
      <div className='text-white p-1 text-end bg-dark'>
        <Link className='me-5 text-white btn btn-sm btn-primary' to={'/admin'} target={'_blank'} >Go to Admin Dashboard</Link>
      </div>

      <Routes>
        <Route element={<FrontendMainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<ProductPageLayout />} >
            <Route path='/products' element={<Navigate to={'/products/all'} />} />
            <Route path='/products/:category' element={<Products />} />
          </Route>

          <Route path='/products/:category/:id' element={<ProductSingle />} />
          <Route path='/cart' element={<Cart />} />

          <Route element={<ProtectedFrontEndRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<ProfileEdit />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order' element={<Order />} />
          </Route>

        </Route>
      </Routes>
        
    </>
  )
}

export default FrontendRoutes