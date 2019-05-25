const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('user');
var app         =   express();
var fs=require('fs');
var multer=require('multer');
var formidable = require('formidable');
var multiparty = require('multiparty');

const bcrypt = require('bcryptjs');



// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//      cb(null, './public/uploads/');
//         },
//      filename: function (req, file, cb) {
//         var originalname = file.originalname;
//         var extension = originalname.split(".");
//         filename = Date.now() + '.' + extension[extension.length-1];
		
//         cb(null, filename);
//       }
//     });
 
//  var upload = multer({ storage : storage}).single('user_image');   
 

 

router.get('/add',(req,res)=>{
    if(req.session && req.session.user){ 
    res.render("driver/addOredit",{
        viewTitle : "Insert Driver",
        driver :''
    });
}else{
    return res.redirect('/');
}

});

 

 


router.get('/editdriver/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("driver/addOredit", {
                viewTitle: "Update User",
                driver: doc
            });
        }
    });
});

 

router.get('/list',(req,res)=>{
    console.log('eeeeeeeeeeeeeeeee');
    console.log(req.app.locals.baseurl);
    if(req.session && req.session.user){
    User.find({user_type:'driver'},(err,docs)=>{
        if(!err){
            res.render("driver/list",{
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

function add_driver(req, res, next) {
     return res.send(req.body);
}



router.post('/adddriver',function(req,res){
    console.log (req.body)
    if (!req.body._id )
    insertRecord(req, res);
    else
    updateRecord(req, res);

});
	



function insertRecord(req, res) {
	
	var form = new multiparty.Form(); 
	var d = new Date();
    var n = d.getTime();
    
    form.parse(req, function(err, fields, files) {
        req.body=fields;
        
        //return res.send(fields);

        if(files.user_image[0].originalFilename!=''){	
            console.log(64545454)
            console.log(req.app.locals.baseurl+'/uploads/'+n+files.user_image[0].originalFilename);
            var user_image=req.app.locals.baseurl+'/uploads/'+n+files.user_image[0].originalFilename;
        }else{
            var user_image= fields.update_user_image ? fields.update_user_image[0]: '';
        }

        if(files.dl_pic[0].originalFilename!=''){	
            console.log(64545454)
            console.log(req.app.locals.baseurl+'/uploads/'+n+files.dl_pic[0].originalFilename);
            var dl_pic=req.app.locals.baseurl+'/uploads/'+n+files.dl_pic[0].originalFilename;
        }else{
            var dl_pic=fields.update_dl_pic ? fields.update_dl_pic[0]:'';
        }
        
       // return res.send(files);
       
        if(fields._id && fields._id[0]!=''){           

            User.findOne({_id: fields._id[0]}, function(err, usr){
                usr.fullName = fields.fullName[0];
                usr.user_mobile = fields.user_mobile[0];  
                usr.email = fields.email[0];  
                usr.user_image= user_image;
                usr.dl_pic= dl_pic;
                usr.user_type = 'driver';     
                usr.dl_no = fields.dl_no[0];
                usr.dl_expiry= fields.dl_expiry[0];
                usr.dob= fields.dob[0];
                usr.doj= fields.doj[0];
                usr.adhaar_card= fields.adhaar_card[0];
                usr.username= fields.username[0];
                usr.permanent_address= fields.permanent_address[0];
                usr.present_address= fields.present_address[0];

                usr.save((err, doc) => {
                    if (err){console.log(err)}
                    else {
                      req.flash('info','Successfully Updated');
                      res.redirect('list');
                    }
                });
            });
        }else{
            const user = new User;
            user.fullName = fields.fullName[0];
            user.user_mobile = fields.user_mobile[0];  
            user.email = fields.email[0];  
            user.user_image= user_image;
            user.dl_pic= dl_pic;
            user.user_type = 'driver';     
            user.dl_no = fields.dl_no[0];
            user.dl_expiry= fields.dl_expiry[0];
            user.dob= fields.dob[0];
            user.doj= fields.doj[0];
            user.adhaar_card= fields.adhaar_card[0];
            user.username= fields.username[0];
            user.permanent_address= fields.permanent_address[0];
            user.present_address= fields.present_address[0];
    
            user.save((err, doc) => {
                if (err){console.log(err)}
                else {
                    req.flash('info','Successfully Created');
                    res.redirect('list');
                }
            });            
        }       

    })

    var formnew = new formidable.IncomingForm();
    formnew.parse(req);	
        

	formnew.on('fileBegin', function(field, file) {        
	console.log("picture  is Here");
	console.log(file);	
	//return res.send(file);
	//Checking File type 	
		if(file.name!=''){
			if(file.type=='image/jpeg' || file.type=='image/png'){
                console.log(__dirname);
                file.path = __dirname + '/../public/uploads/'+n+ file.name;
                	
			}else{
				req.flash('errors','Please upload a supported file.');
				return res.redirect('back');
			}	
		}
	});

}

function updateRecord(req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err){console.log(err)}
        else {
          req.flash('info','Successfully Updated');
          res.redirect('list');
        }
    });
}


router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('info','Successfully Deleted'); 
            res.redirect('/driver/list');
        }
        else { console.log('Error in customer delete :' + err); }
    });
});


module.exports = router;