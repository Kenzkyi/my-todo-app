import { MdDelete } from 'react-icons/md'
import '../style/Dashboard.css'
import { FaEdit } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { IoIosAddCircle } from 'react-icons/io';
import toast, {Toaster} from 'react-hot-toast';
import { getOneById, verifyEmail } from '../Auth/Api';
import { useNavigate } from 'react-router-dom';
import { addTodo, deleteTodo, editTodo, getAllTodo, partialDelete } from '../Auth/TodoApi';

const Dashboard = () => {
    const [openMymodal,setOpenMymodal] = useState(false)
    const [myUser,setMyUser] = useState('')
    const nav = useNavigate()
    const [todoInfo,setTodoInfo] = useState({
        title:'',
        content:''
    })
    const [allTodo,setAllTodo] = useState([])

const [editData,setEditData] = useState({
    title: '',
    content: '',
    show:false
})
const [count,setCount] = useState(0)

    const handleClick = ()=>{
        if(!myUser.isVerified){
            toast.error('Please verify your email first')
        }else{
            setOpenMymodal(true)
            setCount(0)
        }
    }

    useEffect(()=>{
        if(count === 1){
            addTodo(todoInfo,setTodoInfo,setOpenMymodal)
        }
    },[count])

    // console.log(count)

    useEffect(()=>{
        getOneById(setMyUser)
    },[myUser])

    useEffect(()=>{
        getAllTodo(setAllTodo)
    },[allTodo])

    const logOut = ()=>{
        {
            localStorage.removeItem('userinfo')
            setTimeout(() => {
                nav('/')
            }, 1000);
        }
    }

    const onchangeFunc = (e)=>{
        const {value,name} = e.target
        setTodoInfo({...todoInfo,[name]:value})
   }

const onchangeEditFunc = (e)=>{
    const {value,name} = e.target
    setEditData({...editData,[name]:value})
}

// console.log(allTodo)
  return (
    <>
        {
        !myUser ? <p style={{margin:20,fontSize:22}}>Loading... Please wait</p> :         
    <div className='dashboard'>
            {myUser?.isVerified? null : <article>Please click here to verify your email: <span onClick={verifyEmail}>Verify now</span></article>}
            <section>
                <p>Hello {myUser.username}</p>
                <Toaster/>
                <div>
                <MdDelete style={{cursor:'pointer'}} onClick={()=>nav('/Recycle-bin')}/>
                <span onClick={logOut}>Log out</span>
                </div>
            </section>
            <div className="dashboard-wrapper">
                {
                    allTodo?.length <= 0 ? <span>No user data</span> :  <div className="todo-card-holder">
                    {allTodo?.map((item,index)=>
                    <div className="todo-card" key={index} onClick={()=>{localStorage.setItem('mytodo',JSON.stringify(item));nav(`/todo-list/${item.title}`)}}>
                    <header>{item?.title.length > 30 ? item?.title?.substr(0,30) + ' ...' : item?.title}</header>
                    <nav>{item?.content.length > 350 ? item?.content?.substr(0,350) + ' ...' : item?.content}</nav>
                    <footer>
                    <MdDelete className='delete-icon' onClick={(e)=>{partialDelete({title:item?.title,content:item?.content},item?._id); e.stopPropagation() }} />
                    <FaEdit className='edit-icon' onClick={(e)=>{setEditData({...editData,title:item?.title,content:item?.content,show:true,id:item?._id});e.stopPropagation()}}/>
                    </footer>
                </div>
                    )}
                    </div>
                }
                
               
                <button className='myBtn' onClick={handleClick}><IoIosAddCircle /></button>
            </div> 
    </div>
        }

    <Modal
        title="Add Todo"
        centered
        open={openMymodal}
        onOk={() => {
            setCount((prev)=>prev + 1)
        }}
        onCancel={() => {setOpenMymodal(false);setTodoInfo({...todoInfo,title:'',content:''})}}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <div className="modal-holder">
            <input type="text" placeholder='todo-title'
            name='title'
            value={todoInfo.title}
            onChange={onchangeFunc}
            />
            <textarea placeholder='Details'
            name='content'
            value={todoInfo.content}
            onChange={onchangeFunc}
            ></textarea>
        </div>
      </Modal>

      <Modal
        title="Edit Todo"
        open={editData?.show}
        onOk={() => editTodo(editData,setEditData)}
        onCancel={() => setEditData({...editData,show:false})}
        okText="Update"
        cancelText="Cancel"
        width={{
            xs: '90%',
            sm: '80%',
            md: '70%',
            lg: '60%',
            xl: '50%',
            xxl: '40%',
          }}
      >
        <div className="modal-holder">
            <input type="text" placeholder='todo-title'
            name='title'
            value={editData?.title}
            onChange={onchangeEditFunc}
            />
            <textarea placeholder='Details'
            name='content'
            value={editData?.content}
            onChange={onchangeEditFunc}
            ></textarea>
        </div>
      </Modal>
      </>
  )
}

export default Dashboard
