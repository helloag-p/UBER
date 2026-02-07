const userModel=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
const blackListTokenModel=require('../models/blacklistToken.model');
module .exports.registerUser=async(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //console.log(req.body);
    const {fullname,email,password}=req.body;
    const hashedPassword=await userModel.hashPassword(password);
    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });
    const token=user.generateAuthToken();
    res.status(201).json({token,user});

}
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Use the instance method `comparePassword`
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a new auth token
        const token = user.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstname: user.fullname.firstname,
                lastname: user.fullname.lastname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports.getUserProfile= async(req,res,next)=>{
    res.status(200).json(req.user);
} 
module.exports.logoutUser= async(req,res,next)=>{
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

