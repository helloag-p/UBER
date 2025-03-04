import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Home from './pages/Home'
import Captainsignup from './pages/Captainsignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import { UserDataContext } from './context/UserContext'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  const ans=useContext(UserDataContext)
  return (
    <div >
        <Routes>
            <Route path='/' element={<Start /> }></Route>
            <Route path='/login' element={<UserLogin /> }></Route>
            <Route path='/signup' element={<Usersignup /> }></Route>
            <Route path='/captainlogin' element={<Captainlogin /> }></Route>
            <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
            <Route path='/captainsignup' element={<Captainsignup/> }></Route>
            <Route path='/user/logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
            <Route path='/captainhome' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper> }/>
            <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper> }></Route>


        </Routes>
    </div>
  )
}

export default App
