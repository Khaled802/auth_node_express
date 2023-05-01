const User = require('../models/user');
const { validationResult} = require('express-validator');
require('express-async-errors');
const CustomError = require('../errors/customError');


const showSignIn = async(req, res)=> {
    res.render('sign-up');
}

const createUser = async(req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;
    const newUser = new User({username, password});
    try {
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        throw new CustomError(error.message, 400);
    }
}

const logoutUser = async(req, res, next)=> {
    req.logout(err=> {
        if(err) return next(err);
        res.redirect('/');
    })
}


module.exports = {
    showSignIn,
    createUser,
    logoutUser
}