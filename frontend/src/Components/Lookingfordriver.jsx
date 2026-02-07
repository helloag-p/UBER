import React from 'react'

const Lookingfordriver = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className='p-3 w-[93%] text-center absolute top-0  '>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>
            <div className='flex  gap-2 flex-col justify-between items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" />
                <div className='w-full mt-5 '>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11/A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11/A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lookingfordriver
