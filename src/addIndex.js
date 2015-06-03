var _concat = require('./internal/_concat');
var _curry1 = require('./internal/_curry1');
var _prepend = require('./internal/_prepend');
var _slice = require('./internal/_slice');
var curryMinMax = require('./curryMinMax');


/**
 * Creates a new list iteration function from an existing one by adding two new parameters
 * to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, Ramda's simple `map` function into one that more closely
 * resembles `Array.prototype.map`.  Note that this will only work for functions in which
 * the iteration callback function is the first parameter, and where the list is the last
 * parameter.  (This latter might be unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index/list to its callback
 * @return An altered list iteration function thats passes index/list to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed(function(val, idx) {return idx + '-' + val;}, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
module.exports = _curry1(function(fn) {
  return curryMinMax(fn.length, fn.length, function() {
    var idx = -1;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var indexedFn = function() {return origFn.apply(this, _concat(arguments, [++idx, list]));};

    return fn.apply(this, _prepend(indexedFn, _slice(arguments, 1)));
  });
});
