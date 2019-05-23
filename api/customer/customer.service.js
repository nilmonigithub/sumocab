const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Customer = db.User;

module.exports = {
	addCustomer,
    getAllCustomer,
    getById
};

async function addCustomer(customerParam) {

    // validate
    if (await Customer.findOne({ username: customerParam.username })) {
        throw 'Username "' + customerParam.username + '" is already taken';
    }
   
    const customer = new Customer;

    // hash password
    if (customerParam.password) {
        customer.hash = bcrypt.hashSync(customerParam.password, 10);
    }

    customer.fullName = customerParam.fullName;
    customer.user_mobile = customerParam.user_mobile;  
    customer.email = customerParam.email;
    customer.user_image  =   customerParam.user_image;
    customer.user_type = 'customer';     
    customer.dob= customerParam.dob;
    customer.city= customerParam.city;
    customer.username= customerParam.username;
    customer.permanent_address= customerParam.permanent_address;
    customer.present_address= customerParam.present_address;

    // save vehicle
    await customer.save();
}

async function getAllCustomer() {
    return await Customer.find({user_type:'customer'}).select('-hash');
	 //return Vehicle.find();
	//return 1;
}

async function getById(id) {
    return await Customer.findById(id).select('-hash');
}

