const mongoose = require("mongoose");

var vehicle_documentSchema = new mongoose.Schema({
    vehicle_id: { 
        type: String
     },
     image: { 
        type: String
    },
    registration_type: { 
        type: String        
        },
    registration_no: {
        type: String   
         },
    registration_date: { 
        type: String
    },
    expiry_date: { 
        type: String 
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('vehicle_document', vehicle_documentSchema);