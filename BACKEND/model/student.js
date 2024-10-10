const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:String,
    regno:String,
    email:String,
    password:String
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
  