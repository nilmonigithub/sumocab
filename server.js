require('./model/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const hbsheader = require('hbs-header');



const userController = require('./controller/userController');



var app = express();
app.use(bodyparser.urlencoded({
    extended : true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout', layoutsDir:__dirname+'/views/layouts/',
partialsDir  : [
    //  path to  partial
    path.join(__dirname, 'views/partials'),
]
}));
app.set('view engine','hbs');



app.listen(3000,()=>{
console.log('Express server started at port :3000');
});

app.use('/user',userController);