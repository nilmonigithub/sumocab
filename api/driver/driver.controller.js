const express = require('express');
const router = express.Router();
const driverService = require('./driver.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
// routes

router.get('/alldriver', getAllDriver);
router.post('/add_driver', addDriver);
router.get('/:id', getADriverByParam);
router.post('/driver_by_id', getADriverByBody);

module.exports = router;




function getAllDriver(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
        } else {
            driverService.getAllDriver()
                .then(driver => res.json(driver))
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

function addDriver(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
        } else {
            driverService.addDriver(req.body)
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

function getADriverByBody(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
        } else {
            // driverService.getById(req.params.id)
            driverService.getById(req.body.id)
                .then(driver => driver ? res.json(driver) : res.sendStatus(404))
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

function getADriverByParam(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
        } else {
            driverService.getById(req.params.id)
            //driverService.getById(req.body.id)
                .then(driver => driver ? res.json(driver) : res.sendStatus(404))
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

