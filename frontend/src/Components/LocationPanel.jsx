import React from 'react'
import {useGSAP} from '@gsap/react'

const LocationPanel = (props) => {

  const locations = [
      "Bisalpur UttarPradesh",
      "Bisalpur UttarPradesh"
  ]     
  return (    
    <div className='flex  gap-4 my-2 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start'>
        <h2 className='bg-[#ee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>Bisalpur UttarPradesh</h4>
    </div>
  )
}

export default LocationPanel
