const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
  
