 const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGI_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
}
module.exports = connectDB;