import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import RecycleBin from './pages/RecycleBin'
import Private from './Auth/Private'
import MyTodo from './pages/MyTodo'

const router = createBrowserRouter([
  {path:'',element:<Login/>},
  {path:'user/sign-up',element:<Signup/>},
  {element:<Private/>,children:[
    {path:'Dashboard/:username',element:<Dashboard/>},
    {path:'Recycle-bin',element:<RecycleBin/>},
    {path:'todo-list/:title',element:<MyTodo/>}
  ]}
])

const app = () => {



  return (
    <RouterProvider router={router}/>
  )
}

export default app
