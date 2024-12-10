const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { 
            type: String, required: true, 
            trim: true,
            minlength:[3,'First name should be atleast 3 characters']
        }, // First name
        lastname: { type: String, trim: true
            ,minlength:[3,'last name should be atleast 3 characters']
         },  // Last name
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
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

userSchema.methods.generateAuthToken =  function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user', userSchema);
module.exports =userModel;
