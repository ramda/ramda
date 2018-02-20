import _concat from './internal/_concat';
import _curry2 from './internal/_curry2';
import _isString from './internal/_isString';


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * When string is passed as second arguments,
 * appends first argument to it instead.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @sig String -> String -> String
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 *      R.append('bar', 'foo') //=> 'foobar'
 */
var append = _curry2(function append(el, list) {
  if (_isString(list)) {
    return list + el;
  }
  return _concat(list, [el]);
});
export default append;
