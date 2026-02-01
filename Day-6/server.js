require('dotenv').config();
const app = require("./src/app");
const mongoose = require("mongoose");

function connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
}

connect();

app.listen(3000,() => {
    console.log("server is running on port 3000");
});
module.exports = app;