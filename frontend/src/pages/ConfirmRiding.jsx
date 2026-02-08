import React, { useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from './FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../Components/LiveTracking';

const ConfirmRiding = () => {
    const [finishRidePanel , setfinishRidePanel]=useState(false);
    const finishRidePanelRef=useRef(null)
    const location = useLocation();
    const rideData = location.state?.ride;
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
    <div className='h-screen overflow-hidden bg-white'>
      <img className='w-16 absolute left-5 top-5 z-[1000]' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='' />
      <Link 
                to='/captainhome' 
                className='fixed right-2 top-2 z-[1000] h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg'
            >
                <i className='text-lg font-medium ri-logout-box-r-line'></i>
            </Link>
            <div className="h-4/5 w-full relative z-0">
                <LiveTracking />
            </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 relative' 
       onClick={()=>{
        setfinishRidePanel(true)
      }}>
      <h5 onClick  ={() => {
                   
                }} className='p-3 w-[95%] text-center absolute top-0  '>
                  <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>
    <h4 className='text-xl font-semibold'>{rideData?.distance} KM away</h4>   
    <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>    
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <FinishRide  ride={rideData} setfinishRidePanel={setfinishRidePanel} />
      </div>
    
    </div>
  )
}

export default ConfirmRiding
