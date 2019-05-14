const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const CouponDis = mongoose.model('coupon_discount');


router.get('/',(req,res)=>{
    console.log('jjjjjjjjjj');
    if(req.session && req.session.user){       
            res.render("coupon_discount/addOredit",{
                viewTitle : "Insert Coupon Discount",
                couponDis:''
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

    var couponDis = new CouponDis();
    
        couponDis.company = req.body.company;
      
        couponDis.coupon_name = req.body.coupon_name;  
        couponDis.coupon_code = req.body.coupon_code;
        couponDis.coupon_amount = req.body.coupon_amount;
        couponDis.coupon_start_date = req.body.coupon_start_date;
        couponDis.coupon_end_date = req.body.coupon_end_date;
        couponDis.coupon_status = req.body.coupon_status;
       

        couponDis.save((err, doc) => {
        if (!err){
            req.flash('info','Successfully Created');
            res.redirect('coupon_discount/list');
        }else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("coupon_discount/addOredit", {
                    viewTitle: "Insert Coupon Dicount",
                    couponDis: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    CouponDis.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Updated');
             res.redirect('coupon_discount/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("coupon_discount/addOredit", {
                    viewTitle: 'Update Coupon Discount',
                    couponDis: req.body
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
        
        CouponDis.find((err,docs)=>{
        
        if(!err){
            res.render("coupon_discount/list",{
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
    CouponDis.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("coupon_discount/addOredit", {
                    viewTitle: "Update Coupon Discount",
                    couponDis: doc
                });
            }
       
    });
});

router.get('/delete/:id', (req, res) => {
    CouponDis.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Deleted');
            res.redirect('/coupon_discount/list');
        }
        else { console.log('Error in vehicle delete :' + err); }
    });
});



module.exports = router;