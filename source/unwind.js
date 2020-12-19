import _curry2 from './internal/_curry2.js';
import has from './has';
import propIs from './propIs';
import reduce from './reduce';
import clone from './clone';
import dissoc from './dissoc';
import assoc from './assoc';

var unwind = _curry2(function (key, object) {
    // If prop as key is not in Object or prop as key is not an List in Object
    if (!(has(key, object) && propIs(Array, key, object))) return [object];
    // Reduce Function
    var fn = function (acc, item) {
        // Cloning
        var clonedObject = clone(object);
        // Removing key from newly cloned object
        var dissocObject = dissoc(key, clonedObject);
        // Adding key to newly dissocated object
        var assocObject = assoc(key, item, dissocObject);
        // Adding assocated object to Accumulator
        acc.push(assocObject);
        return acc;
    };
    // Reduce over object[key] which is an list
    // Initialize Accumulator with empty list
    return reduce(fn, [], object[key]);
});

export default unwind;
