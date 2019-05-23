const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    fullName: { type: String, required: true },
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


// // hash user password before saving into database
// schema.pre('save', function(next){
// 	this.hash = bcrypt.hashSync(this.hash, saltRounds);
// 	next();
// 	});

module.exports = mongoose.model('User', schema);