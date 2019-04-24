const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const VehicleDoc = mongoose.model('vehicle_document');

router.get('/',(req,res)=>{
    console.log('jjjjjjjjjj');
    if(req.session && req.session.user){  
     
    res.render("vehicle_document/addOredit",{
        viewTitle : "Insert Vehicle"
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

    var vehicledoc = new VehicleDoc();
    
        vehicledoc.vehicle_id = req.body.vehicle_id;
      
        vehicledoc.image = req.body.image;  
        vehicledoc.registration_type = req.body.registration_type;
        vehicledoc.registration_no = req.body.registration_no;
        vehicledoc.registration_date = req.body.registration_date;
        vehicledoc.expiry_date = req.body.expiry_date;
       

        vehicledoc.save((err, doc) => {
        if (!err)
            res.redirect('vehicle_document/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle_document/addOredit", {
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
    VehicleDoc.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('vehicle_document/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicle_document/addOredit", {
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
        VehicleDoc.find((err,docs)=>{
        if(!err){
            res.render("vehicle_document/list",{
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
    VehicleDoc.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("vehicle_document/addOredit", {
                viewTitle: "Update User",
                vehicle: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    VehicleDoc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vehicle_document/list');
        }
        else { console.log('Error in vehicle delete :' + err); }
    });
});


module.exports = router;