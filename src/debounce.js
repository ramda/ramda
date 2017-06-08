var _curry3 = require('./internal/_curry3');
/**
 * Returns a function which delays executing `func` util after await.
 * see: https://css-tricks.com/debouncing-throttling-explained-examples/
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> a) -> (a -> a)
 * @param {Function} fn The function to debounce.
 * @param {Number} wait The number of milliseconds to delay.
 * @param {Boolean} immidiate Invoke the `func` by leading edge instead of trailing.
 * @return {Function} A debounced function.
 * @example
 *
 *    window.addEventListener('resize', R.debounce(function(e) {
 *      console.log('resize handled');
 *    }))
 */
module.exports = _curry3(function debounce(fn, wait, immidiate) {
  var timerId = null;

  function debounced() {
    var args = arguments;

    timerId && clearTimeout(timerId);


    if (immidiate) {
      fn.apply(null, args);
    }

    timerId = setTimeout(function timeout() {
      timerId = null;

      if (!immidiate) {
        fn.apply(null, args);
      }

    }, wait);
  }

  debounced.clear = function() {
    timerId && clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
});
