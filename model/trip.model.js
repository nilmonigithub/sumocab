const mongoose = require("mongoose");

var tripSchema = new mongoose.Schema({
    customer_id: { 
        type: String
     },
     from_name: { 
        type: String 
    },
    from_city: { 
        type: String         
    },
    from_latlong: {
         type: String      
    },
    from_json: { 
        type: String
    },
    to_name: { 
        type: String 
    },
    to_city: { 
        type: String
    },
    to_json: { 
        type: String
    },
    trip_type: { 
        type: String
    },
    customer_pickup_time: { 
        type: String 
    },
    customer_drop_time:{
        type: String
    },
    actual_pickup_time:{
        type: String
    },
    actual_drop_time:{
        type: String
    },
    vehicle_type:{
        type: String
    },
    vehicle_id:{
        type: String
    },
    driver_id:{
        type: String
    },
    estimated_distance:{
        type: String
    },
    actual_distance:{
        type: String
    },
    estimated_time:{
        type: String
    },
    actual_time:{
        type: String
    },
    estimated_price:{
        type: String
    },
    actual_price:{
        type: String
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('trip', tripSchema);