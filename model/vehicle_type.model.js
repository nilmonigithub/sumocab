const mongoose = require("mongoose");

var vehicle_typeSchema = new mongoose.Schema({
    name: { 
        type: String
    },
     description: { 
        type: String
    },
    icon: { 
        type: String        
    },
    min_fare: {
        type: String   
    },
    min_distance: { 
        type: String
    },
    min_time: { 
        type: String 
    },
    fare_per_km: { 
        type: String 
    },
    fare_per_hr: { 
        type: String 
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('vehicle_type', vehicle_typeSchema);