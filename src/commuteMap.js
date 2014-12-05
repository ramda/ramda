var _ap = require('./internal/_ap');
var _curry3 = require('./internal/_curry3');
var _foldl = require('./internal/_foldl');
var _map = require('./internal/_map');
var append = require('./append');


/**
 * Turns a list of Functors into a Functor of a list, applying
 * a mapping function to the elements of the list along the way.
 *
 * Note: `commuteMap` may be more useful to convert a list of non-Array Functors (e.g.
 * Maybe, Either, etc.) to Functor of a list.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.commute
 * @sig (a -> (b -> c)) -> (x -> [x]) -> [[*]...]
 * @param {Function} fn The transformation function
 * @param {Function} of A function that returns the data type to return
 * @param {Array} list An Array (or other Functor) of Arrays (or other Functors)
 * @return {Array}
 * @example
 *
 *     var plus10map = R.map(function(x) { return x + 10; });
 *     var as = [[1], [3, 4]];
 *     R.commuteMap(R.map(function(x) { return x + 10; }), R.of, as); //=> [[11, 13], [11, 14]]
 *
 *     var bs = [[1, 2], [3]];
 *     R.commuteMap(plus10map, R.of, bs); //=> [[11, 13], [12, 13]]
 *
 *     var cs = [[1, 2], [3, 4]];
 *     R.commuteMap(plus10map, R.of, cs); //=> [[11, 13], [12, 13], [11, 14], [12, 14]]
 *
 */
module.exports = _curry3(function commuteMap(fn, of, list) {
    function consF(acc, ftor) {
        return _ap(_map(append, fn(ftor)), acc);
    }
    return _foldl(consF, of([]), list);
});
