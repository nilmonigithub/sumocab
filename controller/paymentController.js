const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Payment = mongoose.model('payment');
const CouponDis = mongoose.model('coupon_discount');
const Trip = mongoose.model('trip');



router.get('/list',(req,res)=>{
    console.log('hhhhhh');
    console.log(req.session);
    if(req.session && req.session.user){ 
            
        CouponDis.find((err,doc)=>{
            Trip.find((err,doc2)=>{        
                Payment.find((err,docs)=>{
                
                    if(!err){
                        res.render("payment/list",{
                            list: docs,
                            cuponList:doc,
                            tripList:doc2,
                            message: req.flash('info') 
                        });
                
                    }else{
                        console.log('Error in user list:'+err);
                    }
                });
            });
        }).sort( { $natural: -1 } );
}else{
    return res.redirect('/');
}
});


router.get('/add',(req,res)=>{
    if(req.session && req.session.user){ 
    CouponDis.find((err,docs)=>{
        Trip.find((err, docs1) => {
            res.render("payment/addOredit",{
                viewTitle : "Insert Payment",
                payment :'',
                cupon:docs,
                trip:docs1
            })
        });
    });
}else{
    return res.redirect('/');
}

});

router.get('/editpayment/:id', (req, res) => {
    CouponDis.find((err, docs) => {
        Trip.find((err, docs1) => {
            Payment.findById(req.params.id, (err, doc) => {
                if (!err) {
                    res.render("payment/addOredit", {
                        viewTitle: "Update Payment",
                        payment: doc,
                        cupon:docs,
                        trip:docs1
                    });
                }
            });
        });
    });
});


router.post('/addpayment',function(req,res){
   //return res.send(req.body);
		 if (req.body && req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
		
  
});


function insertRecord(req, res) {	
	
	const payment = new Payment;
	
	
       
        payment.trip_id = req.body.trip_id;
        payment.payment_amount = req.body.payment_amount;  
        payment.coupon_code_id = req.body.coupon_code_id;      
        payment.discount_amount = req.body.discount_amount;
        payment.total_payment= req.body.total_payment;
        payment.payment_mode= req.body.payment_mode;
        payment.payment_getway= req.body.payment_getway;
        payment.transaction_id= req.body.transaction_id;
        payment.payment_date= req.body.payment_date;
       
        

        payment.save((err, doc) => {
        if (err){console.log(err)}
    else {
        req.flash('info','Successfully Created');
      res.redirect('list');
    }
    });
}

function updateRecord(req, res) {
    Payment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
            req.flash('info','Successfully Updated');
          res.redirect('list');
        }
    });
}

router.get('/delete/:id', (req, res) => {
    Payment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Updated');
            res.redirect('/Payment/list');
        }
        else { console.log('Error in Payment delete :' + err); }
    });
});

module.exports = router;