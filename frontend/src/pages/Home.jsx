import React, { useRef, useState, useEffect, use, useContext } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingFordriver";
import WaitingForDriver from "../Components/waitfordriver";
import { UserDataContext } from "../context/UserContext";
import {SocketContext} from "../context/SocketContext";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions]=useState([]);

  const [destinationSuggestions, setDestinationSuggestions]=useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null);

  const [vehicleFound, setVehicleFound] = useState(false)
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const [ride,setRide] = useState(null);


  useEffect(() => {
  if (!socket || !user?._id) return;

  socket.emit("join", {
    userType: "user",
    userId: user._id
  });
}, [socket, user]);

  
 useEffect(() => {
  if (!socket) return;
  
  const handleRideConfirmed = (ride) => {
     setConfirmRidePanel(false);
     setVehicleFound(false);
     setRide(ride);
     setWaitingForDriver(true);
     
    
    
  };

  socket.on("ride-confirmed", handleRideConfirmed);

  return () => {
    socket.off("ride-confirmed", handleRideConfirmed);
  };
}, [socket]);
  
  useEffect(() => {
    if (!socket) return;

    const handleRideStarted = (ride) => {
        setWaitingForDriver(false);
        navigate("/riding",{
          state: {
            ride
          }
        });
    };

    socket.on("ride-started", handleRideStarted);

    return () => {
        socket.off("ride-started", handleRideStarted);
    };
}, [socket]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  
  useGSAP(() => {
    // if (!panelRef.current) return;
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "24px",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);
  
  useGSAP(()=>{
    // if (!vehiclePanelRef.current) return;
    if(vehiclePanelOpen){
       gsap.to(vehiclePanelRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(vehiclePanelRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[vehiclePanelOpen]);
  
   useGSAP(()=>{
    if (!confirmRidePanelRef.current) return;
    if(confirmRidePanel){
       gsap.to(confirmRidePanelRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(confirmRidePanelRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[confirmRidePanel]);
  
  useGSAP(()=>{
    // if (!vehicleFoundRef.current) return;
    if(vehicleFound){
       gsap.to(vehicleFoundRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(vehicleFoundRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[vehicleFound])


 useGSAP(()=>{
    if(waitingForDriver){
       gsap.to(waitingForDriverRef.current,{
         transform: "translateY(0)"
       })
    } else{
      gsap.to(waitingForDriverRef.current,{
         transform: "translateY(100%)"
       })
    }
  },[waitingForDriver]);
  
   const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };

  
  useEffect(() => {
    if (pickup.length < 3) return;

    const fetchPickupSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: pickup },
            headers: {
              
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPickupSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchPickupSuggestions();
  }, [pickup]);
  
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  
  useEffect(() => {
    if (destination.length < 3) return;

    const fetchDestinationSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDestinationSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchDestinationSuggestions();
  }, [destination]);

  
  async function findTrip(){
    
    
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params: {pickup, destination},
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    
    setFare(response.data);
  }
  
  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      vehicleType,
      pickup,
      destination
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  const isFindTripDisabled = !pickup || !destination;

  return (
    <div className="h-screen relative overflow-hidden flex justify-center items-center bg-gray-50">
       
      <div className="h-screen w-full md:max-w-md relative overflow-hidden bg-white md:shadow-2xl">
       
<div className="fixed p-3 md:p-4 top-0 flex justify-end items-center w-full md:max-w-md z-[1000] pointer-events-none">
          <Link
            to="/logout"
            className="w-9 h-9 md:w-10 md:h-10 bg-white flex justify-center items-center rounded-full shadow-md hover:shadow-lg transition-all duration-200 pointer-events-auto"
          >
            <i className="text-base md:text-lg ri-logout-box-r-line"></i>
          </Link>
        </div>

        {/* MAP SECTION - Lower Z-Index but must be interactive */}
        <div className="absolute inset-0 z-0 h-screen w-full">
           <LiveTracking />
        </div>
        
      
        
        <div className="flex flex-col justify-end h-screen absolute top-0 w-full z-10 pointer-events-auto">
          <div className="bg-white relative w-full p-4 md:p-5 pb-5 md:pb-6 shadow-lg">
           
            
            <h4 className="text-xl md:text-2xl font-medium text-gray-800 mb-3 md:mb-4">
              Find a trip
            </h4>
            
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="relative"
            >
              <div className="line absolute top-4 sm:top-5 md:top-6 w-1 h-10 sm:h-12 md:h-14 bg-gray-900 left-5 md:left-5 rounded-full"></div>
              
              <input
                type="text"
                className="bg-[#eee] px-8 md:px-10 py-2 md:py-2.5 w-full rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                placeholder="Add a pick-up location"
              />
              
              <input
                type="text"
                className="bg-[#eee] px-8 md:px-10 py-2 md:py-2.5 w-full rounded-lg mt-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter your destination"
              />
            </form>
            
            <button
              onClick={findTrip}
              disabled={isFindTripDisabled}
              className={`bg-black text-white mt-3 md:mt-4 px-3 md:px-4 py-2 md:py-2.5 rounded-lg w-full text-sm md:text-base font-medium hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 shadow-sm hover:shadow-md ${isFindTripDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Find Trip
            </button>
          </div>
          
          <div ref={panelRef} className="bg-white h-0 overflow-hidden">
            <LocationSearchPanel
              suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
              activeField={activeField}
              setPickup={setPickup}
              setDestination={setDestination}
              setPanelOpen={setPanelOpen}
              panelRef={panelRef}
            />
          </div>
        </div>
        
        <div ref={vehiclePanelRef} className="fixed z-10 translate-y-full bottom-0 w-full md:max-w-md bg-white px-3 md:px-4 py-8 md:py-10 pt-10 md:pt-12 rounded-t-2xl shadow-2xl">
          <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
        
        <div ref={confirmRidePanelRef} className="fixed z-10 translate-y-full bottom-0 w-full md:max-w-md bg-white px-3 md:px-4 py-5 md:py-6 pt-10 md:pt-12 rounded-t-2xl shadow-2xl">
          <ConfirmRide
            createRide={createRide}
            fare={fare}
            pickup={pickup}
            destination={destination} 
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>
        
        <div ref={vehicleFoundRef} className="fixed z-10 translate-y-full bottom-0 w-full md:max-w-md bg-white px-3 md:px-4 py-5 md:py-6 pt-10 md:pt-12 rounded-t-2xl shadow-2xl">
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            fare={fare} 
            pickup={pickup} 
            destination={destination} 
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>
        
        <div ref={waitingForDriverRef} className="fixed z-10 translate-y-[100%] bottom-0 w-full md:max-w-md bg-white px-3 md:px-4 py-5 md:py-6 pt-10 md:pt-12 rounded-t-2xl shadow-2xl">
          <WaitingForDriver
            ride={ride}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;