const mongoose = require("mongoose")
const inviteEmail = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique:true
    },
})
const invite = mongoose.model("inviteEmail",inviteEmail)

module.exports = invite