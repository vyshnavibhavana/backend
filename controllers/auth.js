
const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const secret_key = process.env.JWT_SECRET


const register = async(req,res)=>{
    const {username,email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        return res.status(400).json({message:"Email already exists"})
    }
    const hashedPass = await bcrypt.hash(password,10)
    const newUser = new UserModel({
        username,
        email,
        password:hashedPass
    })
    await newUser.save()
    return res.json({status:true,message:"User Created"})
};


const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    console.log(user,"user")
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"password is Incorrect"})
    }
    const token = jwt.sign({email:user.email},secret_key,{expiresIn:"4h"});
    res.cookie("token",token)
    return res.json({status:true,message:"Login Successfull",user,token})
};

const verifyUser =async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false,message:"Auth Failed"})
        }
        const decoded = await jwt.verify(token,secret_key)
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the fields if they are provided in the request body
        if (username) {
            user.username = username;
        }

        if (password) {
            // Hash the new password before updating
            const hashedPass = await bcrypt.hash(password, 10);
            user.password = hashedPass;
        }

        // Save the updated user
        await user.save();

        return res.json({ status: true, message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    register,
    login,
    verifyUser,
    updateUser
}