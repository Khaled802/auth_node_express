const mongoose = require('mongoose');

const connectDB = async (mongoUri) => { 
    return await mongoose.connect(mongoUri);
}

module.exports = {
    connectDB
}