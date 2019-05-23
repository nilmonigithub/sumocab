const express = require('express');
const router = express.Router();
const tripService = require('./trip.service');

// routes

router.get('/alltrip', getAllTrip);
router.get('/:id', getATrip);
router.post('/add_trip', addtrip);

module.exports = router;


function getATrip(req, res, next) {
    tripService.getById(req.params.id)
        .then(trip => trip ? res.json(trip) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllTrip(req, res, next) {
		tripService.getAllTrip()
        .then(trips => res.json(trips))
        .catch(err => next(err));
		
		
}

function addtrip(req, res, next) {
    tripService.addtripdetails(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

