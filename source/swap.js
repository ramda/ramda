import _curry3 from './internal/_curry3.js';
import _isArray from './internal/_isArray.js';
import _isString from './internal/_isString.js';
import clone from './clone.js';

var swapObject = function(indexA, indexB, o) {
  var copy = clone(o);

  var properties = Object.getOwnPropertyNames(copy);
  if (properties.includes(indexA) && properties.includes(indexB)) {
    var tmp = copy[indexA];

    copy[indexA] = copy[indexB];
    copy[indexB] = tmp;
  }

  return copy;
};

var swapList = function(indexA, indexB, list) {
  var length = list.length;
  var result = list.slice();

  var positiveIndexA = indexA < 0 ? length + indexA : indexA;
  var positiveIndexB = indexB < 0 ? length + indexB : indexB;

  var positiveMin = Math.min(positiveIndexA, positiveIndexB);
  var positiveMax = Math.max(positiveIndexA, positiveIndexB);

  if (positiveIndexA < 0 || positiveIndexA > length) {return result;}
  if (positiveIndexB < 0 || positiveIndexB > length) {return result;}
  if (positiveIndexA === positiveIndexB) {return result;}

  result = []
    .concat(result.slice(0, positiveMin))
    .concat(result[positiveMax])
    .concat(result.slice(positiveMin + 1, positiveMax))
    .concat(result[positiveMin])
    .concat(result.slice(positiveMax + 1, length));

  return result;
};

var swapString = function(indexA, indexB, s) {
  var result = swapList(indexA, indexB, s);
  return _isArray(result)
    ? result.join('')
    : result;
};

/**
 * Swap an item, at index `indexA` with another item, at index `indexB`, in an object or a list of elements.
 * A new result will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.29.0
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number|string|Object} indexA The first index
 * @param {Number|string|Object} indexB The second index
 * @param {Array|Object} o Either the object or list which will serve to realise the swap
 * @return {Array|Object} The new object or list reordered
 * @example
 *
 *      R.swap(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['c', 'b', 'a', 'd', 'e', 'f']
 *      R.swap(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'b', 'c', 'd', 'e', 'a'] list rotation
 *      R.swap('a', 'b', {a: 1, b: 2}); //=> {a: 2, b: 2}
 *      R.swap(0, 2, 'foo'); //=> 'oof'
 */
var swap = _curry3(function(indexA, indexB, o) {
  if (_isArray(o)) {
    return swapList(indexA, indexB, o);
  } else if (_isString(o)) {
    return swapString(indexA, indexB, o);
  } else {
    return swapObject(indexA, indexB, o);
  }
});

export default swap;
