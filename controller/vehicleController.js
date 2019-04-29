const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Vehicle = mongoose.model('vehicle');
const User = mongoose.model('user');

router.get('/',(req,res)=>{
    console.log('jjjjjjjjjj');
    if(req.session && req.session.user){  
        User.find({user_type:'owner'},(err,docs)=>{
            res.render("vehicle/addOredit",{
                viewTitle : "Insert Vehicle",
                owner_list: docs,
                vehicle:''
            });
        });
    }else{
        return res.redirect('/');
    }

});

router.post('/',(req,res)=>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
   
});

function insertRecord(req, res) {
    //return res.send(req.body);
    // const salt = Bcrypt.genSaltSync(10);
    // const password = req.body.hash;

    var vehicle = new Vehicle();
    
        vehicle.company = req.body.company;
      
        vehicle.model_name = req.body.model_name;  
        vehicle.model_no = req.body.model_no;
        vehicle.color = req.body.color;
        vehicle.registration_no = req.body.registration_no;
        vehicle.registration_date = req.body.registration_date;
        vehicle.owner_id = req.body.owner_id;
       

        vehicle.save((err, doc) => {
        if (!err)
            res.redirect('vehicle/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle/addOredit", {
                    viewTitle: "Insert vehicle",
                    vehicle: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Vehicle.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('vehicle/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle/addOredit", {
                    viewTitle: 'Update Vehicle',
                    vehicle: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}



router.get('/list',(req,res)=>{
    console.log('hhhhhh');
    console.log(req.session);
    if(req.session && req.session.user){ 
        
    Vehicle.find((err,docs)=>{
        User.find({user_type:'owner'},(err,docs1)=>{
        if(!err){
            res.render("vehicle/list",{
                list: docs,
                owner_list: docs1
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

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'model_name':
                body['model_nameError'] = err.errors[field].message;
                break;
            case 'registration_no':
                body['registration_noError'] = err.errors[field].message;
                break;
            case 'model_no':
                body['model_noError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Vehicle.findById(req.params.id, (err, doc) => {
        User.find({user_type:'owner'},(err,docs)=>{
            if (!err) {
                res.render("vehicle/addOredit", {
                    viewTitle: "Update Vehicle",
                    owner_list: docs,
                    vehicle: doc
                });
            }
        });
    });
});

router.get('/delete/:id', (req, res) => {
    Vehicle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vehicle/list');
        }
        else { console.log('Error in vehicle delete :' + err); }
    });
});


module.exports = router;