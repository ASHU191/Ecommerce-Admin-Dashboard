import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'
import Spiner from '../Components/Spiner'

// import FrontendRoutes from './Frontend/FrontendRoutes'
// import AdminRoutes from './Admin/AdminRoutes'

const FrontendRoutes = lazy(()=> import('./Frontend/FrontendRoutes'))
const AdminRoutes = lazy(()=> import('./Admin/AdminRoutes'))

const Index = () => {
  return (
    <>
      <Suspense fallback={<div className='text-center mt-4 h3'><Spiner /></div>}>
        <Routes>
            <Route path='/*' element={<FrontendRoutes />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default Index