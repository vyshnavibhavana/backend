const mongoose = require("mongoose")
const AssignPplSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
   
})
const AssignPplModel = mongoose.model("assignpeople",AssignPplSchema)

module.exports = AssignPplModel