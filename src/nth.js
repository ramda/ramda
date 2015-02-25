var _curry2 = require('./internal/_curry2');
var _nth = require('./internal/_nth');


/**
 * Returns the nth element in a list.
 * If n is negative the element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> a
 * @param {Number} idx
 * @param {Array} list
 * @return {*} The nth element of the list.
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 */
module.exports = _curry2(_nth);
