/**
 * Create a function which takes a comparator function and a list
 * and determines the winning value by a compatator. Used internally
 * by `R.maxBy` and `R.minBy`
 *
 * @private
 * @param {Function} compatator a function to compare two items
 * @category Math
 * @return {Function}
 */
module.exports = function _createMaxMinBy(comparator) {
  return function(valueComputer, list) {
    if (!(list && list.length > 0)) {
      return;
    }
    var idx = 0;
    var winner = list[idx];
    var computedWinner = valueComputer(winner);
    var computedCurrent;
    while (++idx < list.length) {
      computedCurrent = valueComputer(list[idx]);
      if (comparator(computedCurrent, computedWinner)) {
        computedWinner = computedCurrent;
        winner = list[idx];
      }
    }
    return winner;
  };
};
