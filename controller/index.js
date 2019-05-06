
const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();
var Bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');

router.get('/', function (req, res, next) {
	return res.render('login.ejs');
});


// router.post('/', function(req, res, next) {
// 	console.log(req.body);
// 	var personInfo = req.body;


// 	if(!personInfo.username || !personInfo.hash || !personInfo.hashConf){
// 		res.send();
// 	} else {
// 		if (personInfo.hash == personInfo.hashConf) {

// 			User.findOne({username:personInfo.username},function(err,data){
// 				if(!data){
// 					var c;
// 					User.findOne({},function(err,data){

// 						if (data) {
// 							console.log("if");
// 							c = data.unique_id + 1;
// 						}else{
// 							c=1;
// 						}

// 						var newPerson = new User({
// 							unique_id:c,
							
// 							username: personInfo.username,
// 							hash: personInfo.hash,
// 							hashConf: personInfo.hashConf
// 						});

// 						newPerson.save(function(err, Person){
// 							if(err)
// 								console.log(err);
// 							else
// 								console.log('Success');
// 						});

// 					}).sort({_id: -1}).limit(1);
// 					res.send({"Success":"You are regestered,You can login now."});
// 				}else{
// 					res.send({"Success":"Username is already used."});
// 				}

// 			});
// 		}else{
// 			res.send({"Success":"password is not matched"});
// 		}
// 	}
// });

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	console.log(req.body);
	User.findOne({username:req.body.username,user_type:"admin"},function(err,user){
		if(user){
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) throw err;
				console.log(req.body.password+':', isMatch); // -> Password123: true
						
			if(isMatch) {
				console.log("Done Login");
				
				req.session.user = user;
				console.log(req.session);
                res.redirect('/dashboard');
				
			}else{
				res.send({"Error":"Wrong password!"});
			}
		});
		}else{
			res.send({"Error":"This Username Is not regestered!"});
		}
	  
	});
});

// router.get('/profile', function (req, res, next) {
// 	console.log("profile");
// 	User.findOne({unique_id:req.session.userId},function(err,data){
// 		console.log("data");
// 		console.log(data);
// 		if(!data){
// 			res.redirect('/');
// 		}else{
// 			//console.log("found");
// 			return res.render('data.ejs', {"name":data.username,"email":data.email});
// 		}
// 	});
// });

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

// router.get('/forgetpass', function (req, res, next) {
// 	res.render("forget.ejs");
// });

// router.post('/forgetpass', function (req, res, next) {
// 	//console.log('req.body');
// 	//console.log(req.body);
// 	User.findOne({email:req.body.email},function(err,data){
// 		console.log(data);
// 		if(!data){
// 			res.send({"Success":"This Email Is not regestered!"});
// 		}else{
// 			// res.send({"Success":"Success!"});
// 			if (req.body.password==req.body.passwordConf) {
// 			data.password=req.body.password;
// 			data.passwordConf=req.body.passwordConf;

// 			data.save(function(err, Person){
// 				if(err)
// 					console.log(err);
// 				else
// 					console.log('Success');
// 					res.send({"Success":"Password changed!"});
// 			});
// 		}else{
// 			res.send({"Success":"Password does not matched! Both Password should be same."});
// 		}
// 		}
// 	});
	
// });

module.exports = router;