import React from 'react'
import taskCom from "../Styles/TaskCom.css"

const TaskCom = ({name}) => {
    console.log({name})
  return (
    <div className='t1' >
      <input type="checkbox" name="" id="" />
      <p>{name}</p>
    </div>
  )
}

export default TaskCom
