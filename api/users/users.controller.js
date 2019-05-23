const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const jwt = require('jsonwebtoken');
var SECRET = 'nodescratch';

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
//router.get('/otp/:id', generateotp);
router.get('/allusers', getAllUsers);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAll(req, res, next) {

    var token=req.headers['token'];    
    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) {
          res.json('Invalid Token');
        }else{ 

            userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));

        }
    });
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/*function addtrip(req, res, next) {
    userService.addtrip(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}*/