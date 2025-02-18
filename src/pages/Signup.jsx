import { useState } from 'react'
import { IoCaretBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { funcSignup } from '../Auth/Api'
import toast, {Toaster} from 'react-hot-toast';


const Signup = () => {
    const nav = useNavigate()
    const [loading,setLoading] = useState(false)
    const [userData,setUserdata] = useState({
        username:'',
        email:'',
        password:''
    })

   const onchangeFunc = (e)=>{
        const {value,name} = e.target
        setUserdata({...userData,[name]:value})
   }
  //  console.log(userData)

  return (
        <div className='login'>
          <div className="login-wrapper">
            <Toaster/>
            <div className="backicon-holder" onClick={()=>nav('/')}>
            <IoCaretBackOutline />
            </div>
            <form onSubmit={(e)=>funcSignup(e,userData,setLoading,nav)}>
              <h4>Sign up</h4>
              <input type="text" placeholder='username'
                name='username'
                value={userData.username}
                onChange={onchangeFunc}
              />
              <input type="email" placeholder='email'
                name='email'
                value={userData.email}
                onChange={onchangeFunc}
              />
              <input type="password" placeholder='password' 
                name='password'
                value={userData.password}
                onChange={onchangeFunc}
              />
              <p>Already have an account?<span onClick={()=>nav('/')}>Login</span></p>
              <button>{loading?'Loading...':'Sign up'}</button>
            </form>
          </div>
        </div>
  )
}

export default Signup
