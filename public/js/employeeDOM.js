function employeeDOM() {

	document.getElementById('tableForms').textContent = 'employee forms';

	var deletes = document.getElementsByClassName('deleteRow');

	for (var i = 0; i < deletes.length; i++) {
		deletes[i].action = "/delete/employee";
	}

	var refresh = new XMLHttpRequest();

	refresh.open("GET", "/select/employee", true);

	refresh.addEventListener("load", function() {

		if (refresh.status >= 200 && refresh.status < 400) {

			console.log('client-refresh employee');

			console.log(refresh.responseText);

		}

		else {

			console.log('error');

		}

	})

	refresh.send(null);
	event.preventDefault;

}