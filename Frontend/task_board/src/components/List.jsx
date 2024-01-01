import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import list from "../Styles/list.css"

import { useNavigate } from 'react-router-dom';
import TaskCom from './TaskCom';
import axios from 'axios';

const List = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([{name:"aman",isCompleted:false}])
    useEffect(()=>{
        // axios.get("http://localhost:8081/task").then((res)=>{
        //     setData(res.data)
        // }).catch((err)=>{
        //     console.log(err)
        // })
    })
  return (
    
    <div>
      <div className="navbar">
      <p>Welcome User</p>
      <p>Logout</p>
      </div>
      <div className="tasks">
        <div className='lists'>
            {
                data.length>0?data.map((el)=>{
                    console.log({el})
                    return <TaskCom key={el.name} {...el} />
                }):<p></p>

            }
            
        </div>
        <div className="creatTask">
            <h5>Creat New List</h5>
            <div className='iconDiv'
            
            onClick={()=>navigate('/task')}
            
            >
            <GoPlus className='icon'/>
            </div>
        </div>

      </div>
    </div>
  )
}

export default List
