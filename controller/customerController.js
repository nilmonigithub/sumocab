const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');
var multer=require('multer');
const bcrypt = require('bcryptjs');

//router.post('/adddriver', add_driver);
// var storage = multer.diskStorage({
//     destination: 'public/uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
//     }
//   })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './public/uploads/');
        },
     filename: function (req, file, cb) {
        var originalname = file.originalname;
        var extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length-1];
		
        cb(null, filename);
      }
    });
 
 var upload = multer({ storage : storage}).single('user_image');   
 

 

router.get('/add',(req,res)=>{
    if(req.session && req.session.user){ 
    res.render("customer/addOredit",{
        viewTitle : "Insert Customer",
        customer:''
    });
}else{
    return res.redirect('/');
}

});

 

 
//  router.get('/editcustomer/:id', (req, res) => {
// 	//res.write(req.params.id);
// 	//console.log(req.params.id);
	
// 	User.findOne(req.params.id,(err,docs)=>{
// 		console.log(docs);
//         if(!err){
//             res.render("customer/addOredit",{
//                 driver: docs,
// 				viewTitle: "Update Customer"
//             });
//         }else{
//             console.log('Error in user list:'+err);
//         }
//     });
	

// });

 

router.get('/list',(req,res)=>{
    console.log('eeeeeeeeeeeeeeeee');
    console.log(req.app.locals.baseurl);
    if(req.session && req.session.user){
    User.find({user_type:'customer'},(err,docs)=>{
        if(!err){
            res.render("customer/list",{
                list: docs,
            });
        }else{
            console.log('Error in user list:'+err);
        }
    });
}else{
    return res.redirect('/');
}
});

function add_driver(req, res, next) {
     return res.send(req.body);
}



router.post('/addcustomer',function(req,res){
	
	
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

	  if(req.file){
	 var uploaded_filename = req.file.filename;
	 req.body.user_image = uploaded_filename;
      }
		 if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
     
		
    });
});


function insertRecord(req, res) {
	
	

	var userParam =req.body;
	
	
	const user = new User;
	//user._id = Date.now();
	if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
       
        user.fullName = req.body.fullName;
        user.user_mobile = req.body.user_mobile;  
        user.email = req.body.email;
        user.user_image  =   req.body.user_image;
        user.user_type = 'customer';     
        user.dob= req.body.dob;
        user.doj= req.body.doj;
        user.city= req.body.city;
        user.username= req.body.username;
       
       

        user.save((err, doc) => {
        if (err){console.log(err)}
    else {
      res.redirect('list');
    }
    });
}

function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
          res.redirect('list');
        }
    });
}




router.get('/editcustomer/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("customer/addOredit", {
                viewTitle: "Update Customer",
                customer: doc
            });
        }
    });
});



router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/customer/list');
        }
        else { console.log('Error in customer delete :' + err); }
    });
});


module.exports = router;