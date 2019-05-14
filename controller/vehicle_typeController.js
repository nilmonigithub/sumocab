const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Vehicle_type = mongoose.model('vehicle_type');
const User = mongoose.model('user');

var app         =   express();
var fs=require('fs');
var multer=require('multer');

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
 
 var upload = multer({ storage : storage}).single('icon');   
 

 

router.get('/add',(req,res)=>{
    if(req.session && req.session.user){ 
        res.render("vehicle_type/addOredit",{
            viewTitle : "Insert Vehicle Type",
            vehicle_type :''
        });
    }else{
        return res.redirect('/');
    }

});

router.get('/editvehicle_type/:id', (req, res) => {
    Vehicle_type.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("vehicle_type/addOredit", {
                viewTitle: "Update Vehicle Type",
                vehicle_type: doc
            });
        }
    });
});

 

router.get('/list',(req,res)=>{
    console.log('eeeeeeeeeeeeeeeee');
    console.log(req.app.locals.baseurl);
    if(req.session && req.session.user){
        Vehicle_type.find((err,docs)=>{
            if(!err){
                res.render("vehicle_type/list",{
                    list: docs,
                    message: req.flash('info') 
                });
            }else{
                console.log('Error in Vehicle Type list:'+err);
            }
        }).sort({$natural:-1});
    }else{
        return res.redirect('/');
    }
});



router.post('/addvehicle_type',function(req,res){
	//return res.send(req.body);
	// console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
	  if(req.file){
	 var uploaded_filename = req.file.filename;
	 req.body.icon = uploaded_filename;
	  }
		 if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
		
    });
});


function insertRecord(req, res) {
	
	const vehicle_type = new Vehicle_type;
       
    vehicle_type.name = req.body.name;
    vehicle_type.description = req.body.description;  
    vehicle_type.icon = req.body.icon;
    vehicle_type.min_fare = req.body.min_fare;
    vehicle_type.min_distance= req.body.min_distance;
    vehicle_type.min_time= req.body.min_time;
    vehicle_type.fare_per_km= req.body.fare_per_km;
    vehicle_type.fare_per_hr= req.body.fare_per_hr;
        

        vehicle_type.save((err, doc) => {
        if (err){
        console.log(err)
        }else {
        req.flash('info','Successfully Created');
      res.redirect('list');
    }
    });
}

function updateRecord(req, res) {
    Vehicle_type.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
            req.flash('info','Successfully Updated');
          res.redirect('list');
        }
    });
}







router.get('/delete/:id', (req, res) => {
    Vehicle_type.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Deleted');
            res.redirect('/vehicle_type/list');
        }
        else { console.log('Error in Vehicle Type delete :' + err); }
    });
});


module.exports = router;