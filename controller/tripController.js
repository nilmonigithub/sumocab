const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('trip');

router.get('/',(req,res)=>{
    console.log('jjjjjjjjjj');
    if(req.session && req.session.user){  
     
    res.render("trip/addOredit",{
        viewTitle : "Insert Trip",
        trip:''

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

    var trip = new Trip();
    
       
      
        trip.customer_id = req.body.customer_id;  
        trip.from_name = req.body.from_name;
        trip.from_city = req.body.from_city;
        trip.from_latlong = req.body.from_latlong;
        trip.from_json = req.body.from_json;
        trip.to_name = req.body.to_name;
        trip.to_city = req.body.to_city;
        trip.to_latlong = req.body.to_latlong;
        trip.to_json = req.body.to_json;
        trip.trip_type = req.body.trip_type;
        trip.customer_pickup_time = req.body.customer_pickup_time;
        trip.customer_drop_time = req.body.customer_drop_time;
        trip.actual_pickup_time = req.body.actual_pickup_time;
        trip.actual_drop_time = req.body.actual_drop_time;
        trip.vehicle_type = req.body.vehicle_type;
        trip.vehicle_id = req.body.vehicle_id;
        trip.driver_id = req.body.driver_id;
        trip.estimated_distance = req.body.estimated_distance;
        trip.actual_distance = req.body.actual_distance;
        trip.estimated_time = req.body.estimated_time;
        trip.actual_time = req.body.actual_time;
        trip.estimated_price = req.body.estimated_price;
        trip.actual_price = req.body.actual_price;

       

        trip.save((err, doc) => {
        if (!err)
            res.redirect('trip/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("trip/addOredit", {
                    viewTitle: "Insert Trip",
                    trip: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Trip.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('trip/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("trip/addOredit", {
                    viewTitle: 'Update Trip',
                    trip: req.body
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
    Trip.find((err,docs)=>{
        if(!err){
            res.render("trip/list",{
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
    Trip.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("trip/addOredit", {
                viewTitle: "Update Trip",
                trip: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Trip.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/trip/list');
        }
        else { console.log('Error in trip delete :' + err); }
    });
});


module.exports = router;