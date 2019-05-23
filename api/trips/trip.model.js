const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	id: { type: String,required: true },
    customer_id: { type: String,required: true },
    from_name: { type: String, required: false },
	from_city: { type: String, required: false },
	from_latlong: { type: String, required: false },
	from_json: { type: String, required: false },
	to_name: { type: String, required: false },
	to_city: { type: String, required: false },
	to_latlong: { type: String, required: false },
	to_json: { type: String, required: false },
	trip_type: { type: String, required: false },
	customer_pickup_time: { type: String, required: false },
	customer_drop_time: { type: String, required: false },
	actual_pickup_time: { type: String, required: false },
	actual_drop_time: { type: String, required: false },
	vehicle_type: { type: String, required: false },
	vehicle_id: { type: String, required: false },
	driver_id: { type: String, required: false },
	estimated_distance: { type: String, required: false },
	actual_distance: { type: String, required: false },
	estimated_time: { type: String, required: false },
	actual_time: { type: String, required: false },
	estimated_price: { type: String, required: false },
    actual_price: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', schema);