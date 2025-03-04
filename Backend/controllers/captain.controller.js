const captainModel=require('../models/captain.models');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');
const blackListTokenModel=require('../models/blacklisttoken.models');
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        return res.status(400).json({ message: 'All vehicle fields are required' });
    }
    // Ensure the 'vehicle' object contains all required fields
    const { color, plate, capacity, vehicleType } = vehicle;

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Register the captain
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword, // Use hashed password
        vehicle: { color, plate, capacity, vehicleType }
    });

    // Generate token for the captain
    const token = captain.generateAuthToken();

    // Respond with token and captain details
    res.status(201).json({ token, captain });
};
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Use the instance method `comparePassword`
        const isPasswordValid = await captain.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a new auth token
        const token = captain.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({token,captain});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports.getCaptainProfile= async(req,res,next)=>{
    res.status(200).json(req.captain);
} 
module.exports.logoutCaptain= async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    const existingToken = await blackListTokenModel.findOne({ token });
    if(!existingToken){
        await blackListTokenModel.create({ token });
    }
    res.status(200).json({ message :'Logged out'});
} 
