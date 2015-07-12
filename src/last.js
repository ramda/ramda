var nth = require('./nth');


/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.init, R.head, R.tail
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */
module.exports = nth(-1);
