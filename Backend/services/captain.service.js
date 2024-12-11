const captainModel = require('../models/captain.models');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
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
