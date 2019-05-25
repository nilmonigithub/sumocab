const express = require('express');
const router = express.Router();
const ownerService = require('./owner.service');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

// routes

router.get('/allowner', getAllOwner);
router.post('/add_owner', addOwner);
router.get('/:id', getAOwnerByParam);
router.post('/owner_by_id', getAOwnerByBody);

module.exports = router;




function getAllOwner(req, res, next) {
    var token =  req.headers['token'];
    if (token) {   
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json(err);    
          } else {
    ownerService.getAllOwner()
        .then(owner => res.json(owner))
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


function addOwner(req, res, next) {
    ownerService.addOwner(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAOwnerByBody(req, res, next) {
    // ownerService.getById(req.params.id)
    ownerService.getById(req.body.id)
        .then(owner => owner ? res.json(owner) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAOwnerByParam(req, res, next) {
    ownerService.getById(req.params.id)
    //ownerService.getById(req.body.id)
        .then(owner => owner ? res.json(owner) : res.sendStatus(404))
        .catch(err => next(err));
}

