import _curry3 from './internal/_curry3.js';

/**
 * retry function attempts to get a true response from the function at most N times.
 *
 * @func
 * @memberOf R
 * @param {Function} fn: The function to invoke. It should return a true or false.
 * @param {Number} wait: The number of milliseconds to delay.
 * @param {Object} options: Optional Options.
 *   @property {Number} options.max: With optional option `max` -> define the maximum number of times to invoke the function to get a success response.
 *   If null it will retry forever.
 * @example
 * let f = () => {
 *   let d = new Date(); // current time
 *   return d.getMilliseconds() % 2 == 0; // => true or false
 * };
 * R.retry(f, 1000, {max: 3}); // =>  true or false after max of 3 times
 */
var retry = _curry3(function(fn, wait = 0, { max = Infinity }) {
  var maxTryTimes = max;
  var promise = function() {
    return new Promise(function(resolve) {
      maxTryTimes -= 1;
      setTimeout(function() {
        resolve(fn());
      }, wait);
    })
      .then(function(value) {
        if (value || !maxTryTimes) {
          return Promise.resolve(value);
        } else {
          return promise();
        }
      });
  };
  return promise();
});

export default retry;
