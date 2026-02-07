const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//const { required } = require('nodemon/lib/config');
const captainsch=new mongoose.Schema({
    fullname:{
        firstname: { 
            type: String, required: true, 
            trim: true,
            minlength:[3,'First name should be atleast 3 characters']
        }, // First name
        lastname: { type: String, trim: true
            ,minlength:[3,'last name should be atleast 3 characters']
         }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true,
        minlength:[3,'First name should be atleast 3 characters'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email validation
    },
    password: {
        type: String,
        select:false,
        required: true, // Should be hashed before saving
    },
    socketid: {
        type: String, 
        default: null, // Can be null if the user is not connected
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            min:[3,'atleast 3 characters'],
        },
        plate:{
            type:String,
            required:true,
            min:[3,'atleast 3 characters'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be atleast 1'],

        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],

        },

    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
       

    }


})

captainsch.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainsch.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
captainsch.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}
const captainModel=mongoose.model('captain',captainsch);
module.exports=captainModel


