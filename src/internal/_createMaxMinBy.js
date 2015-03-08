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
        var winner = list[0],
            computedWinner = valueComputer(winner),
            computedCurrent;
        for (var idx = 1, len = list.length; idx < len; idx += 1) {
            computedCurrent = valueComputer(list[idx]);
            if (comparator(computedCurrent, computedWinner)) {
                computedWinner = computedCurrent;
                winner = list[idx];
            }
        }
        return winner;
    };
};
