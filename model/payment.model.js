const mongoose = require("mongoose");

var paymentSchema = new mongoose.Schema({
    trip_id: { 
        type: String
     },
     payment_amount: { 
        type: String      
    },
    coupon_code_id: { 
        type: String              
        },
    discount_amount: {
        type: String   
         },
    total_payment: { 
        type: String,
        required: "This field is required"
    },
    payment_mode: { 
        type: String 
    },
    payment_getway:{
        type: String
    },
    transaction_id:{
        type: String
    },
    payment_date:{
        type: String
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('payment', paymentSchema);