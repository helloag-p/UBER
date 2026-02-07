import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
          props.setVehiclePanelOpen(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className="font-semibold text-xl sm:text-2xl mb-5">Choose a vehicle</h3>
        <div className="border-0 active:border-2 border-black rounded-lg flex items-center justify-between p-2 sm:p-3 w-full mb-2 " onClick={()=>{
            props.setConfirmRidePanel(true);
            props.setVehicleType("car")
            
          }}>
          <img
            className="h-10 sm:h-12"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt=""
          />
          <div className="-ml-2 w-1/2" >
            <h4 className="font-semibold text-sm sm:text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-fill"></i>4
              </span>
            </h4>

            <h5 className="font-medium text-xs sm:text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-base sm:text-lg font-semibold">₹{props.fare.car}</h2>
        </div>
        <div className="border-0 active:border-2 border-black rounded-lg flex items-center justify-between p-2 sm:p-3 w-full mb-2 " onClick={()=>{
            props.setConfirmRidePanel(true);
            props.setVehicleType("motorcycle")
          }}>
          <img
            className="h-10 sm:h-12"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
            alt=""
          />
          <div className="-ml-2 w-1/2" >
            <h4 className="font-semibold text-sm sm:text-base">
              Motorcycle{" "}
              <span>
                <i className="ri-user-fill"></i>1
              </span>
            </h4>

            <h5 className="font-medium text-xs sm:text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
          </div>
          <h2 className="text-base sm:text-lg font-semibold">₹{props.fare.motorcycle}</h2>
        </div>
        <div className="border-0 active:border-2 border-black rounded-lg flex items-center justify-between p-2 sm:p-3 w-full mb-2 " onClick={()=>{
            props.setConfirmRidePanel(true);
            props.setVehicleType("auto")
          }}>
          <img
            className="h-10 sm:h-12"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
            alt=""
          />
          <div className="-ml-2 w-1/2">
            <h4 className="font-semibold text-sm sm:text-base">
              Auto{" "}
              <span>
                <i className="ri-user-fill"></i>3
              </span>
            </h4>

            <h5 className="font-medium text-xs sm:text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
          </div>
          <h2 className="text-base sm:text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel