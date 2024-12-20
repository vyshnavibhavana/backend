const mongoose = require("mongoose")
const AssignPplSchema = new mongoose.Schema({
    username:{
        type:String,
        // required:true,
    },
    userid:{
        type:String,
        // required:true,
    },
    email: {
        type: String,
        required: true,
    },
    taskStatus: {
        type:String,
        required:false,
        unique:false
    },

   
})
const AssignPplModel = mongoose.model("assignpeople",AssignPplSchema)

module.exports = AssignPplModel