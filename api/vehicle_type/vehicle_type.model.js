const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	//id: { type: String,required: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    icon: { type: String, required: false },
	min_fare: { type: String, required: false },
	min_distance: { type: String, required: false },
	min_time: { type: String, required: false },
	fare_per_km: { type: String, required: false },
	fare_per_hr: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Vehicle_type', schema);