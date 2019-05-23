const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
const Vehicle_type = db.Vehicle_type;

module.exports = {
	addvehicle_type,
    getAllVehicle_type,
    getById
};

async function addvehicle_type(vehicle_typeParam) {
   
    const vehicle_type = new Vehicle_type(vehicle_typeParam);

    // save vehicle
    await vehicle_type.save();
}

async function getAllVehicle_type() {
    return await Vehicle_type.find().select('-hash');
	 //return Vehicle.find();
	//return 1;
}

async function getById(id) {
    return await Vehicle_type.findById(id).select('-hash');
}
