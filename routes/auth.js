const Router = require('express');
const {body, validationResult} = require('express-validator');
const router = new Router();
const path = require('path');
const { showSignIn, createUser, logoutUser } = require('../controllers/auth');
const passport = require('passport');

router.set('views', path.join(__dirname, '../public'));

router.route('/sign-up')
    .get(showSignIn)
    .post(
        // validation the input from the form
        body('username')
            .isLength({min: 3, max: 30})
            .withMessage('Username must be between 3 and 30 characters')
            .isAlphanumeric()
            .withMessage('Username must contain only letters and numbers')
        ,body('password')
            .isLength({min: 8, max: 20})
            .withMessage('Password must be between 8 and 20 characters')
        ,
        // controller
        createUser
    );


router.route('/login')
        .get((req, res)=> res.render('login'))
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login'
            })
        );


router.route('/logout')
        .get(logoutUser);


module.exports = router;