import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from './FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ConfirmRiding = () => {
    const [finishRidePanel , setfinishRidePanel]=useState(false);
    const finishRidePanelRef=useRef(null)
    useGSAP(function () {
        if (finishRidePanel){
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0%)'
          }
          )
        }
        else {
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
          })
        }
    
      }, [finishRidePanel])
  return (
    <div className='h-screen relative '>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='' />
      <Link to='/captainhome' className=' fixed right-2 top-2 1 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className='text-lg font-medium ri-logout-box-r-line'></i>
      </Link>
      <div className='h-4/5 '>

      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400' 
       onClick={()=>{
        setfinishRidePanel(true)
      }}>
      <h5 onClick  ={() => {
                   
                }} className='p-3 w-[95%] text-center absolute top-0  '>
                  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
    <h4 className='text-xl font-semibold'>4KM away</h4>   
    <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>    
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <FinishRide setfinishRidePanel={setfinishRidePanel} />
      </div>
    
    </div>
  )
}

export default ConfirmRiding
