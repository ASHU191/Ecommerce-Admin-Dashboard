// import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import useAdminAuth from '../../Auth/useAdminAuth'
// import Spiner from '../../Components/Spiner'

import AdminLayout from '../../Layout/Admin/AdminLayout'
import ProtectedAdminRoutes from './ProtectedAdminRoutes'

import Login from '../../Pages/Admin/Login'
import Dashboard from '../../Pages/Admin/Dashboard'
import Banners from '../../Pages/Admin/Banners'
import BannerAdd from '../../Pages/Admin/BannerAdd'
import Category from '../../Pages/Admin/Category'
import CategoryAdd from '../../Pages/Admin/CategoryAdd'
import Coupon from '../../Pages/Admin/Coupon'
import Customers from '../../Pages/Admin/Customers'
import CustomerProfile from '../../Pages/Admin/CustomerProfile'
import Orders from '../../Pages/Admin/Orders'
import OrderView from '../../Pages/Admin/OrderView'
import Products from '../../Pages/Admin/Products'
import ProductAdd from '../../Pages/Admin/ProductAdd'
import ProductView from '../../Pages/Admin/ProductView'
import ProductEdit from '../../Pages/Admin/ProductEdit'
import Users from '../../Pages/Admin/Users'
import UserAdd from '../../Pages/Admin/UserAdd'
import UserProfile from '../../Pages/Admin/UserProfile'
import UserEdit from '../../Pages/Admin/UserEdit'
import Profile from '../../Pages/Admin/Profile'
import ProfileEdit from '../../Pages/Admin/ProfileEdit'

// const Login = lazy(()=> import ('../../Pages/Admin/Login'))
// const Dashboard = lazy(()=> import ('../../Pages/Admin/Dashboard'))
// const Banners = lazy(()=> import ('../../Pages/Admin/Banners'))
// const BannerAdd = lazy(()=> import ('../../Pages/Admin/BannerAdd'))
// const Category = lazy(()=> import ('../../Pages/Admin/Category'))
// const CategoryAdd = lazy(()=> import ('../../Pages/Admin/CategoryAdd'))
// const Coupon = lazy(()=> import ('../../Pages/Admin/Coupon'))
// const Products = lazy(()=> import ('../../Pages/Admin/Products'))
// const ProductAdd = lazy(()=> import ('../../Pages/Admin/ProductAdd'))
// const ProductView = lazy(()=> import ('../../Pages/Admin/ProductView'))
// const ProductEdit = lazy(()=> import ('../../Pages/Admin/ProductEdit'))
// const Orders = lazy(()=> import ('../../Pages/Admin/Orders'))
// const OrderView = lazy(()=> import ('../../Pages/Admin/OrderView'))
// const Customers = lazy(()=> import ('../../Pages/Admin/Customers'))
// const CustomerProfile = lazy(()=> import ('../../Pages/Admin/CustomerProfile'))
// const Users = lazy(()=> import ('../../Pages/Admin/Users'))
// const UserProfile = lazy(()=> import ('../../Pages/Admin/UserProfile'))
// const UserAdd = lazy(()=> import ('../../Pages/Admin/UserAdd'))
// const UserEdit = lazy(()=> import ('../../Pages/Admin/UserEdit'))
// const Profile = lazy(()=> import ('../../Pages/Admin/Profile'))
// const ProfileEdit = lazy(()=> import ('../../Pages/Admin/ProfileEdit'))

const AdminRoutes = () => {

  useAdminAuth()

  return (
    <>
        {/* <Suspense fallback={ <Spiner /> } > */}
          <Routes>
              <Route path='/login' element={<Login />} />

              <Route element={<AdminLayout />} >

                  <Route element={<ProtectedAdminRoutes />} >
                      <Route path='/' element={<Navigate to={'/admin/dashboard'} />} />
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/banners' element={<Banners />} />
                      <Route path='/banner/add' element={<BannerAdd />} />
                      <Route path='/category' element={<Category />} />
                      <Route path='/category/add' element={<CategoryAdd />} />
                      <Route path='/coupon' element={<Coupon />} />
                      <Route path='/products' element={<Products />} />
                      <Route path='/products/add' element={<ProductAdd />} />
                      <Route path='/products/:id' element={<ProductView />} />
                      <Route path='/products/:id/edit' element={<ProductEdit />} />
                      <Route path='/orders' element={<Orders />} />
                      <Route path='/orders/:id' element={<OrderView />} />
                      <Route path='/users' element={<Users />} />
                      <Route path='/users/add' element={<UserAdd />} />
                      <Route path='/users/:id' element={<UserProfile />} />
                      <Route path='/users/:id/edit' element={<UserEdit />} />
                      <Route path='/customers' element={<Customers />} />
                      <Route path='/customers/:id' element={<CustomerProfile />} />
                      <Route path='/profile' element={<Profile />} />
                      <Route path='/profile/edit' element={<ProfileEdit />} />
                  </Route>

              </Route>
          </Routes>
        {/* </Suspense> */}
    </>
  )
}

export default AdminRoutes