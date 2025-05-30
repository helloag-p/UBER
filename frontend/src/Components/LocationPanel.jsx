import React from 'react'
import { useGSAP } from '@gsap/react'

const LocationPanel = (props) => {

  const locations = [
    "Bisalpur UttarPradesh",
    "Bisalpur UttarPradesh"
  ]
  return (
    <div>{
      locations.map(function(elem,idx){
        return(
          <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex  gap-4 my-2 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start'>
            <h2 className='bg-[#ee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        )
      })
    }
    </div>

  )
}

export default LocationPanel
