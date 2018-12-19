import _curry3 from './internal/_curry3';
import curryN from './curryN';


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate returned as a promise.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 * const createUser = R.ifElseP(
 *   db.isExistUser,
 *   db.createUser,
 *   raiseError('existUser’)
 * )
 *
 */
var ifElseP = _curry3(function ifElseP(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
    function _ifElseP() {
      return condition.apply(this, arguments).then(function(p) {
        return p ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
      });
    }
  );
});
export default ifElseP;
