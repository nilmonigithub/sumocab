const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
var fs=require('fs');
var multer=require('multer');


// var storage = multer.diskStorage({
//     destination: 'public/uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
//     }
//   })

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
    

router.get('/',(req,res)=>{
    if(req.session && req.session.user){ 
    res.render("driver/addOredit",{
        viewTitle : "Insert Driver"
    });
}else{
    return res.redirect('/');
}

});

router.get('/list',(req,res)=>{
    if(req.session && req.session.user){
    Driver.find((err,docs)=>{
        if(!err){
            res.render("driver/list",{
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

router.post('/', multer({storage: storage, dest: './public/uploads/'}).single('image'),(req,res)=>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
   
});

function insertRecord(req, res) {
    //return res.send(req.body);
    // const salt = Bcrypt.genSaltSync(10);
    // const password = req.body.hash;

    var driver = new Driver();
    
        driver.name = req.body.name;
        driver.mobile = req.body.mobile;  
        driver.email = req.body.email;
        driver.image = fs.readFileSync.filename;
       // return res.send(fs.readFileSync.filename);
        //driver.image.data = fs.readFileSync(imgPath);
        // driver.image.contentType = 'image/png';
        
        driver.dl_no = req.body.dl_no;
        driver.dl_expiry= req.body.dl_expiry;
        driver.dob= req.body.dob;
        driver.doj= req.body.doj;
        driver.adhaar_card= req.body.adhaar_card;
        driver.permanent_address= req.body.permanent_address;
        driver.present_address= req.body.present_address;

        driver.save((err, doc) => {
        // if (!err)
        //     res.redirect('driver/list');
        // else {
        //     if (err.name == 'ValidationError') {
        //         handleValidationError(err, req.body);
        //         res.render("driver/addOredit", {
        //             viewTitle: "Insert user",
        //             user: req.body
        //         });
        //     }
        //     else
        //         console.log('Error during record insertion : ' + err);
        // }
        if (err){console.log(err)}
    else {
      res.redirect('driver/list');
    }
    });
}

function updateRecord(req, res) {
    Driver.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('driver/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("driver/addOredit", {
                    viewTitle: 'Update Driver',
                    driver: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}





// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'username':
//                 body['usernameError'] = err.errors[field].message;
//                 break;
//             case 'user_mobile':
//                 body['user_mobileError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// router.get('/:id', (req, res) => {
//     User.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("user/addOredit", {
//                 viewTitle: "Update User",
//                 user: doc
//             });
//         }
//     });
// });

router.get('/delete/:id', (req, res) => {
    Driver.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/driver/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});


module.exports = router;