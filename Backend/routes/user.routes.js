const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const User = require('../models/user.model'); // Ensure User model is imported for the custom validation

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
            const existingUser = await User.findOne({ email: value });
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
        .withMessage('Password must be at least 6 characters long')
],
    userController.registerUser // Correct the function name spelling if necessary
)
router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
        // .custom(async (value) => {
        //     const user = await User.findOne({ email: value });
        //     if (!user) {
        //         throw new Error('User with this email does not exist');
        //     }
        //     return true;
        // }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
    userController.loginUser // Ensure this function is defined in your controller
)
router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

module.exports = router;
