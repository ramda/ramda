import _curry3 from './internal/_curry3.js';

var retry = _curry3(function retry(f, wait = 0, options) {
  var triesLeft = options && options.max ? options.max : 0;
  var tryInfinity = options.max ? false : true;

  var interval = setInterval(function() {
    var result = f();

    if (tryInfinity) {
      if (result) {
        return result;
      }
    } else {
      if (triesLeft === 0) {
        clearInterval(interval);
        return result;
      } else if (result) {
        return result;
      }
      triesLeft --;
    }
  }, wait);

});

export default retry;
