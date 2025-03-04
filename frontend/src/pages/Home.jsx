import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationPanel from '../Components/LocationPanel'
import { Link } from 'react-router-dom'



const Home = () => {
  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef=useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
        // opacity:1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
        // opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])
  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0%)'
      }
  
      )
    }
    else {
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      } )
    }
    
  },[vehiclePanel])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temporary use  */}
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)

          }} className='absolute opacity-0 right-6 top-6 text-2xl '>
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form
            className='relative py-3'
            onSubmit={(e) => {
              submitHandler(e)
            }}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 -translate-y-full bg-white px-3 py-8'>
      


      </div>

    </div>
  )
}

export default Home
