import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId:props.ride._id,
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if(response.status===200){
      navigate("/captainhome");
    }
  }

  return (
    <div>
       <h5 onClick  ={() => {
                    props.setfinishRidePanel(false)
                   }} className='p-3 w-[93%] text-center absolute top-0  '>
                     <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                   </h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
            <div className='flex items-center justify-between p-4 border-2  border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'> 
                    <img className='h-12 w-12 rounded-full object-cover' src=''/>
               <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold '>{props.ride?.distance}km</h5>
            </div>
            <div className='flex  gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-5 '>
                   <div className='flex items-center gap-5 p-3 border-b-2'>
                   <i className='ri-map-pin-user-fill'></i>
                   <div>
                    <h3 className='text-lg font-medium'>562/11/A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                   </div>
                   </div>
                   <div className='flex items-center gap-5 p-3 border-b-2'>
                   <i className='text-lg ri-map-pin-2-fill'></i>
                   <div>
                    <h3 className='text-lg font-medium'>562/11/A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                   </div>
                   </div>
                   <div className='flex items-center gap-5 p-3'>
                   <i className='text-lg ri-currency-line'></i>
                   <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>cash</p>
                   </div>
                   </div>
                </div>
                
               <div className=' mt-6 w-full'>
              
              <button onClick={(endRide)} className='w-full  mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Finish Ride
                </button>
                <p className='mt-10 text-xs'>Click on Finish Ride Button if you have completed the Payment</p>
               </div>
            </div>
    </div>
  )
}

export default FinishRide
