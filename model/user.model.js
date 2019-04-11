const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username: { 
        type: String, 
      
        required: "This field is required"
     },
    hash: { 
        type: String 
    },
    firstName: { 
        type: String,
         
        },
    lastName: {
         type: String, 
        
         },
	user_mobile: { 
        type: String, 
        required: "This field is required" 
    },
    createdDate: { type: Date, default: Date.now }
});

 // Custom validation for email
 userSchema.path('user_mobile').validate((val) => {
    user_mobileRegex =/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return user_mobileRegex.test(val);
}, 'Invalid Mobile No.');


mongoose.model('user', userSchema);