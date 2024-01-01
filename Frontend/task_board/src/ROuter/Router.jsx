import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import RegistrationPage from '../components/Register'
import List from '../components/List'
import Task from "../components/Task"


export const MainRoutes = () => {
  return (
    <Routes>
        <Route  path='/' element={<Login/>} />
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/task' element={<Task/>} />
        
    </Routes>
  )
}