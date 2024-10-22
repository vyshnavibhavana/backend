const express =require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/authRoute")
const cookieParser = require("cookie-parser")
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))
mongoose.connect("mongodb://localhost:27017/myDatabase").then(()=>{
    console.log("connected to database")
})
app.use("/auth",router)
app.listen(5000,()=>{
    console.log("server is running on port 5000")
})

