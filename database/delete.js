var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(req, res, next) {

  	// Define context for the local scope

	var context = {};

  	// Query the database

	mysql.pool.query("DELETE FROM test WHERE id=?", [req.query.id], function(err, result) {

		console.log('DELETING');

    	// Error handling

		if (err) {
			next(err);
			return;
		}

    	// Return response to the client

		res.send();

	});

});

module.exports = router;