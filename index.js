const express =require("express")
const app = express()
// Load environment variables from .env file
require('dotenv').config();
const port = process.env.PORT || 8000
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require('path');
const mongoose = require("mongoose")
const router = require("./routes/authRoute")
const dashboardRoute = require("./routes/dashboardRoutes")
const cookieParser = require("cookie-parser")
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
// {
//     origin:["http://localhost:3000"],
//     credentials:true
// }
// mongoose.connect("mongodb://localhost:27017/myDatabase").then(()=>{
//     console.log("connected to database")
// })
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database")
})
app.use("/auth",router)
app.use("/api",dashboardRoute)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
    console.log("server is running on port",port)
})

