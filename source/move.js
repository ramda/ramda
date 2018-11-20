import _curry3 from './internal/_curry3';
import max from './max';
import min from './min';

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
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */
var move = _curry3(function(from, to, list) {
  var length = list.length;
  var positiveFrom = from < 0 ? max(length + from, 0) : min(length - 1, from);
  var positiveTo =   to   < 0 ? max(length + to, 0)   : min(length - 1, to);
  var result = list.slice();
  var item = result.splice(positiveFrom, 1);

  return positiveFrom < 0 || positiveFrom >= length
      || positiveTo   < 0 || positiveTo   >= length
    ? list
    : []
      .concat(result.slice(0, positiveTo))
      .concat(item)
      .concat(result.slice(positiveTo, length));
});

export default move;
