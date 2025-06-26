const mongoose = require("mongoose");
const env = require('dotenv');

env.config();

 
const URL = process.env.MONGODB_URI



 
 const connectDB = async () => {
   await mongoose.connect(
     URL
   );
 };
 
 module.exports = connectDB;