var _noArgsException = require('./_noArgsException');


/**
 * Create a function which takes a a list
 * and determines the winning value by a compatator. Used internally
 * by `R.max` and `R.min`
 *
 * @private
 * @param {Function} compatator a function to compare two items
 * @param {*} intialVal, default value if nothing else wins
 * @category Math
 * @return {Function}
 */
module.exports = function _createMaxMin(comparator, initialVal) {
    return function(list) {
        if (arguments.length === 0) {
            throw _noArgsException();
        }
        var idx = -1, winner = initialVal, computed;
        while (++idx < list.length) {
            computed = +list[idx];
            if (comparator(computed, winner)) {
                winner = computed;
            }
        }
        return winner;
    };
};
