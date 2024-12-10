const mongoose = require('mongoose');

// Define the schema for blacklisted JWT tokens
const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,  // Prevent duplicate tokens from being blacklisted
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires:86400 //24 hours in min
    }
});

// Set the TTL for 24 hours (24 hours * 60 minutes * 60 seconds = 86400 seconds)

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistSchema);

module.exports = BlacklistedToken;
