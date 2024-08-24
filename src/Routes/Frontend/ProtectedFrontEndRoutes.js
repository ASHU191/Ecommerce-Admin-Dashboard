import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedFrontEndRoutes = () => {

    const { isLogedIn } = useSelector(state => state.customerAuth)

    if (isLogedIn === undefined){
        return null
    } else if (isLogedIn) {
        return <Outlet />
    } else if (isLogedIn === false){
        return <Navigate to={'/login'} />
    }
  
}

export default ProtectedFrontEndRoutes;