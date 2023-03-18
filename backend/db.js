const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connection Successful')
    } catch (err) {
        console.log("Error" + err)
    }
}

module.exports = connectToMongo;