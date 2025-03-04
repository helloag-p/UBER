const captainModel = require('../models/captain.models');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehicle
}) => {

    console.log("Received data in createCaptain:", {
        firstname, lastname, email, password, vehicle
    });

    // Ensure vehicle exists before destructuring
    if (!vehicle) {
        throw new Error("Vehicle information is missing");
    }

    const { color, plate, capacity, vehicleType } = vehicle;

    // Debugging: Log extracted vehicle details
    console.log("Extracted Vehicle Data:", { color, plate, capacity, vehicleType });
    // Ensure all required fields are checked for existence
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Create a new captain document
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password, // Ensure the password is hashed before being passed here
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType // Correctly using the passed vehicleType
        }
    });

    return captain;
};
