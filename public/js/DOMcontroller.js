

document.body.onload = function() {

	var model = document.getElementById('model-header').textContent;

	console.log('model is');
	console.log(model);

	switch (model) {
		case '': document.getElementById('model-header').textContent = 'product';
					productDOM(); break;
		case 'product': productDOM(); break;
		case 'employee': employeeDOM(); break;
	}

}