const express = require('express');
const router = express.Router();
const driverService = require('./driver.service');

// routes

router.get('/alldriver', getAllDriver);
router.post('/add_driver', addDriver);
router.get('/:id', getADriverByParam);
router.post('/driver_by_id', getADriverByBody);

module.exports = router;




function getAllDriver(req, res, next) {
    driverService.getAllDriver()
        .then(driver => res.json(driver))
        .catch(err => next(err));
		
	
}

function addDriver(req, res, next) {
    driverService.addDriver(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getADriverByBody(req, res, next) {
    // driverService.getById(req.params.id)
    driverService.getById(req.body.id)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

function getADriverByParam(req, res, next) {
    driverService.getById(req.params.id)
    //driverService.getById(req.body.id)
        .then(driver => driver ? res.json(driver) : res.sendStatus(404))
        .catch(err => next(err));
}

