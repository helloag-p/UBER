import React, { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../Components/LiveTracking'
import axios from 'axios'
const CaptainHome = () => {
  const [ridePopupPanel , setRidePopupPanel]=useState(false);
  const [ride,setRide]=useState(null);

  const [confirmridePopupPanel , setconfirmRidePopupPanel]=useState(false);
  const ridePopupPanelRef=useRef(null)
  const confirmridePopupPanelRef=useRef(null)
  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);
  useEffect(()=>{
     if (!captain || !captain._id || !socket) return;
    socket.emit("join", {
      userId: captain._id,
      userType: "captain"
    });
    const updateLocation = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
          
          
          socket.emit("update-location-captain",{
            userId:captain._id,
            location:{
               lat: position.coords.latitude,
               lng: position.coords.longitude
            },
          });
        });
      }
    };
    updateLocation();

    const locationInterval = setInterval(updateLocation,10000);
    return () => clearInterval(locationInterval);
  },[captain,socket]);
  
  useEffect(()=>{
    if(!socket) return;
    const handleNewRide = (data)=>{ 
      setRide(data);
      setRidePopupPanel(true);
    }
    socket.on("new-ride",handleNewRide);
    return ()=>{
      socket.off("new-ride",handleNewRide);
    }
  },[socket]);
  async function confirmRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId: ride._id,
      captainId: captain._id,
      
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setRide(response.data);
    setRidePopupPanel(false);
    setconfirmRidePopupPanel(true);
  }

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
    <div className='h-screen overflow-hidden flex flex-col '>
      <div className='fixed top-0 left-0 w-full p-5 flex justify-between items-start z-[1000] pointer-events-none'>
                <img 
                    className='pl-4 py-2 w-16 pointer-events-auto' 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
                    alt='Uber Logo' 
                />
                <Link 
                    to='/home' 
                    className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-xl pointer-events-auto'
                >
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>

        {/* MAP SECTION - 60% */}
        <div className='h-3/5 w-full relative z-0'>
            <LiveTracking />
        </div>

        {/* DETAILS SECTION - 40% */}
        <div className='h-2/5 p-6 bg-white z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]'>
            <CaptainDetails />
        </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <RidePopUp 
     ride={ride}
     setRidePopupPanel={setRidePopupPanel} setconfirmRidePopupPanel={setconfirmRidePopupPanel}
      confirmRide={confirmRide}
     />
      </div>
      <div ref={confirmridePopupPanelRef  } className='fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-6 pt-14'>
    <ConfirmRidePopUp ride={ride}
     setconfirmRidePopupPanel={setconfirmRidePopupPanel} 
     setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome
