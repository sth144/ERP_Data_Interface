/* set up the DOM to interface with the product model */

function productDOM() {

	console.log('product dom');

	document.getElementById('tableForms').textContent = 'product forms';

	var deletes = document.getElementsByClassName('deleteRow');

	console.log(deletes.length);

	for (var i = 0; i < deletes.length; i++) {
		console.log('sett');
		deletes[i].onclick = function() {productDelete('tab', this)};
	}

	productRefresh();

}

function productRefresh() {
	
	var refresh = new XMLHttpRequest();

	refresh.open("GET", "/select/product", true);

	refresh.addEventListener("load", function() {

		if (refresh.status >= 200 && refresh.status < 400) {

			console.log('client-refresh product');

			console.log(refresh.responseText);

		}

		else {

			console.log('error');

		}

	})

	refresh.send(null);
	event.preventDefault;

}

function productDelete(table, currentRow) {

	var id;

	var table = document.getElementById(table);
    var rowCount = table.rows.length;
    // Iterate through each row in the table

    for (var i = 0; i < rowCount; i++) {

        // Point to one row at a time

     	var row = table.rows[i];
        console.log('row ', row);
    
    	console.log('currentRow.par.par ', currentRow.parentNode.parentNode)

        // Check if that row is equal to current row
        
        if (row == currentRow.parentNode.parentNode) {

        	console.log('match');

            // Do not let the user delete all data this way

            if (rowCount <= 1) {
                alert("Cannot delete all the rows.");
                break;
            }

            console.log('first child is ', row.firstChild.nextChild);
            id = row.firstChild.nextSibling.innerHTML;
            console.log("id is ", id);

        }

    }

	var del = new XMLHttpRequest();

	del.open("GET", "/delete/product?id=" + id, true);

	del.addEventListener("load", function() {

		if (del.status >= 200 && del.status < 400) {

			console.log('client-delete product');

			console.log(del.responseText);

		}

		else {

			console.log('error');

		}

	})

	del.send(null);
	event.preventDefault;

}