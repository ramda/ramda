var _curry1 = require('./internal/_curry1');
var _dispatchable = require('./internal/_dispatchable');
var _eq = require('./internal/_eq');
var _xdropRepeatsWith = require('./internal/_xdropRepeatsWith');
var dropRepeatsWith = require('./dropRepeatsWith');


/**
 * Returns a new list without any consecutively repeating elements.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */
module.exports = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(_eq), dropRepeatsWith(_eq)));
