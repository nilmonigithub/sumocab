const express = require('express');
const router = express.Router();
const tripService = require('./trip.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
// routes

router.get('/alltrip', getAllTrip);
router.get('/:id', getATrip);
router.post('/add_trip', addtrip);

module.exports = router;


function getATrip(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
        } else {
            tripService.getById(req.params.id)
                .then(trip => trip ? res.json(trip) : res.sendStatus(404))
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

function getAllTrip(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
                tripService.getAllTrip()
                .then(trips => res.json(trips))
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

function addtrip(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
            } else {
            tripService.addtripdetails(req.body)
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

