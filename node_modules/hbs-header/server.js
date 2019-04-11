module.exports = function(input_app,input_session,passport){
// server.js
// set up ======================================================================
// get all the tools we need
var app      = input_app;
var session = input_session;

// set up statics
var express  = require('express');
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

var flash    = require('connect-flash');
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/acct-manage/loginLogout.js')(app, passport); // load basic login logout routes
require('./app/acct-manage/passForget.js')(app); // load password forgot functionality
// no launch, this just connects stuff ======================================================================
};