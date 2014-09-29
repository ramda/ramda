/**
 * STRef is a data type constructor to handle global mutable references. It is
 * used to track global mutation. It wraps a value in a container.
 *
 * @example
 *
 *      var pokes = STRef.new(0)();
 *
 *       R.range(1, 1000).forEach(function(i) {
 *          STRef.write(pokes, i)();
 *      });
 *
 *      STRef.read(pokes)() // => 999);
 *
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('../..'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.ramda);
    }
}(this, function(R) {

    function STRef() {}

    /**
     * @sig a -> STRef (RefVal a)
     */
    STRef.new = function(val) {
        return function() {
            return {value: val};
        };
    };

    /**
     * @sig RefVal a -> STRef a
     */
    STRef.read = function(ref) {
        return function() {
            return ref.value;
        };
    };

    /**
     * @sig RefVal a -> (a -> a) -> STRef Unit
     */
    STRef.modify = R.curryN(2, function(ref, f) {
        return function() {
            ref.value = f(ref.value);
            return {};
        };
    });

    /**
     * @sig RefVal a -> a -> STRef Unit
     */
    STRef.write = R.curryN(2, function(ref, val) {
        return function() {
            ref.value = val;
            return {};
        };
    });

    return STRef;
}));
