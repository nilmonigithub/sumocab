const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const VehicleDoc = mongoose.model('vehicle_document');
const Vehicle = mongoose.model('vehicle');
var multer=require('multer');
const bcrypt = require('bcryptjs');



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
 
 var upload = multer({ storage : storage}).single('image');   
 

 

router.get('/add',(req,res)=>{
    if(req.session && req.session.user){ 
        Vehicle.find((err,docs)=>{
            res.render("vehicle_document/addOredit",{
                viewTitle : "Insert Vehicle Document",
                vehicledoc :'',
                vehicle: docs
            });
        });
    }else{
     return res.redirect('/');
}
    

});



router.get('/editvehicledoc/:id', (req, res) => {
    VehicleDoc.findById(req.params.id, (err, doc) => {
            Vehicle.find((err,docs)=>{
            if (!err) {
                res.render("vehicle_document/addOredit", {
                    viewTitle: "Update Vehicle Document",
                    vehicledoc: doc,
                    vehicle: docs
                });
            }
        });
    });
});

 

router.get('/list',(req,res)=>{
    console.log('eeeeeeeeeeeeeeeee');
    console.log(req.app.locals.baseurl);
    if(req.session && req.session.user){
        VehicleDoc.find((err,doc)=>{
            Vehicle.find((err,docs)=>{
                if(!err){
                    res.render("vehicle_document/list",{
                        list: doc,
                        vehicle: docs
                    });
                }else{
                    console.log('Error in user list:'+err);
                }
            });
        });
    }else{
        return res.redirect('/');
    }
});

function add_driver(req, res, next) {
     return res.send(req.body);
}



router.post('/addvehicledoc',function(req,res){
	
	
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
	
	  if(req.file){
	 var uploaded_filename = req.file.filename;
	 req.body.image = uploaded_filename;
	 
	  }
	
		 if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
		
    });
});


function insertRecord(req, res) {
	
	

    var vehicledoc = new VehicleDoc();
    
    vehicledoc.vehicle_id = req.body.vehicle_id;
  
    vehicledoc.image =  req.body.image; 
    vehicledoc.registration_type = req.body.registration_type;
    vehicledoc.registration_no = req.body.registration_no;
    vehicledoc.registration_date = req.body.registration_date;
    vehicledoc.expiry_date = req.body.expiry_date;
        

    vehicledoc.save((err, doc) => {
        if (err){console.log(err)}
    else {
      res.redirect('list');
    }
    });
}

function updateRecord(req, res) {
    VehicleDoc.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
          res.redirect('list');
        }
    });
}







router.get('/delete/:id', (req, res) => {
    VehicleDoc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vehicle_document/list');
        }
        else { console.log('Error in vehicle document delete :' + err); }
    });
});


module.exports = router;