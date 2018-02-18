var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

/******************************************************************************************************************
  Safe update route updates a row in the table
******************************************************************************************************************/

router.get('/safe-update',function(req,res,next) {

  // Define context for the local scope

console.log('safe update server');
  var context = {};

  // Query the database

  mysql.pool.query("SELECT * FROM exercises WHERE id=?", [req.query.id], function(err, result) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Only query with one id parameter

    if(result.length == 1) {

      // Declare a variable to store the id of the row being altered

      var curVals = result[0];

      // Query the database

      mysql.pool.query("UPDATE test SET nambo=? WHERE id=? ",
        [req.query.nambo || curVals.nambo],
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

module.exports = router;