const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('trip');
const User = mongoose.model('user');



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