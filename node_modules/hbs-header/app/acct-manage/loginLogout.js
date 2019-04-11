var path = require('path');

// app/acct-manage/loginLogout.js
module.exports = function(app, passport) {
	

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/users/login', loginRedundancy, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render(path.join(__dirname, "../../views")+'/acct-manage/login', { title : app.title, social : app.social, user : req.user, message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/users/login', loginRedundancy, passport.authenticate('local-login', {
        successRedirect : '/', // redirect to home page with logged in status
        failureRedirect : '/users/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/users/signup', loginRedundancy, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render(path.join(__dirname, "../../views")+'/acct-manage/signup', { title : app.title, social : app.social, user : req.user, message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/users/signup', loginRedundancy, passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to home page with logged in status
        failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================//DROPPED/ USE FOR OPTIONS
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/users/profile', isLoggedIn, function(req, res) {
        res.render(path.join(__dirname, "../../views")+'/acct-manage/profile', {
			title : app.title,
			social : app.social,
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/users/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
// prevent logged in folks from signing up/logging in again
function loginRedundancy(req, res, next) {
    if (req.isAuthenticated())
       res.redirect('/');
	else
		return next();
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};