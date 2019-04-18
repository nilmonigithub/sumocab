const mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
    company: { 
        type: String
     },
     model_name: { 
        type: String 
    },
    model_no: { 
        type: String         
        },
    color: {
        type: String   
         },
    registration_no: { 
        type: String
    },
    registration_date: { 
        type: String 
    },
    owner_id:{
        type: String
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('vehicle', vehicleSchema);