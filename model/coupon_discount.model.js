const mongoose = require("mongoose");


var couponDiscountSchema = new mongoose.Schema({
 
    coupon_name: { 
        type: String       
            },
    coupon_code: { 
        type: String
            },
    coupon_amount: { 
        type: String
            },    
    coupon_start_date: { 
        type: String       
            },
    coupon_end_date: { 
        type: String      
            },
    coupon_status:{
         type:String
            },		 
 createdDate: { type: Date, default: Date.now }
});




mongoose.model('coupon_discount', couponDiscountSchema);