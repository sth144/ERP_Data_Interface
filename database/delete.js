var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

router.get('/', function(req, res, next) {

	var context = {};

	mysql.pool.query('DELETE FROM ' + [req.query.table] + ' WHERE `id`=?;', [req.query.id], function(err, result) {

		console.log('DELETING');
		console.log([req.query.id]);

		if (err) {
			next(err);
			return;
		}

		res.redirect('/select?table=' + [req.query.table]);

	});

});

module.exports = router;