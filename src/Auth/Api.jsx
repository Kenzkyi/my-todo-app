import axios from "axios"
import toast from "react-hot-toast"


const baseUrl = 'https://cohort5-frontend-todo-app.onrender.com/api'

export const funcSignup = async(e,data,setFunc,nav)=>{
    e.preventDefault()
    setFunc(true)
    try {
        const res = await axios.post(`${baseUrl}/user/sign-up`,data)
        console.log(res)
        toast.success(res?.data?.message)
        setTimeout(() => {
            nav('/')
        }, 1500);
        setFunc(false)
        
        
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
        setFunc(false)
    }
}


export const funcLogin = async(e,data,setFunc,nav)=>{
    e.preventDefault()
    setFunc(true)
    try {
        const res = await axios.post(`${baseUrl}/user/log-in`,data)
        // console.log(res)
        toast.success(res?.data?.message)
        const userInfo ={
            userId:res?.data?.data?._id,
            token:res?.data?.token
        }
        // console.log(userInfo)
        localStorage.setItem('userinfo',JSON.stringify(userInfo))
        setTimeout(() => {
            nav(`/Dashboard/${res?.data?.data?.username}`)
        }, 2200);
        setFunc(false)
        
        
    } catch (error) {
        console.log(error)
        if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message)
        }else if(error?.message){
            toast.error(error?.message)
        }
        else{
            toast.error(error?.response?.data?.Failed)
        }
        setFunc(false)
    }
}

export const getOneById = async (setUser) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
    const res = await axios.get(`${baseUrl}/user/one/${userInfo?.userId}`)
    setUser(res?.data?.data)
    } catch (error) {
        console.log(error)
    }
}

export const verifyEmail = async()=>{
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.get(`${baseUrl}/user/verify-email/${userInfo.token}`)
        toast.success(res?.data?.message)
    } catch (error) {
        console.log(error)
    }
}

