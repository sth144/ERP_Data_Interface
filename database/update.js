/***************************************************************************************************
  Title: SQL Update Router for bioERP Data Interface
  Author: Sean Hinds  
  Date: 03/13/18
  Description: This router provides the user-driven data update functionality. Uses a nested query
                to safely update a row in the SQL table.
***************************************************************************************************/

var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */
var mysql = require('./dbConfig');
var pool = mysql.pool;

/* import model meta-data */
var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

/*  Safe update route updates a row in the table */

router.get('/',function(req,res,next) {

  var model = [req.query.table];
  console.log('model is ' + model)

  /* Define context for the local scope */

  console.log('safe update! server');
  var context = {};

  /* Query the database */

  mysql.pool.query('SELECT * FROM ' + model + ' WHERE id=?', [req.query.id], function(err, result) {

    // Error handling
    if(err){
      next(err);
      return;
    }

    // Only query with one id parameter
    if(result.length == 1) {

      /* Declare a variable to store the id of the row being altered */
      var curVals = result[0];

      var queryString = "SET ";
      var queryArr = [];

      /* build queryString */
      for (var i = 1; i < modelsObj[model]['SQLcols'].length; i++) {
          queryString += modelsObj[model]['SQLcols'][i];
          if (i < modelsObj[model]['SQLcols'].length - 1) {
            queryString += "=?, "
          } else {
            queryString += "=? ";
          }
      }
      queryString += "WHERE id=? ";

      /* build queryArr */
      for (var i = 0; i < modelsObj[model]['fieldNames'].length - 1; i++) {
          var curAttr = modelsObj[model]['fieldNames'][i + 1];
          queryArr[i] = req.query[curAttr] || curVals[curAttr];
      }
      queryArr[queryArr.length] = req.query['id'];

      console.log(queryString);
      console.log(queryArr);

      /* Query the database */
      mysql.pool.query("UPDATE " + model + " " + 
        queryString,
        queryArr,

        function(err, result){

        // Error handling
        if(err){
          next(err);
          return;
        }

        // Process data and render table
        context.results = "Updated " + result.changedRows + " rows.";
        console.log(context.results);

      });

    }

  });

  // Return response to the client
  res.send();

});

/* export the router */
module.exports = router;