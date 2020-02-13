import nth from './nth';


/**
 * Returns the first element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.first(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.first([]); //=> undefined
 *
 *      R.first('abc'); //=> 'a'
 *      R.first(''); //=> ''
 */
var first = nth(0);
export default first;
