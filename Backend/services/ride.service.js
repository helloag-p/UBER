const { eventNames } = require("cluster");
const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const { distanceKm, durationMinutes } =
    await mapService.getDistanceTime(pickup, destination);

  const distance = Number(distanceKm);      // km
  const duration = Number(durationMinutes); // minutes

  if (isNaN(distance) || isNaN(duration)) {
    throw new Error("Invalid distance or duration");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  return {
    auto: Math.round(
      baseFare.auto +
        distance * perKmRate.auto +
        duration * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distance * perKmRate.car +
        duration * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        distance * perKmRate.motorcycle +
        duration * perMinuteRate.motorcycle
    ),
  };
};

function getOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
}
async function getRideDuration(pickup, destination) {
    const pickupCoords = await mapService.getAddressCoordinate(pickup);
    const destCoords = await mapService.getAddressCoordinate(destination);

    if (!pickupCoords || !destCoords) {
        throw new Error("Coordinates missing for pickup or destination");
    }

    // Haversine formula (no external API dependency)
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // km

    const dLat = toRad(destCoords.lat - pickupCoords.lat);
    const dLon = toRad(destCoords.lng - pickupCoords.lng);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(pickupCoords.lat)) *
            Math.cos(toRad(destCoords.lat)) *
            Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    // Assume avg speed = 40 km/h
    const durationMinutes = Math.ceil((distanceKm / 40) * 60);

    return {
        distanceKm: Number(distanceKm.toFixed(2)),
        durationMinutes
    };
}

  
const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All Fields are required");
  }
  const fare = await getFare(pickup, destination);
  const { distanceKm, durationMinutes }=await mapService.getDistanceTime(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    duration: durationMinutes,
  distance: distanceKm,
    fare: fare[vehicleType],
    otp: getOtp(6)
  });
  return ride;
};
const confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("Ride id is required");
    }

    // 1. Update the ride status and assign the captain
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: "accepted",
            captain: captain._id,
        }
    );

    // 2. Fetch the ride again with full population to ensure 
    // all captain and user details are loaded for the socket/frontend
    const ride = await rideModel
        .findOne({ _id: rideId })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
};
const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error("RideId and Otp are required");
    }

    const ride = await rideModel.findOne({ _id: rideId })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }
    if (ride.status !== "accepted" && ride.status !== "ongoing") {
        throw new Error("Ride not in a valid state to start");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    await rideModel.findOneAndUpdate({_id: rideId},{
    status: "ongoing"
  })
  return ride;
};
const endRide = async({rideId, captain})=>{
  if(!rideId){
    throw new Error("RideId is required")
  }
  const ride = await rideModel.findOne({
    _id: rideId,
    captain: captain._id
    
  }).populate("user").populate("captain").select("+otp");
  if(!ride){
    throw new Error("Ride not found")
  }
  if(ride.status!="ongoing"){
    await rideModel.findOneAndUpdate({_id: rideId},{
      status: "completed"
    })
  }
  return ride;
}
module.exports = { getRideDuration ,
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
};