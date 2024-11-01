const mongoose = require("mongoose")
const AssignPplSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email: {
        type: String,
        required: true,
        unique:false
    },
    taskStatus: {
        type:String,
        required:true,
        unique:false
    }
   
})
const AssignPplModel = mongoose.model("assignpeople",AssignPplSchema)

module.exports = AssignPplModel