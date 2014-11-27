/**
 * Creates a shallow copy of an array.
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The list to clone.
 * @return {Array} A new copy of the original list.
 * @example
 *
 *      var numbers = [1, 2, 3];
 *      var numbersClone = R.clone(numbers); //=> [1, 2, 3]
 *      numbers === numbersClone; //=> false
 *
 *      // Note that this is a shallow clone--it does not clone complex values:
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects[0] === objectsClone[0]; //=> true
 */
var clone = R.clone = function clone(list) {
    return _slice(list);
};
