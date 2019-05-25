const express = require('express');
const router = express.Router();
const vehicleService = require('./vehicle.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

// routes

router.get('/allvehicle', getAllVehicles);
router.post('/add_vehicle', addvehicle);

module.exports = router;




function getAllVehicles(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
                vehicleService.getAllVehicles()
                .then(vehicles => res.json(vehicles))
                .catch(err => next(err));
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }				
}

function addvehicle(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
            vehicleService.addvehicle(req.body)
                .then(() => res.json({}))
                .catch(err => next(err));
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

