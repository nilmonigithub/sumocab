const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helpers/db');
const Coupon_discount = db.Coupon_discount;

module.exports = {
	//addcoupon_discount,
    getAllCoupon_discount,
    getById
};

// async function addcoupon_discount(coupon_discountParam) {
   
//     const coupon_discount = new Coupon_discount(coupon_discountParam);

//     // save vehicle
//     await coupon_discount.save();
// }

async function getAllCoupon_discount() {
    return await Coupon_discount.find().select('-hash');
	 //return Vehicle.find();
	//return 1;
}

async function getById(id) {
    return await Coupon_discount.findById(id).select('-hash');
}
