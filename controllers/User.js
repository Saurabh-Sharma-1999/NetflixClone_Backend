const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const tokenData = {
            id: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET, {expiresIn: "1d"});
        return res.status(200).cookie("token", token, {httpOnly:true}).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.Logout = async(req, res) => {
    return res.status(200).cookie("token", "", {expiresIn: new Date(Date.now()), httpOnly: true}).json({
        message: "User logged out successfully",
        success: true
    })
}

const { validationResult } = require('express-validator');

module.exports.Register = async (req, res) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: 'Validation failed',
                success: false
            });
        }

        const { fullName, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'This email is already in use',
                success: false
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 16);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'Account created successfully',
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};



