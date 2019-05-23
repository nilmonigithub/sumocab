const express = require('express');
const router = express.Router();
const ownerService = require('./owner.service');

// routes

router.get('/allowner', getAllOwner);
router.post('/add_owner', addOwner);
router.get('/:id', getAOwnerByParam);
router.post('/owner_by_id', getAOwnerByBody);

module.exports = router;




function getAllOwner(req, res, next) {
    ownerService.getAllOwner()
        .then(owner => res.json(owner))
        .catch(err => next(err));
		
		
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

