const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('trip');
const User = mongoose.model('user');


Trip.aggregate([

    // Join with user table
    {
        $lookup:{
            from: "user",       // other table name
            localField: "user_type",   // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "driver_info"         // alias for userinfo table
        }
    },
    {   $unwind:"$driver_info" },     // $unwind used for getting data in object or for one record only

    // define some conditions here 
    {
        $match:{
            $and:[{"user_type" : "driver"}]
        }
    },

    // Join with user_role table
    {
        $lookup:{
            from: "user", 
            localField: "user_type", 
            foreignField: "_id",
            as: "customer_info"
        }
    },
    {   $unwind:"$customer_info" },

    // define some conditions here 
    {
        $match:{
            $and:[{"user_type" : "customer"}]
        }
    },

    // define which fields are you want to fetch
    {   
        $project:{
            _id : 1,
            driver_name : "$driver_info.name",
            customer_name : "$customer_info.name",
        } 
    }
]);

// router.get('/list',(req,res)=>{
//     //console.log('hhhhhh');
//     //console.log(req.session);
//     if(req.session && req.session.user){ 
//     Trip.find((err,docs)=>{
//         User.find({user_type:'driver'},(err1,docs1)=>{
//             User.find({user_type:'customer'},(err2,docs2)=>{
//                 Vehicle.find((err3,docs3)=>{
//                     if(!err){
//                         res.render("trip/list",{
//                             list: docs,
//                             driver_list: docs1,
//                             customer_list: docs2,
//                             vehicle_list: docs3,
//                             message: req.flash('info') 
//                         });
//                     }else{
//                         console.log('Error in user list:'+err);
//                     }
//                 });
//             });
//         });    
//     });
// }else{
//     return res.redirect('/');
// }
// });


module.exports = router;