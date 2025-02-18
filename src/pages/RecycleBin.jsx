import { ImBin2 } from 'react-icons/im'
import '../style/RecycleBin.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOneById } from '../Auth/Api'
import { deleteTodo, getTrash, restoreContent } from '../Auth/TodoApi'
import { Toaster } from 'react-hot-toast'

const RecycleBin = () => {
    const [binData,setBinData] = useState([])
    const [myUser,setMyUser] = useState('')
    const nav = useNavigate()
        useEffect(()=>{
            getTrash(setBinData)
            getOneById(setMyUser)
        },[binData])
  return (
    <div className='recycle'>
        <button className='btn' onClick={()=>nav(`/Dashboard/${myUser?.username}`)}>back</button>
      {
        myUser ? <div className="recycle-wrapper">
        <Toaster/>
        <header>
            <p><ImBin2 /> Recycle Bin</p>
        </header>
        {
            binData.length <= 0 ? <p style={{margin:20,fontSize:30}}>No trash available</p> : <nav>
            {
                binData?.map((item,index)=>
                <div className="bin-holder" key={index}>
                <main>
                    <aside>
                        <article>{item?.title.length > 50 ? item?.title.substring(0,50) + ' ...' : item?.content}</article>
                        <section>{item?.content.length > 170 ? item?.content.substring(0,170) + ' ...' : item?.content}</section>
                    </aside>
                    <span onClick={()=>restoreContent(item)}>Restore</span>
                </main>
                <button onClick={()=>deleteTodo(item?._id)}>X</button>
            </div>)
            }
        </nav>
        }
      </div> : <p style={{margin:20,fontSize:22}}>Please wait...</p>
      }
    </div>
  )
}

export default RecycleBin
