var _contains = require('./internal/_contains');
var _curry1 = require('./internal/_curry1');
var equals = require('./equals');
var uniqWith = require('./uniqWith');


/**
 * Returns a new list containing only one copy of each element in the original list.
 * `R.equals` is used to determine equality.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */
module.exports = (function() {
  /**
   * Uses a native `Set` instance where possible for
   * removing duplicate items. Items that implement
   * the fantasy-land Setoid spec fallback to using
   * `_contains` to support custom equality behaviour.
   */
  function uniq(list) {
    /* global Set */
    var item,
        set = new Set(),
        idx = 0,
        len = list.length,
        items = [],
        uniqs = [];

    while (idx < len) {
      item = list[idx];
      // `_contains` is also used to differentiate between
      // +0 and -0, as the native Set does not.
      if (item === 0 || (item != null && typeof item.equals === 'function')) {
        if (!_contains(item, items)) {
          items.push(item);
          uniqs.push(item);
        }
      } else {
        if (set.size !== set.add(item).size) {
          uniqs.push(item);
        }
      }
      idx += 1;
    }
    return uniqs;
  }

  return typeof Set !== 'function' ? uniqWith(equals) : _curry1(uniq);
})();
