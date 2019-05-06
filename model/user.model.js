const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
 
    username: { 
        type: String, 
       
     },
    hash: { 
        type: String
    },
    fullName: { 
        type: String, 
        },
    
	user_mobile: { 
        type: String, 
       
    },
    email: { 
        type: String, 
      
    },
     user_type:{
         type:String,
     },
	  user_image:{
         type:String,
     },
	 dl_no: { 
        type: String
    },
    dl_expiry: { 
        type: String 
    },
    dob: { 
        type: String
    },
    doj: { 
        type: String
    },
    adhaar_card: { 
        type: String,
        
    },
    permanent_address: { 
        type: String 
    },
    present_address:{
        type: String
    },
    city:{
        type: String
    },
		 
	 
    createdDate: { type: Date, default: Date.now }
});


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

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.hash, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};







userSchema.plugin(mongoosePaginate);
mongoose.model('user', userSchema);