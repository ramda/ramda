import _curry2 from './internal/_curry2';
import invoker from './invoker';
import is from './is';
import equals from './equals';


/**
 * Splits a list or string based on the given separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {String|RegExp|a} sep The pattern.
 * @param {String|[a]} iter Array or string to separate.
 * @return {Array} The array of items separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 *
 *      const arr = [0, 1, 0, 2, 0, 3]
 *
 *      R.split(0, arr); //=> [[], [1], [2], [3]]
 *
 */
var splitString = invoker(1, 'split');

var splitArray = function splitArray(sep, list) {
  var res = list.reduce(
    function(acc, item) {
      if (equals(sep)(item)) {
        acc[0].push(acc[1]);
        acc[1] = [];
      } else {
        acc[1].push(item);
      }
      return acc;
    },
    [[], []]
  );
  return res[0].concat([res[1]]);
};

export default _curry2(
  function split(sep, iter) {
    return is(String, iter) ? splitString(sep, iter) : splitArray(sep, iter);
  }
);
