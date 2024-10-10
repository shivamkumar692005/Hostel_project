const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    name: {
        type:String
    },
    redgno: {
        type: String
    }, 
    building: {
        type: String
    }, 
    problem: {
        type: String
    }, 
    subProblem: {
        type: String
    }, 
    description: {
        type:String
    },
    roomno: {
        type: String
    }, 
    floorno: {
        type: String
    },
    file: {
        type:String
    }
});

const Complain = new mongoose.model("Complain", complaintSchema);

module.exports = Complain;