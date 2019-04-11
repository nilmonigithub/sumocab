const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

router.get('/',(req,res)=>{
    res.render("user/addOredit",{
        viewTitle : "Insert User"
    });

});

router.post('/',(req,res)=>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
   
});

function insertRecord(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.hash =  req.body.hash;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.user_mobile = req.body.user_mobile;

    user.save((err, doc) => {
        if (!err)
            res.redirect('user/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/addOredit", {
                    viewTitle: "Insert user",
                    user: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('user/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/addOredit", {
                    viewTitle: 'Update User',
                    user: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}



router.get('/list',(req,res)=>{
   
    User.find((err,docs)=>{
        if(!err){
            res.render("user/list",{
                list: docs
            });
        }else{
            console.log('Error in user list:'+err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'username':
                body['usernameError'] = err.errors[field].message;
                break;
            case 'user_mobile':
                body['user_mobileError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/addOredit", {
                viewTitle: "Update User",
                user: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});


module.exports = router;