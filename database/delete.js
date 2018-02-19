var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(req, res, next) {

  	// Define context for the local scope

	var context = {};

  	// Query the database

	mysql.pool.query("DELETE FROM `test` WHERE `id`=?;", [req.query.id], function(err, result) {

		console.log('DELETING');
		console.log([req.query.id]);

    	// Error handling

		if (err) {
			next(err);
			return;
		}

    	// Return response to the client

		res.redirect('/');

	});

});

router.get('/product', function(req, res, next) {

	var context = {};

	mysql.pool.query("DELETE FROM product WHERE `id`=?;", [req.query.id], function(err, result) {

		console.log('DELETING');
		console.log([req.query.id]);

		if (err) {
			next(err);
			return;
		}

		res.redirect('/select/product');

	});

});

router.get('/employee', function(req, res, next) {

	var context = {};

	mysql.pool.query("DELETE FROM employee WHERE `id`=?;", [req.query.id], function(err, result) {

		console.log('DELETING');
		console.log([req.query.id]);

		if (err) {
			next(err);
			return;
		}

		res.redirect('/select/employee');

	});

});

module.exports = router;