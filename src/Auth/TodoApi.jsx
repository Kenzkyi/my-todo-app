import axios from "axios"
import toast from "react-hot-toast"


const baseUrl = 'https://cohort5-frontend-todo-app.onrender.com/api'

export const addTodo = async (data,setData,modal) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.post(`${baseUrl}/create-content`,data,{
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        toast.success('Todo added')
        setTimeout(() => {
            modal(false)
        }, 1500);
        setTimeout(() => {
            setData((prev)=>{
                return {...prev,title:'',content:''}
            })
        }, 2000);

    } catch (error) {
        console.log(error)
        if(error?.response?.data?.message === 'Action requires sign-in. Please log in to continue.'){
            toast.error('Please relogin to continue')
        }else{
            toast.error('All field are required')
        }
    }
}

export const getAllTodo = async (allTodo) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.get(`${baseUrl}/all-content`,{
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        allTodo(res?.data?.data)
    } catch (error) {
        if(error?.response?.data?.message === 'Action requires sign-in. Please log in to continue.'){
            toast.error('Please relogin to continue')
        }

    }
}

export const editTodo = async (data,setState) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    const {id,title,content} = data
    try {
        const res = await axios.patch(`${baseUrl}/update-content/${id}`,{title:title.trim(),content:content.trim()},{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        // console.log(res)
        toast.success(res?.data?.message)
        setTimeout(() => {
            setState((prev)=>{
                return {...prev,show:false}
            })
        }, 1500);
    } catch (error) {
        if(error?.response?.data?.message === 'Action requires sign-in. Please log in to continue.'){
            toast.error('Please relogin to continue')
        }
        console.log(error)
    }

}

export const deleteTodo = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.delete(`${baseUrl}/delete-content/${id}`,{
            headers: {
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        // localStorage.removeItem('arrid')
        toast.success(res?.data?.message)
        // console.log(res?.data?.message)
    } catch (error) {
        if(error?.response?.data?.message === 'Action requires sign-in. Please log in to continue.'){
            toast.error('Please relogin to continue')
        }
        console.log(error)
    }
}

export const partialDelete = async(data,id)=>{
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.patch(`${baseUrl}/trash-content/${id}`,data,{
            headers:{
                Authorization: `Bearer ${userInfo?.token}`
            }
        })
        // console.log(res)
        toast.success(res?.data?.message)
    } catch (error) {
        console.log(error)
    }
}

export const getTrash = async (setState) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.get(`${baseUrl}/all-trash-content`,{
            headers:{
                Authorization: `Bearer ${userInfo?.token}`
            }
        })
        setState(res?.data?.data)
        // console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const restoreContent =async (data) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'))
    try {
        const res = await axios.patch(`${baseUrl}/restore-content/${data?._id}`,{
            title: data?.title,
            content: data?.content
        },{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        toast.success(res?.data?.message)
    } catch (error) {
        console.log(error)
    }
}