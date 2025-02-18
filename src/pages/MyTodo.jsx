import { useEffect, useState } from 'react'
import '../style/MyTodo.css'
import { getOneById } from '../Auth/Api'
import { useNavigate } from 'react-router-dom'

const MyTodo = () => {
    const [myUser,setMyUser] = useState('')
    const [theTodo,setTheTodo] = useState('')
    const nav = useNavigate()

    useEffect(()=>{
        getOneById(setMyUser)
        setTheTodo(JSON.parse(localStorage.getItem('mytodo')))
    },[])

    // console.log(theTodo)

  return (
    <div className='my-todo'>
       {
        myUser ?  <>
        <div className="title-holder">
        <p>{theTodo?.title}</p>
      </div>
      <div className="content-holder">
        <p>{theTodo.content}</p>
      </div>
        </> : <p style={{fontSize:25,fontWeight:600}}>Loading...</p>
       }
      <button className='back-btn' onClick={()=>{nav(`/Dashboard/${myUser.username}`);localStorage.removeItem('mytodo')}}>back</button>
    </div>
  )
}

export default MyTodo

