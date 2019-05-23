const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
//const Vehicle = db.Vehicle;
const Trip = db.Trip;

module.exports = {
	addtripdetails,
    getAllTrip,
	getById
};

async function getById(id) {
    return await Trip.findById(id).select('-hash');
}

async function addtripdetails(tripParam) {
   
    const trip = new Trip(tripParam);

    // save vehicle
    await trip.save();
}

async function getAllTrip() {
    return await Trip.find().select('-hash');	
}

