var _curry3 = require('./internal/_curry3');
var _slice = require('./internal/_slice');


/**
 * Reduces a list by passing each element to the provided iterator
 * function, along with a thunk (zero arity function) that evaluates
 * to the accumulated result of reducing all elements to the right of
 * the current element.
 *
 * This function operates in a similar manner to `R.reduceRight`, with
 * the exception that the accumulated value is evaluated lazily, such
 * that the iterator function must execute the thunk to get access to
 * the value. If the iterator chooses to not evaluate the thunk, this
 * function will short circuit and return the current value without
 * iterating over the entire list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig ((() -> b, a) -> b) -> b -> List[a] -> b
 * @param {Function} fn The iterator function. Receives two values,
 *        a thunk (zero arity function) that evaluates the accumulated
 *        value and the current element from the array.
 * @param {*} acc The initial accumulated value.
 * @param {Array} list The list to reduce
 * @return {*} The final accumulated value
 * @see R.reduceRight
 * @example
 *
 *      function exists(p, list) {
 *        return R.reduceRightLazy(function(acc, a) {
 *          return p(a) || acc();
 *        }, false, list);
 *      }
 *
 *      exists(R.eq(4), [2,4,6,8]); //=> true
 */
module.exports = _curry3(function reduceRightLazy(fn, acc, list) {
  return list.length === 0 ? acc : fn(
    function() { return reduceRightLazy(fn, acc, _slice(list, 1)); },
    list[0]
  );
});
