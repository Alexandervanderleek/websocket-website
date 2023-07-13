const bcrpyt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User =require('../models/User');

// @route   GET api/auth
// @desc    Get user by token
// @access  Private
exports.getCurrentUser = async (req, res) => {
    try{
        console.log(req)
        console.log(req.user.id)
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        return res.status(500).send("Internal server error")
    }
}