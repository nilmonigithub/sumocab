const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
// routes

router.get('/allcustomer', getAllCustomer);
router.post('/add_customer', addCustomer);
router.get('/:id', getACustomerByParam);
router.post('/customer_by_id', getACustomerByBody);

module.exports = router;




function getAllCustomer(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
            customerService.getAllCustomer()
                .then(customer => res.json(customer))
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

function addCustomer(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
            customerService.addCustomer(req.body)
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

function getACustomerByBody(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
            // customerService.getById(req.params.id)
            customerService.getById(req.body.id)
                .then(customer => customer ? res.json(customer) : res.sendStatus(404))
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

function getACustomerByParam(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
            jwt.verify(token, config.secret, function(err, decoded) {      
            if (err) {
                return res.json(err);    
            } else {
            customerService.getById(req.params.id)
            //customerService.getById(req.body.id)
                .then(customer => customer ? res.json(customer) : res.sendStatus(404))
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

