var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/',function(req,res,next) {

  // Define context for the local scope

  var context = {};
  console.log('inserting');

  // Parse values from the query

  var values = [req.query.nambo];
  console.log("values ", values);

  // Query the database

  mysql.pool.query(

  	"INSERT INTO test " +
  	"(nambo) " +
  	"VALUES (?)", 

  	values, function(err, result) {

    // For debugging

  	console.log(req.query);

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = "Inserted id " + result.insertId;
    console.log(context.results);

  });

  // Return Response to the client

  res.send();

});

module.exports = router;