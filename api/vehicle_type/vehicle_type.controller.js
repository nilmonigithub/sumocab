const express = require('express');
const router = express.Router();
const vehicle_typeService = require('./vehicle_type.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

// routes

router.get('/allvehicle_type', getAllVehicle_type);
router.post('/add_vehicle_type', addvehicle_type);
router.get('/:id', getAVehicle_typeByParam);
router.post('/vehicle_type_by_id', getAVehicle_typeByBody);

module.exports = router;




function getAllVehicle_type(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
                vehicle_typeService.getAllVehicle_type()
                .then(vehicle_type => res.json(vehicle_type))
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

function addvehicle_type(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
            vehicle_typeService.addvehicle_type(req.body)
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

function getAVehicle_typeByBody(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
            // customerService.getById(req.params.id)
            vehicle_typeService.getById(req.body.id)
                .then(vehicle_type => vehicle_type ? res.json(vehicle_type) : res.sendStatus(404))
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

function getAVehicle_typeByParam(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
            vehicle_typeService.getById(req.params.id)
            //customerService.getById(req.body.id)
                .then(vehicle_type => vehicle_type ? res.json(vehicle_type) : res.sendStatus(404))
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

