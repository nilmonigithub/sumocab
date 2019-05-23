const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	//id: { type: String,required: true },
    vehicle_name: { type: String, unique: true, required: true },
    vehicle_logo: { type: String, required: false },
    vehicle_no: { type: String, required: false },
	vehicle_description: { type: String, required: false },
	vehicle_minfare: { type: String, required: false },
	vehicle_min_distance: { type: String, required: false },
	vehicle_min_time: { type: String, required: false },
	vehicle_fare_perkm: { type: String, required: false },
	vehicle_fare_perhr: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Vehicle', schema);