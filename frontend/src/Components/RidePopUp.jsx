import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
       <h5 onClick  ={() => {
                    props.setRidePopupPanel(false)
                   }} className='p-3 w-[93%] text-center absolute top-0  '>
                     <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                   </h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
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
                <button onClick={()=>{
                    props.setconfirmRidePopupPanel(true)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Accept
                </button>
                <button onClick={()=>{  
                    props.setRidePopupPanel(false)

                }} className='w-full mt-1 bg-gray-400 text-gary-700 font-semibold p-2 rounded-lg'>
                    Ignore
                </button>
            </div>
    </div>
  )
}

export default RidePopUp
