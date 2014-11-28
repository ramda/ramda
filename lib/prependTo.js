var _prepend = require('./_prepend');
var flip = require('./flip');


/**
 * Flipped version of R.prepend.
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig [a] -> a -> [a]
 * @param {Array} list
 * @param {*} el
 * @return {Array}
 * @example
 *
 *      R.prependTo(['fi', 'fo', 'fum'], 'fee'); //=> ['fee', 'fi', 'fo', 'fum']
 */
module.exports = flip(_prepend);
