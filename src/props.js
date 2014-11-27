var _curry2 = require('./internal/_curry2');


/**
 * Acts as multiple `get`: array of keys in, array of values out. Preserves order.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */
module.exports = _curry2(function props(ps, obj) {
    var len = ps.length,
        out = new Array(len),
        idx = -1;

    while (++idx < len) {
        out[idx] = obj[ps[idx]];
    }

    return out;
});
