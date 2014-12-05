var _append = require('./internal/_append');
var _curry2 = require('./internal/_curry2');
var _foldl = require('./internal/_foldl');


/**
 * Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function
 * on each element, and grouping the results according to values returned.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> s) -> [a] -> {s: a}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @example
 *
 *     var byGrade = R.groupBy(function(student) {
 *       var score = student.score;
 *       return (score < 65) ? 'F' : (score < 70) ? 'D' :
 *              (score < 80) ? 'C' : (score < 90) ? 'B' : 'A';
 *     });
 *     var students = [{name: 'Abby', score: 84},
 *                     {name: 'Eddy', score: 58},
 *                     // ...
 *                     {name: 'Jack', score: 69}];
 *     byGrade(students);
 *     // {
 *     //   'A': [{name: 'Dianne', score: 99}],
 *     //   'B': [{name: 'Abby', score: 84}]
 *     //   // ...,
 *     //   'F': [{name: 'Eddy', score: 58}]
 *     // }
 */
module.exports = _curry2(function groupBy(fn, list) {
    return _foldl(function(acc, elt) {
        var key = fn(elt);
        acc[key] = _append(elt, acc[key] || (acc[key] = []));
        return acc;
    }, {}, list);
});
