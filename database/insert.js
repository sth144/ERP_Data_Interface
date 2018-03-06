var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

router.get('/',function(req,res,next) {

  // Define context for the local scope

  var context = {};
  console.log('inserting');

  // Parse values from the query

  console.log("query is " + JSON.stringify(req.query));
  var q = JSON.parse(JSON.stringify(req.query));
  console.log(q);
  var values = [];
  for (var i = 1; i < (modelsObj[q['tableName']]['SQLcols']).length; i++) {
    values.push(q[modelsObj[q['tableName']]['SQLcols'][i]]);
  }
  console.log("values " + values);

  // Query the database

  mysql.pool.query(

    "INSERT INTO " + q['tableName'] +
    modelsObj[q['tableName']]['insertStrings'][0] +
    "VALUES " +
    modelsObj[q['tableName']]['insertStrings'][1],
    values, 

    function(err, result) {

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
    // Return Response to the client
    console.log('sending response');
    res.send();

  });



  //res.redirect('/select/product');

});

module.exports = router;

