const mongoose = require("mongoose");
const env = require('dotenv');

env.config();

 
const URL = process.env.MONGODB_URI


console.log( URL);
 
 const connectDB = async () => {
   await mongoose.connect(
     URL
   );
 };
 
 module.exports = connectDB;