const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');

// routes

router.get('/allcustomer', getAllCustomer);
router.post('/add_customer', addCustomer);
router.get('/:id', getACustomerByParam);
router.post('/customer_by_id', getACustomerByBody);

module.exports = router;




function getAllCustomer(req, res, next) {
    customerService.getAllCustomer()
        .then(customer => res.json(customer))
        .catch(err => next(err));
		
		
}

function addCustomer(req, res, next) {
    customerService.addCustomer(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getACustomerByBody(req, res, next) {
    // customerService.getById(req.params.id)
    customerService.getById(req.body.id)
        .then(customer => customer ? res.json(customer) : res.sendStatus(404))
        .catch(err => next(err));
}

function getACustomerByParam(req, res, next) {
    customerService.getById(req.params.id)
    //customerService.getById(req.body.id)
        .then(customer => customer ? res.json(customer) : res.sendStatus(404))
        .catch(err => next(err));
}

