import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
  return (
    <div>
      {userInfo?.token ? <Outlet/> : <Navigate to={'/'}/>}
    </div>
  )
}

export default Private
