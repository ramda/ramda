import _curry3 from './internal/_curry3.js';

/**
 * This function calls recursively the iterator function using the followed accumulator and seed. Each call to the iterator function returns a tuple that consists of next accumulator and next seed. When the iterator function returns `null`, or when no seed is provided, or when the seed provided is `null`, the function returns the last accumulator to the caller.
 * 
 * This function mimics the recursive function that accepts an accumulator parameter in functional programming.
 * 
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a,b) -> [a,b]|null) -> a -> b -> a
 * @param {Function} iterator The iterator function. receives two argument, `acc` is `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array is next accumulator, and the element at index 1 is next seed.
 * @param {a} acc The result value.
 * @param {b} seed The seed value.
 * @return {a} return the last acc.
 * @example
 * 
 * @symb 
 */
export const fold = _curry3(function (iterator, acc, seed) {
    while (seed != null) {
        let pair = iterator(acc, seed)
        if (pair == null || pair.length === 0) break
        acc = pair[0]
        if (pair.length === 1) break
        seed = pair[1]
    }
    return acc

})