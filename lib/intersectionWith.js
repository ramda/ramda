var _containsWith = require('./_containsWith');
var _curry3 = require('./_curry3');
var uniqWith = require('./uniqWith');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.  Duplication is determined according
 * to the value returned by applying the supplied predicate to two list
 * elements.
 *
 * @func
 * @memberOf R
 * @category relation
 * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate function that determines whether
 *        the two supplied elements are equal.
 * @param {Array} list1 One list of items to compare
 * @param {Array} list2 A second list of items to compare
 * @see R.intersection
 * @return {Array} A new list containing those elements common to both lists.
 * @example
 *
 *      var buffaloSpringfield = [
 *        {id: 824, name: 'Richie Furay'},
 *        {id: 956, name: 'Dewey Martin'},
 *        {id: 313, name: 'Bruce Palmer'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *      var csny = [
 *        {id: 204, name: 'David Crosby'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 539, name: 'Graham Nash'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *
 *      var sameId = function(o1, o2) {return o1.id === o2.id;};
 *
 *      R.intersectionWith(sameId, buffaloSpringfield, csny);
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */
module.exports = _curry3(function intersectionWith(pred, list1, list2) {
    var results = [], idx = -1;
    while (++idx < list1.length) {
        if (_containsWith(pred, list1[idx], list2)) {
            results[results.length] = list1[idx];
        }
    }
    return uniqWith(pred, results);
});
