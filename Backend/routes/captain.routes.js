const captainController=require('../controllers/captain.controller')
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainModel = require('../models/captain.model');
const authMiddleware=require('../middlewares/auth.middleware');
//const Captain = require('../models/captain.models');




router.post('/register', [
    // Validation Rules
    body('fullname.firstname')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (value) => {
            const existingUser = await captainModel.findOne({ email: value });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            return true;
        }),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),



],
captainController.registerCaptain // Correct the function name spelling if necessary
)
router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
    captainController.loginCaptain // Ensure this function is defined in your controller
)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)



module.exports = router;