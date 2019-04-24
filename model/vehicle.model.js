const mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
    company: { 
        type: String
     },
     model_name: { 
        type: String,
        required: "This field is required" 
    },
    model_no: { 
        type: String,
        required: "This field is required"         
        },
    color: {
        type: String   
         },
    registration_no: { 
        type: String,
        required: "This field is required"
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