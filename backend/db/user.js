// const mongoose=require("mongoose");
// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String,
//     isAdmin:Boolean
// });
// const User=mongoose.model("users",userSchema);
// module.exports=User;

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Export the user model
module.exports = mongoose.model('User', userSchema);

