const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('user');
var app         =   express();
var fs=require('fs');
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
    res.render("owner/addOredit",{
        viewTitle : "Insert Owner",
        owner : ''
    });
}else{
    return res.redirect('/');
}

});

 

 
//  router.get('/editdriver/:id', (req, res) => {
// 	//res.write(req.params.id);
// 	//console.log(req.params.id);
	
// 	User.findOne(req.params.id,(err,docs)=>{
// 		console.log(docs);
//         if(!err){
//             res.render("driver/addOredit",{
//                 driver: docs,
// 				viewTitle: "Update Driver"
//             });
//         }else{
//             console.log('Error in user list:'+err);
//         }
//     });
	

// });

router.get('/editowner/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("owner/addOredit", {
                viewTitle: "Update Owner",
                owner: doc
            });
        }
    });
});

 

router.get('/list',(req,res)=>{
    console.log('eeeeeeeeeeeeeeeee');
    console.log(req.app.locals.baseurl);
    if(req.session && req.session.user){
    User.find({user_type:'owner'},(err,docs)=>{
        if(!err){
            res.render("owner/list",{
                list: docs,
                message: req.flash('info') 
            });
        }else{
            console.log('Error in user list:'+err);
        }
    }).sort( { $natural: -1 } );
}else{
    return res.redirect('/');
}
});

function add_driver(req, res, next) {
     return res.send(req.body);
}



router.post('/addowner',function(req,res){
	
	
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
		//return res.send(req.body);
       // res.end("File is uploaded"+req.file.filename);
	   
	 // var  uploaded_filename = '';
	  if(req.file){
	 var uploaded_filename = req.file.filename;
	 req.body.user_image = uploaded_filename;
	 // return res.send(req.body.user_image);
	  }
	  //req.body.user_image = uploaded_filename;
	 // var ne_req = req.body;
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
        user.user_image= req.body.user_image;
        user.user_type = 'owner';     
        user.dob= req.body.dob;
        user.doj= req.body.doj;
        user.adhaar_card= req.body.adhaar_card;
        user.username= req.body.username;
        user.permanent_address= req.body.permanent_address;
        user.present_address= req.body.present_address;
        

        user.save((err, doc) => {
        if (err){console.log(err)}
    else {
        req.flash('info','Successfully Created');
      res.redirect('list');
    }
    });
}

function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
            req.flash('info','Successfully Updated');
          res.redirect('list');
        }
    });
}







router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Deleted');
            res.redirect('/owner/list');
        }
        else { console.log('Error in owner delete :' + err); }
    });
});


module.exports = router;