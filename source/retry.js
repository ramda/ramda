import _curry3 from './internal/_curry3.js';


var retry = _curry3(function retry (func, wait, options) {
	// set number of tries if it exists
	if (options && options.max) {
		var numTries = options.max;
		var tryForever = false;
	} else {
		var numTries = 0;
		var tryForever = true;
	}

	return new Promise(function(resolve, reject) {
		var intervalHandler = setInterval(function() {
			var funcOutput = func();

			if (funcOutput || (numTries === 0 && tryForever === false)) {
					clearInterval(intervalHandler);
					resolve(funcOutput);
			} else {
				numTries = numTries - 1;
			}
		}, wait);
	});
});

export default retry;
