const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../api/users/user.model'),
	Vehicle: require('../api/vehicles/vehicle.model'),
	Trip: require('../api/trips/trip.model'),
	////Userotp: require('../api/userotps/userotp.model')
	// Customer: require('../api/customer/customer.model'),
	Vehicle_type: require('../api/vehicle_type/vehicle_type.model'),
};