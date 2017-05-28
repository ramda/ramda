var _arrayChainRec = require('./internal/_arrayChainRec');
var _curry3 = require('./internal/_curry3');


/**
 * `chainRec` does stack safe recursion on list
 *
 * Dispatches to the `chainRec` method of first argument, if present,
 * according to the [FantasyLand ChainRec spec](https://github.com/fantasyland/fantasy-land#chainrec).
 *
 * @func
 * @memberOf R
 * @category List
 * @sig ChainRec m => m -> ((a -> c, b -> c, a) -> m c) -> a -> m b
 * @param {ChainRec} object or type which is ChainRec
 * @param {Function} fn The function to compute next step of recursion
 * @param {Any} initial value for computation
 * @return {Array} The result of recursive computation
 * @example
 *
 *      R.chainRec(Array, (next, done, a) => (
 *        a.length == 2 ? [a + '!', a + '?'].map(done)
 *                      : [a + 'a', a + 'b'].map(next)
 *      ), ''); // [ 'aa!', 'aa?', 'ab!', 'ab?', 'ba!', 'ba?', 'bb!', 'bb?' ]
 *
 */
module.exports = _curry3(function _chainRec(chainRec, fn, i) {
  if (typeof chainRec['fantasy-land/chainRec'] === 'function') {
    return chainRec['fantasy-land/chainRec'](fn, i);
  } else if (chainRec.constructor != null && typeof chainRec.constructor['fantasy-land/chainRec'] === 'function') {
    return chainRec.constructor['fantasy-land/chainRec'](fn, i);
  } else {
    return _arrayChainRec(fn, i);
  }
});
