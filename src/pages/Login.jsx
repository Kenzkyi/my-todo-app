import { useNavigate } from 'react-router-dom'
import '../style/Onboarding.css'
import { useState } from 'react'
import { funcLogin } from '../Auth/Api'
import toast, {Toaster} from 'react-hot-toast';


const Login = () => {
    const nav = useNavigate()
    const [loading,setLoading] = useState(false)
    const [userData,setUserdata] = useState({
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
      <Toaster/>
      <div className="login-wrapper">
        <form onSubmit={(e)=>funcLogin(e,userData,setLoading,nav)}>
        <h4>Login</h4>
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
        <p>Don't have an account?<span onClick={()=>nav('/user/sign-up')}>Sign up</span></p>
        <button>{loading?'Loading...':'Login'}</button>
        </form>

      </div>
    </div>
  )
}

export default Login
