const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
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
 


router.get('/',(req,res)=>{
    if(req.session && req.session.user){ 
    res.render("driver/addOredit",{
        viewTitle : "Insert Driver"
    });
}else{
    return res.redirect('/');
}

});

 

 
 router.get('/editdriver/:id', (req, res) => {
	//res.write(req.params.id);
	//console.log(req.params.id);
	
	User.findOne({username:req.params.id},(err,docs)=>{
		console.log(docs);
        if(!err){
            res.render("driver/addOredit",{
                driver: docs,
				viewTitle: "Update Driver"
            });
        }else{
            console.log('Error in user list:'+err);
        }
    });
	
	/*User.findById(req.params.id)
	.then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id1 " + req.params.id
            });            
        }
		console.log(user);
       // res.send(note);
	   console.log(req.params.id);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id2 " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id3 " + req.params.id
        });
    });
    */
});
 
 /*router.get('/list22', function(req, res) {
        User.find({user_type:'driver'}, function(err, users) {
           //res.render('/driver/list', {list: users});
		   console.log(users);
		     res.render("driver/list",{
                list: users
            });
        });
    });*/
 

router.get('/list',(req,res)=>{
    if(req.session && req.session.user){
    User.find({user_type:'driver'},(err,docs)=>{
        if(!err){
            res.render("driver/list",{
                list: docs
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



router.post('/adddriver',function(req,res){
	
	
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

router.post('/adddriver22', multer().none(),(req,res)=>{
	
 console.log(req.body._id);
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
   
});

function insertRecord(req, res) {
	
	
   // return res.send(req.body);
    // const salt = Bcrypt.genSaltSync(10);
    // const password = req.body.hash;
	var userParam =req.body;
	// return res.send(userParam.password);
	
	const user = new User(userParam);
	user._id = Date.now();
	if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
	user.lastName = '';
	user.user_type = 'driver';
	//user.user_image = '';
//return res.send(user);
    // save user
    user.save();
	
	//return res.send(user);
res.redirect('list');
   /* var driver = new Driver();
    
        driver.name = req.body.firstName;
        driver.mobile = req.body.user_mobile;  
        driver.email = req.body.email;
        driver.image = uploaded_filename;
       // return res.send(fs.readFileSync.filename);
        //driver.image.data = fs.readFileSync(imgPath);
        // driver.image.contentType = 'image/png';
        
        driver.dl_no = req.body.dl_no;
        driver.dl_expiry= req.body.dl_expiry;
        driver.dob= req.body.dob;
        driver.doj= req.body.doj;
        driver.adhaar_card= req.body.adhaar_card;
        driver.permanent_address= req.body.permanent_address;
        driver.present_address= req.body.present_address;

        driver.save((err, doc) => {
        // if (!err)
        //     res.redirect('driver/list');
        // else {
        //     if (err.name == 'ValidationError') {
        //         handleValidationError(err, req.body);
        //         res.render("driver/addOredit", {
        //             viewTitle: "Insert user",
        //             user: req.body
        //         });
        //     }
        //     else
        //         console.log('Error during record insertion : ' + err);
        // }
        if (err){console.log(err)}
    else {
      res.redirect('list');
    }
    });*/
}

function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("driver/addOredit", {
                    viewTitle: 'Update Driver',
                    driver: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}





// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'username':
//                 body['usernameError'] = err.errors[field].message;
//                 break;
//             case 'user_mobile':
//                 body['user_mobileError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// router.get('/:id', (req, res) => {
//     User.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("user/addOredit", {
//                 viewTitle: "Update User",
//                 user: doc
//             });
//         }
//     });
// });


/*router.get('/delete/:id', (req, res) => {
	res.write(req.params.id);
	console.log(req.params.id);
	User.findOneAndDelete(
   { "username" : req.params.id }
)
	 res.redirect('/driver/list');
    
});*/

router.get('/delete/:id', (req, res) => {
	
	User.findOneAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)}, function (err,offer){
    res.redirect('/driver/list');
  });
    /*User.findOneAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/driver/list');
        }
        else { console.log('Error in user delete :' + err); }
    });*/
});


module.exports = router;
