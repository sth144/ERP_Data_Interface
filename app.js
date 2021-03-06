/**************************************************************************************************************************
	Title: ERP Data Interface App Index
	Author: Sean Hinds
	Date: 02/17/18
	Description: This node.js index provides the basic execution structure for the node express handlebars templating
			engine and MySQL database for the ERP Data Interface Application
**************************************************************************************************************************/

/* dotenv package enables environment variables to hide sensitive information from GitHub */

require('dotenv').config()

console.log(process.env.SECRET_MESSAGE);
console.log(process.env.TOKEN);

/* import express and store in a variable. Store express.express() in app variable */

var express = require('express');
var app = express();

/* app will search for all static files in 'public/' */

app.use(express.static(__dirname + '/public'));
app.use('/select', express.static(__dirname + '/public'));
app.use('/data', express.static(__dirname + '/public'));
app.use('/insert', express.static(__dirname + '/public'));
app.use('/delete', express.static(__dirname + '/public'));
app.use('/update', express.static(__dirname + '/public'));

/* set connection pool variable, import database router .js file */

var data = require('./database/database');
app.use('/data', data);

var dbdelete = require('./database/delete');
var dbinsert = require('./database/insert');
var dbselect = require('./database/select');
var dbupdate = require('./database/update');

app.use('/delete', dbdelete);
app.use('/insert', dbinsert);
app.use('/select', dbselect);
app.use('/update', dbupdate);

/* for handling POST requests */ 

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

/* default layout is main.hbs */

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

/* to run server locally in development environment, use port 5000 */

app.set('port', (process.env.PORT || 5000));

/* set views directory */

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* if no url appendage, render home page */

app.get('/', function(request, response) {

    context = {};

    response.render('intro', context);

	/* response.redirect('/data'); */

});

app.get('/about', function(request, response) {

    context = {};

    response.render('about', context);

});

app.get('/contact', function(request, response) {

    context = {};

    response.render('contact', context);

});

/* render the 404 resource not found page */

app.use(function(request, response) {
    response.status(404);
    response.render('404');
});


/* render the 500 page for server errors */

app.use(function(err, request, response, next) {
    console.error(err.stack);
    response.type('plain/text');
    response.status(500);
    response.render('500');
});

/* listen from port. display a string on the node console to verify that the app server is running */

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
