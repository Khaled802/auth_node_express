const express = require('express');
const {connectDB} = require('./db/connect');
const { notFoundURL } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');
const authRouter = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
require('express-async-errors');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');

passport.use(new LocalStrategy(async(username, password, done) => {
    const result = await User.getAuth(username, password);
    try {
        if(result.message) {
            return done(null, false, { message:result.message });
        } else {
            return done(null, result.user);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
        
    } catch (error) {
        done(error);
    }
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.get('/', async(req, res) => {
    res.render('index', { user: req.user });
});

app.use('/auth', authRouter);

app.use(notFoundURL);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
    }
}

start();