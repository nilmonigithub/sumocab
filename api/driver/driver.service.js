const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Driver = db.User;

module.exports = {
	addDriver,
    getAllDriver,
    getById
};

async function addDriver(driverParam) {

    // validate
    if (await Driver.findOne({ username: driverParam.username })) {
        throw 'Username "' + driverParam.username + '" is already taken';
    }
   
    const driver = new Driver;

    // hash password
    if (driverParam.password) {
        driver.hash = bcrypt.hashSync(driverParam.password, 10);
    }

    driver.fullName = driverParam.fullName;
    driver.user_mobile = driverParam.user_mobile;  
    driver.email = driverParam.email;
    driver.user_image  =   driverParam.user_image;
    driver.user_type = 'driver';     
    driver.dob= driverParam.dob;
    driver.city= driverParam.city;
    driver.username= driverParam.username;
    driver.permanent_address= driverParam.permanent_address;
    driver.present_address= driverParam.present_address;

  
    await driver.save();
}

async function getAllDriver() {
    return await Driver.find({user_type:'driver'}).select('-hash');	                                                              
}

async function getById(id) {
    return await Driver.findById(id).select('-hash');
}

