
const UserModel = require("../models/user")
const InviteModel = require("../models/inviteEmail")
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

const sendInvite =  async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      // Check if the user is registered
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Save invite data in Invite model
      const newInvite = new InviteModel({ email });
      await newInvite.save();
  
      return res.status(200).json({ message: 'User is registered and invite has been sent' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

const logout = async (req, res) => {
    try {
        // Clear the JWT token from the cookie or local storage
        res.clearCookie("token"); // Assumes JWT token is stored in a cookie named 'token'

        return res.status(200).json({ status: true, message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Logout failed", error: error.message });
    }
};





module.exports = {
    register,
    login,
    verifyUser,
    updateUser,
    sendInvite,
    logout
}