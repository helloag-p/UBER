import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const ConfirmRide = (props) => {
 
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold text-xl sm:text-2xl mb-5">Confirm your Ride</h3>
      <div className="flex gap-2 flex-col justify-between items-center ">
        <img
          className="h-16 sm:h-20"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-3 sm:gap-5 p-3 border-b-2">
            <i className="text-base sm:text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-base sm:text-lg font-medium">Pickup</h3>
              <p className="text-xs sm:text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 p-3 border-b-2">
            <i className="text-base sm:text-lg ri-square-fill"></i>
            <div>
              <h3 className="text-base sm:text-lg font-medium">Drop</h3>
              <p className="text-xs sm:text-sm text-gray-600 ">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 p-3">
            <i className="text-base sm:text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-base sm:text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button className="mb-4 w-full bg-green-600 text-white font-semibold rounded-lg p-2" onClick={()=>{
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
          props.createRide();
        }}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;