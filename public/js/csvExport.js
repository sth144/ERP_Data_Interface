function csvExport() {

  console.log('export');
  
  var text = "";

  /* Target table */
  var tab = document.getElementById('tab');

  // Iterate through rows in the table
  for (var j = 0; j < tab.rows.length; j++) {

    var row = tab.rows[j];
    var children = row.getElementsByTagName('td') || row.getElementsByTagName('th');

    if (row.style.display != 'none') {
      // Iterate through each data elemet in the row
      for (var i = 0; i < children.length - 2; i++) {

        // Add inner HTML of element to text variable
        text += children[i].innerHTML + ',';

      }

      // Next row
      text += "\n";
    }

  }

  // Create a temporary element
  var element = document.createElement('a');

  // Set the element to download a .csv file encoded using text
  element.setAttribute('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'export.csv');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}
