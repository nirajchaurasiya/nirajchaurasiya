const mongoose = require("mongoose")
require('dotenv').config();
const uri = process.env.URI
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true }, mongoose.set('strictQuery', false))
    console.log("Connection successful")

} catch (error) {
    console.log(err);
}