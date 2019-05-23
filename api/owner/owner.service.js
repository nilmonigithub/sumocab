const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const Owner = db.User;

module.exports = {
	addOwner,
    getAllOwner,
    getById
};

async function addOwner(ownerParam) {

    // validate
    if (await Owner.findOne({ username: ownerParam.username })) {
        throw 'Username "' + ownerParam.username + '" is already taken';
    }
   
    const owner = new Owner;

    // hash password
    if (ownerParam.password) {
        owner.hash = bcrypt.hashSync(ownerParam.password, 10);
    }

    owner.fullName = ownerParam.fullName;
    owner.user_mobile = ownerParam.user_mobile;  
    owner.email = ownerParam.email;
    owner.user_image  =   ownerParam.user_image;
    owner.user_type = 'owner';     
    owner.dob= ownerParam.dob;
    owner.city= ownerParam.city;
    owner.username= ownerParam.username;
    owner.permanent_address= ownerParam.permanent_address;
    owner.present_address= ownerParam.present_address;

  
    await owner.save();
}

async function getAllOwner() {
    return await Owner.find({user_type:'owner'}).select('-hash');	                                                              
}

async function getById(id) {
    return await Owner.findById(id).select('-hash');
}

