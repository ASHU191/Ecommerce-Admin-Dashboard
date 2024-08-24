import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const FrontendMainLayout = () => {
  return (
    <>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </>
  )
}

export default FrontendMainLayout