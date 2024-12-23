import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import { UserDataContext } from './context/UserContext'
const App = () => {
  const ans=useContext(UserDataContext)
  return (
    <div >
        <Routes>
            <Route path='/' element={<Home /> }></Route>
            <Route path='/login' element={<UserLogin /> }></Route>
            <Route path='/signup' element={<Usersignup /> }></Route>
            <Route path='/captainlogin' element={<Captainlogin /> }></Route>
            <Route path='/captainsignup' element={<Captainsignup/> }></Route>
        </Routes>
    </div>
  )
}

export default App
