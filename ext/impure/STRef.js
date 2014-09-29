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

    function STRef(val) {
        if (!(this instanceof STRef)) {
            return new STRef(val);
        }

        var privateValue = val;

        this.modify = function(f) {
            privateValue = f(privateValue);
            return this;
        }

        this.write = function(val, path) {
            if (path) {
                var paths = R.split('.', path);
                var current = privateValue;
                for (idx = 0; idx < paths.length - 1; idx++) {
                    current = current[paths[idx]];
                }
                current[paths[idx]] = val;
            } else {
                privateValue = val;
            }
            return this;
        }

        this.linkTo = function(path) {
            return {
                _value: privateValue,
                _path: path
            };
        }

        this.read = function(val, path) {
            if (path) {
                var paths = R.split('.', path);
                var current = privateValue;
                for (idx = 0; idx < paths.length; idx++) {
                    current = current[paths[idx]];
                }
                return R.cloneObj(current); // does not clone!
            } else {
                return R.cloneObj(privateValue); // does not clone!;
            }
        }
    }

    STRef.writeLink = function(val, link) {
        var current = link._value;
        var paths = R.split('.', link._path);
        for (idx = 0; idx < paths.length - 1; idx++) {
            current = current[paths[idx]];
        }
        current[paths[idx]] = val;
    }

    // /**
    //  * @sig a -> STRef (RefVal a)
    //  */
    // STRef.new = function(val) {
    //     return {value: val};
    // };
    //
    // /**
    //  * @sig RefVal a -> STRef a
    //  */
    // STRef.prototype.read = function(ref) {
    //     return function() {
    //         return ref.value;
    //     };
    // };
    //
    // /**
    //  * @sig RefVal a -> (a -> a) -> STRef Unit
    //  */
    // STRef.modify = R.curryN(2, function(ref, f) {
    //     return function() {
    //         ref.value = f(ref.value);
    //         return {};
    //     };
    // });
    //
    // /**
    //  * @sig RefVal a -> a -> STRef Unit
    //  */
    // STRef.write = R.curryN(2, function(ref, val) {
    //     return function() {
    //         ref.value = val;
    //         return {};
    //     };
    // });

    return STRef;
}));
