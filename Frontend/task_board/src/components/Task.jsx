import React, { useState } from 'react'
import style from "../Styles/task.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Task = () => {
   const [name,setName]=useState('');
   const [data,setData]=useState([]);
   const navigate=useNavigate();

   const handleAdd=(task)=>{
    if(name.name!=""){
        setData([...data,task]) 
        setName("")
        console.log({handle:data})
    }
    else{
        alert("Please provide the task name")
    }
    

   }
   const handleFinish=()=>{
    if(data.length==0){
        alert("Add atleast one task")
    }
    setData([...data,name])
      axios.post("http://localhost:8081/create",data)
      .then((res)=>{
        console.log("created successfully")
        navigate('/list')
      })
      .catch((err)=>{
        console.log(err);;
      })
      navigate('/list')
   }

  return (
    <div className='taskCom'>
      <p className="head">Create SubTask</p>
      <input className='name' type="text" placeholder='Enter Task Name' value={name}
      
      onChange={(e)=>{
        setName(e.target.value)
      }}
      />
      <div className="butt">
      <button className='bt1' onClick={()=>{
        handleAdd({name,isComplete:false})
      }}>Add more</button>
      <button className='bt2'
      
      onClick={()=>{
        handleFinish()

      }}
      
      >Finish</button>
      </div>
    </div>
  )
}

export default Task
