const express = require('express');
const router = express.Router();
const vehicle_typeService = require('./vehicle_type.service');

// routes

router.get('/allvehicle_type', getAllVehicle_type);
router.post('/add_vehicle_type', addvehicle_type);
router.get('/:id', getAVehicle_typeByParam);
router.post('/vehicle_type_by_id', getAVehicle_typeByBody);

module.exports = router;




function getAllVehicle_type(req, res, next) {
		vehicle_typeService.getAllVehicle_type()
        .then(vehicle_type => res.json(vehicle_type))
        .catch(err => next(err));
		
		
}

function addvehicle_type(req, res, next) {
    vehicle_typeService.addvehicle_type(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAVehicle_typeByBody(req, res, next) {
    // customerService.getById(req.params.id)
    vehicle_typeService.getById(req.body.id)
        .then(vehicle_type => vehicle_type ? res.json(vehicle_type) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAVehicle_typeByParam(req, res, next) {
    vehicle_typeService.getById(req.params.id)
    //customerService.getById(req.body.id)
        .then(vehicle_type => vehicle_type ? res.json(vehicle_type) : res.sendStatus(404))
        .catch(err => next(err));
}

