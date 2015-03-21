var _curry1 = require('./_curry1');


/**
 * Create a function which takes a list
 * and determines the winning value by a comparator. Used internally
 * by `R.max` and `R.min`
 *
 * @private
 * @param {Function} compatator a function to compare two items
 * @param {*} intialVal, default value if nothing else wins
 * @category Math
 * @return {Function}
 */
module.exports = function _createMaxMin(comparator, initialVal) {
  return _curry1(function(list) {
    var idx = -1, winner = initialVal, computed;
    while (++idx < list.length) {
      computed = +list[idx];
      if (comparator(computed, winner)) {
        winner = computed;
      }
    }
    return winner;
  });
};
