import _curry3 from './internal/_curry3';

/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, [8, 6, 7, 5, 3, 0, 9]); //=> [ 6, 7, 8, 5, 3, 0, 9 ]
 *      R.move(-1, 0, [8, 6, 7, 5, 3, 0, 9]); //=> [ 6, 7, 5, 3, 0, 9, 8 ] list rotation
 */
var move = _curry3(function(from, to, list) {
  var result = list.slice();
  var item = result.splice(from, 1);

  return []
    .concat(result.slice(0, to))
    .concat(item)
    .concat(result.slice(to, list.length));
});

export default move;
