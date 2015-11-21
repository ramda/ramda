var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. `R.equals` is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
module.exports = _curry2(/* globals Set */ typeof Set === 'undefined' ?
  function uniqBy(fn, list) {
    var idx = 0;
    var applied = [];
    var result = [];
    var appliedItem, item;
    while (idx < list.length) {
      item = list[idx];
      appliedItem = fn(item);
      if (!_contains(appliedItem, applied)) {
        result.push(item);
        applied.push(appliedItem);
      }
      idx += 1;
    }
    return result;
  } :
  function uniqBySet(fn, list) {
    var set           = new Set();
    var applied       = [];
    var prevSetSize   = 0;
    var result        = [];
    var nullExists    = false;
    var negZeroExists = false;
    var idx           = 0;
    var appliedItem, item, newSetSize;

    while (idx < list.length) {
      item = list[idx];
      appliedItem = fn(item);
      switch (typeof appliedItem) {
        case 'number':
          // distinguishing between +0 and -0 is not supported by Set
          if (appliedItem === 0 && !negZeroExists && 1 / appliedItem === -Infinity) {
            negZeroExists = true;
            result.push(item);
            break;
          }
        /* falls through */
        case 'string':
        case 'boolean':
        case 'function':
        case 'undefined':
          // these types can all utilise Set
          set.add(appliedItem);
          newSetSize = set.size;
          if (newSetSize > prevSetSize) {
            result.push(item);
            prevSetSize = newSetSize;
          }
          break;
        case 'object':
          if (appliedItem === null) {
            if (!nullExists) {
              // prevent scan for null by tracking as a boolean
              nullExists = true;
              result.push(null);
            }
            break;
          }
        /* falls through */
        default:
          // scan through all previously applied items
          if (!_contains(appliedItem, applied)) {
            applied.push(appliedItem);
            result.push(item);
          }
      }
      idx += 1;
    }
    return result;
  }
);
