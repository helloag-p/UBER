import React from 'react'
import { useGSAP } from '@gsap/react'

const LocationPanel = (props) => {

  
  const handleSuggestionClick = (suggestion) => {
    if (props.activeField === "pickup") {
      props.setPickup(suggestion);
    } else if (props.activeField === "destination") {
      props.setDestination(suggestion);
    }
  };
  return (
    <div>
      <button
        type="button"
        className="absolute top-0 z-50 w-full h-12 flex justify-center items-center cursor-pointer"
        onClick={() => props.setPanelOpen(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </button>

      {props.suggestions.map((el, idx) => (
        <div
          onClick={() => handleSuggestionClick(el)}
          key={idx}
          className="flex border-2 p-2 sm:p-3 border-gray-50 active:border-black rounded-lg items-center justify-start gap-3 sm:gap-4 my-2"
        >
          <h2 className="bg-[#eee] w-10 h-7 sm:w-12 sm:h-7 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill text-sm sm:text-base"></i>
          </h2>
          <h4 className="font-medium text-sm sm:text-base">{el}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationPanel
