import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmRiding from '../pages/ConfirmRiding'

const ConfirmRidePopUp = (props) => {
 const [otp,setOtp]=useState('')
 const submitHandler=(e)=>{
  e.preventDefault()
 }
  return (
    <div>
       <h5 onClick  ={() => {
                    props.setRidePopupPanel(false)
                   }} className='p-3 w-[93%] text-center absolute top-0  '>
                     <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                   </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'> 
                    <img className='h-12 w-12 rounded-full object-cover' src=''/>
               <h2 className='text-lg font-medium'> Rakesh</h2>
                </div>
                <h5 className='text-lg font-semibold '>2.2km</h5>
            </div>
            <div className='flex  gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-5 '>
                   <div className='flex items-center gap-5 p-3 border-b-2'>
                   <i className='text-lg ri-map-pin-user-fill'></i>
                   <div>
                    <h3 className='text-lg font-medium'>562/11/A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Panneer gali</p>
                   </div>
                   </div>
                   <div className='flex items-center gap-5 p-3 border-b-2'>
                   <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                    <h3 className='text-lg font-medium'>562/11/A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Panneer gali</p>
                   </div>
                   </div>
                   <div className='flex items-center gap-5 p-3'>
                   <i className='text-lg ri-currency-line'></i>
                   <div>
                    <h3 className='text-lg font-medium'>$190</h3>
                    <p className='text-sm -mt-1 text-gray-600'>cash</p>
                   </div>
                   </div>
                </div>
                
               <div className=' mt-6 w-full'>
              <form onSubmit={(e)=>{
                submitHandler(e)
              }}>
              <input value={otp}  onChange={(e)=>
                setOtp(e.target.value)
              } type="text" placeholder='Enter Otp' className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full'/>
              <Link to='/captainriding' onClick={()=>{
                }} className='w-full  mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Confirm
                </Link>
                <button onClick={()=>{  
                    props.setconfirmRidePopupPanel(false)
                    props.setRidePopupPanel(false)
                }} className='w-full mt-2 text-lg bg-red-700 text-white font-semibold p-2 rounded-lg'>
                    Cancel
                </button>
              </form>
               </div>
            </div>
    </div>
  )
}

export default ConfirmRidePopUp
