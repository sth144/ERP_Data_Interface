/***************************************************************************************************
  Title: ModelsObj Object Definition
  Author: Sean Hinds  
  Date: 03/13/18
  Description: Attribute definitions for the ModelsObj object, which holds all meta-data necessary
                for the bioERP Node.js application to query the MySQL database. 
***************************************************************************************************/

/* each property has 4 properties. DOM specifies the functions to be called by the controller on
    the client machine when the page loads, colheaders specifies the column headers to be displayed
    in the browser. SQLcols specifies the column names of the table in the SQL database. 
    insertStrings are passed to the query handler to query the database using user input */


var modelsObj = {
  product: {
    DOM: ['insertForm', 'makeEditable', 'searchBar', 'exportDataButton'],
    colHeaders: ['id', 'name', 'unit', 'shelf life', 'supplier', 'country', 'lead time'],
    SQLcols: ['id', 'name', 'unit', 'shelf_life', 'supplier', 'country', 'lead_time'],
    insertStrings: [
      "(name, unit, shelf_life, supplier, country, lead_time) ", 
      "(?, ?, ?, ?, ?, ?)",
    ]
  },
  batch: {
    DOM: ['insertForm', 'makeEditable', 'searchBar', 'exportDataButton'],
    colHeaders: ['id', 'part_no', 'expiration'],
    SQLcols: ['id', 'part_no', 'expiration'],
    insertStrings: [
      "(part_no, expiration) ", 
      "(?, ?)",
    ]
  },
  employee: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'fname', 'lname', 'supervisor', 'department'],
    SQLcols: ['id', 'fname', 'lname', 'supervisor', 'department'],
    insertStrings: [
      "(fname, lname, supervisor, department) ",
      "(?, ?, ?, ?)"
    ]
  },
  equipment: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'operators required', 'manufacturer', 'service interval', 'service contact'],
    SQLcols: ['id', 'name', 'operators_required', 'manufacturer', 'service_interval', 'service_contact'],
    insertStrings: [
      "(name, operators_required, manufacturer, service_interval, service_contact)",
      "(?, ?, ?, ?, ?)"
    ]
  },
  customer: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'contact'],
    SQLcols: ['id', 'name', 'contact'],
    insertStrings: [
      "(name, contact)",
      "(?, ?)"
    ]
  },
  experiment: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'date', 'notes'],
    SQLcols: ['id', 'date', 'notes'],
    insertStrings: [
      "(date, notes)",
      "(?, ?)"
    ]
  },
  made_from: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'parent', 'child'],
    SQLcols: ['id', 'parent', 'child'],
    insertStrings: [
      "(parent, child)",
      "(?, ?)"
    ]
  },
  authorization: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'employee id', 'equipment id'],
    SQLcols: ['id', 'employee_id', 'equipment_id'],
    insertStrings: [
      "(employee_id, equipment_id)",
      "(?, ?)"
    ]
  },
  purchase: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'customer id', 'product id', 'amount', 'date'],
    SQLcols: ['id', 'customer_id', 'product_id', 'amount', 'date'],
    insertStrings: [
      "(customer_id, product_id, amount, date)",
      "(?, ?, ?, ?)"
    ]
  },
  experiment_product: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'experiment id', 'product id'],
    SQLcols: ['id', 'experiment_id', 'product_id'],
    insertStrings: [
      "(experiment_id, product_id)",
      "(?, ?)"
    ]
  },
  experiment_employee: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'experiment id', 'employee id'],
    SQLcols: ['id', 'experiment_id', 'employee_id'],
    insertStrings: [
      "(experiment_id, employee_id)",
      "(?, ?)"
    ]
  } 
};

module.exports.modelsObj = modelsObj