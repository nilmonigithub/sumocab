const mongoose = require("mongoose");

var driverSchema = new mongoose.Schema({
    name: { 
        type: String
     },
    mobile: { 
        type: String 
    },
    email: { 
        type: String         
        },
    image: {
         data: Buffer,
         type: String,        
         },
	// dl_pic: { 
    //     type: String
    // },
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
        type: String
    },
    permanent_address: { 
        type: String 
    },
    present_address:{
        type: String
    },
    createdDate: { type: Date, default: Date.now }
});

 
mongoose.model('driver', driverSchema);