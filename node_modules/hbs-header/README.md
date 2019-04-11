# hbs-header

A Handlebars header template with login, signup, and forgot email functions

This module extends your Express app with routes and templates needed to quickly add login functionality to your app.

 - requires express-handlebars
 - requires you use Passport.JS and Express Session
 
 How to use:
 
 ```
 npm install --save hbs-header
 ```
 In your server.js or app.js:
 ```
 exphbs.create({
 ...
 ,
 partialsDir:["views/partials/","node_modules/basic-login-bar/views/partials/"],
 });
 ...
 app.title = "YOUR_PROJECT_NAME";
 app.social = false;
 app.use('/users', express.static(__dirname + '/public'));
 require('hbs-header')(app,session,passport);
 ```
 In your own templates
 ```
{{>header}}
 ```
 
 The header requires a 'title' property inputed from all your server routes. This autogenerates the title shown on the header. For example:
 
 ```
 		res.render('index.ejs', {
			title : app.title,
 ```
 You can define ```app.title``` in ```server.js/index.js``` or in ```package.json``` and require it.
 
 
