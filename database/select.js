/***************************************************************************************************
  Title: Select Router for bioERP Data Interface
  Author: Sean HInds
  Date: 03/13/18
  Description: This router will be used for the table search functionality.
***************************************************************************************************/

var express = require('express');
var router = express.Router();
var path = require('path');

/* import MySQL database credentials from dbConfig, which uses environment variables */
var mysql = require('./dbConfig');
var pool = mysql.pool;

/* import the models object to allow querying of different tables using meta-data */
var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

/* generic router */

router.get('/', function(req, res, next) {
  
  console.log([req.query])
  var context = {};
  
  /* grab the model */
  context.model = [req.query.table]

  /* construct query strings */
  var selectString = ""; var selectString2 = "";
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    selectString += modelsObj[context.model]['SQLcols'][i];
    if (i < modelsObj[context.model]['SQLcols'].length - 1) {
      selectString += ", ";
    } else { selectString += " "; }
  }

  /* determine if the query has a where clause, and which columns will be selected */
  var filterRows = false;
  var columnsFiltered = []
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    if ( [req.query][0].hasOwnProperty(modelsObj[context.model]['SQLcols'][i]) &&
          [req.query][0][modelsObj[context.model]['SQLcols'][i]] != '') {
      filterRows = true;
      columnsFiltered.push(i);
    }
  }
  /* construct where clause */
  if (filterRows) {
    selectString2 += " WHERE ";
    for (var i = 0; i < columnsFiltered.length; i++) {
      selectString2 += modelsObj[context.model]['SQLcols'][columnsFiltered[i]];
      selectString2 += "='";
      selectString2 += [req.query][0][modelsObj[context.model]['SQLcols'][columnsFiltered[i]]];
      selectString2 += "'";
      if (i < columnsFiltered.length - 1) {
        selectString2 += " AND "
      }
    }
  }
  console.log('select strings ' + selectString + ' and ' + selectString2);
  
  /* execute the query */
  mysql.pool.query(
    "SELECT " + selectString +
    "FROM " + context.model + 
    selectString2 +
    ";", 
    function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      console.log('generic send refresh select');
      res.send(context);
    } 
  )
});

/* export the router */

module.exports = router;
