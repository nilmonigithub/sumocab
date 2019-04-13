const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
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

 // Custom validation for mobile
 userSchema.path('user_mobile').validate((val) => {
    user_mobileRegex =/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return user_mobileRegex.test(val);
}, 'Invalid Mobile No.');


//password bcrypt
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('hash')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.hash, salt, function(err, hash) {
      
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.hash = hash;
            next();
        });
    });
});

mongoose.model('user', userSchema);