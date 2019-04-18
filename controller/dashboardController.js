const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

router.get('/',(req,res)=>{
    console.log(req.session);
    if(req.session && req.session.user){   
    res.render("home/dashboard",{
    });
}else{
    return res.redirect('/');
}

});

// router.get('/',(req,res)=>{
//     res.render("home/dashboard",{
//            });
//         });

module.exports = router;