const express = require('express');
const router = express.Router();
const coupon_discountService = require('./coupon_discount.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

// routes

router.get('/allcoupon_discount', getAllCoupon_discount);
//router.post('/add_coupon_discount', addcoupon_discount);
router.get('/:id', getACoupon_discountByParam);
router.post('/coupon_discount_by_id', getACoupon_discountByBody);

module.exports = router;




function getAllCoupon_discount(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
            coupon_discountService.getAllCoupon_discount()
                .then(coupon_discount => res.json(coupon_discount))
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

// function addvehicle_type(req, res, next) {
//     vehicle_typeService.addvehicle_type(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

function getACoupon_discountByParam(req, res, next) {
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

function getACoupon_discountByBody(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
            coupon_discountService.getById(req.params.id)
            //customerService.getById(req.body.id)
                .then(coupon_discount => coupon_discount ? res.json(coupon_discount) : res.sendStatus(404))
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

