const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 11
    }
});

userSchema.statics.getAuth = async function (username, password) {
    const user = await this.findOne({ username });
    
    if(user) {
        const match = await bcrypt.compare(password, user.password);
        if(match) return {user};
        else return {message: 'Wrong password'};
    }
    return {message: 'Wrong name'};
}

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, (err, salt)=>{
        if(err) next(err);
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
    
})

const User = model('User', userSchema);

module.exports = User;