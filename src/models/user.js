const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  profession: {
    type: Number,
  },
  gender: {
    type: String,
  },
  region:{
    type:String,
  },
  joinedDate: {
    type:Date ,
  },
  Profession:
{
  type: String,
},
number:{
  type:Number,
}
})
;

module.exports = mongoose.model("User", userSchema);