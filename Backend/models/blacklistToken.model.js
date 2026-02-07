const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const blacklistTokenSchema = Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60
    }
});
module.exports = mongoose.model("BlackListToken",blacklistTokenSchema)
