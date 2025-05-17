import React, { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopupPanel , setRidePopupPanel]=useState(true);
  const [confirmridePopupPanel , setconfirmRidePopupPanel]=useState(false);
  const ridePopupPanelRef=useRef(null)
  const confirmridePopupPanelRef=useRef(null)
  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0%)'
      }
      )
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ridePopupPanel])
  useGSAP(function () {
    if (confirmridePopupPanel){
      gsap.to(confirmridePopupPanelRef.current, {
        transform: 'translateY(0%)'
      }
      )
    }
    else {
      gsap.to(confirmridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmridePopupPanel])
  return (
    <div className='h-screen'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='' />
      <Link to='/home' className=' fixed right-2 top-2 1 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className='text-lg font-medium ri-logout-box-r-line'></i>
      </Link>
      <div className='h-3/5 '>

      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails  />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <RidePopUp setRidePopupPanel={setRidePopupPanel} setconfirmRidePopupPanel={setconfirmRidePopupPanel}/>
      </div>
      <div ref={confirmridePopupPanelRef  } className='fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <ConfirmRidePopUp setconfirmRidePopupPanel={setconfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome
