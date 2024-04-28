const express = require("express");
const { body } = require('express-validator');
const router = express.Router();
const user = require("../controllers/User.js");

// Validation rules for registration
const registrationValidationRules = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Register route with validation middleware
router.post("/register", registrationValidationRules, user.Register);

// Login route
router.post('/login', user.Login);

// Logout route
router.get('/logout', user.Logout);

module.exports = router;

