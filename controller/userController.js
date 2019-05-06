const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
const User = mongoose.model('user');
var mongoosePaginate = require('mongoose-paginate');


router.get('/',(req,res)=>{
    console.log('jjjjjjjjjj');
    if(req.session && req.session.user){  

     
    res.render("user/addOredit",{
        viewTitle : "Insert User",
        user: ''

    });
}else{
    return res.redirect('/');
}

});

router.post('/',(req,res)=>{
    if (req.body._id == ''){
        insertRecord(req, res);
       
    }else{
        updateRecord(req, res);
      
    }
   
});

function insertRecord(req, res) {
    //return res.send(req.body);
    // const salt = Bcrypt.genSaltSync(10);
    // const password = req.body.hash;

    var user = new User();
   // user._id = Date.now();
        user.username = req.body.username;
        //user.hash = Bcrypt.hashSync(password, salt)
        user.hash = req.body.password;  
        user.fullName = req.body.fullName;
        // user.lastName = req.body.lastName;
        user.user_mobile = req.body.user_mobile;
        user.user_type= req.body.user_type;

    user.save((err, doc) => {
        if (!err){
        console.log("ggggggggggggggggggggggggg")
            req.flash('info','Successfully Created');
            res.redirect('user/list');
           
            
    }else {
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
       
        if (!err){
            req.flash('info','Successfully Updated'); 
            res.redirect('user/list');
        
     
       
    }else {
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
    // console.log('hhhhhh');
    // console.log(req.session);
    if(req.session && req.session.user){
        console.log("dddddddddddddd")     
        User.find((err,doc)=>{
            if(!err){
                res.render("user/list",{
                    
                    list: doc,
                    message: req.flash('info') 
                });
            }else{
                console.log('Error in user list:'+err);
            }
        })
   
}else{
    return res.redirect('/');
}
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
            //return res.send(doc);
            res.render("user/addOredit", {
                viewTitle: "Update User",
                user: doc

            });
        }
    });
});

// router.get('/page/:page', (req, res) => {
//     // var pagina = req.params.page;
//     User.paginate({}, {page: 5, limit: 5}).then((docs) => {
//     //console.log(docs)
//     //res.render('list.ejs', docs)
//     return res.send(docs);
//    }, (e) => {
//    res.status(404)
//     });
//    });


router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Deleted'); 
            res.redirect('/user/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});


module.exports = router;