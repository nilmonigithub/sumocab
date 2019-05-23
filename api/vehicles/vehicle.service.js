const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
const Vehicle = db.Vehicle;

module.exports = {
	addvehicle,
    getAllVehicles
};

async function addvehicle(vehicleParam) {
   
    const vehicle = new Vehicle(vehicleParam);

    // save vehicle
    await vehicle.save();
}

async function getAllVehicles() {
    return await Vehicle.find().select('-hash');
	 //return Vehicle.find();
	//return 1;
}

