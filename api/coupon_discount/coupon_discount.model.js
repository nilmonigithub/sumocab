const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	//id: { type: String,required: true },
    coupon_code: { type: String, unique: true, required: true },
    coupon_name: { type: String, required: false },
    coupon_amount: { type: String, required: false },
	coupon_start_date: { type: String, required: false },
	coupon_end_date: { type: String, required: false },
	coupon_status: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Coupon_discount', schema);