const express = require('express');
const router = express.Router();
const vehicleService = require('./vehicle.service');

// routes

router.get('/allvehicle', getAllVehicles);
router.post('/add_vehicle', addvehicle);

module.exports = router;




function getAllVehicles(req, res, next) {
		vehicleService.getAllVehicles()
        .then(vehicles => res.json(vehicles))
        .catch(err => next(err));
		
		
}

function addvehicle(req, res, next) {
    vehicleService.addvehicle(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

