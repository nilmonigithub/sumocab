const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    fullName: { type: String, required: true },
    //lastName: { type: String, required: true },
	user_mobile: { type: String, required: true },
	user_type: { type: String, required: false },
	user_image: { type: String, required: false },
	dl_pic: { type: String, required: false },
	dl_no: { type: String, required: false },
	dl_expiry: { type: String, required: false },
	dob: { type: String, required: false },
	adhaar_card: { type: String, required: false },
	permanent_address: { type: String, required: false },
	present_address: { type: String, required: false },	
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);