import _curry3 from './internal/_curry3.js';

var retry = _curry3(function retry(f, wait, options) {
  var triesLeft = options && options.max ? options.max : 0;
  var tryInfinity = options && options.max ? false : true;

  return new Promise(function(resolve, reject) {
    var interval = setInterval(function() {
      var result = f();

      if (tryInfinity) {
        if (result) {
          clearInterval(interval);
          resolve(result);
        }
      } else {
        if (triesLeft === 0 || result) {
          // Result is true or no try left
          clearInterval(interval);
          resolve(result);
        }
        triesLeft = triesLeft - 1;
      }
    }, wait);
  });
});

export default retry;
