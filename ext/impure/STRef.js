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

    /**
     * STRef is a data type constructor to handle global mutable references. It is
     * used to track global mutation. It wraps a value in a container.
     *
     * @example
     *
     *      var stateRef = STRef({});
     *
     *      stateRef.modify(function() {
     *          return {name: 'Joe'};
     *      });
     *      stateRef.read() // => {name: 'Joe'}
     *
     */
    function STRef(val) {
        if (!(this instanceof STRef)) {
            return new STRef(val);
        }

        var privateValue = val;

        this.modify = function(f) {
            privateValue = f(privateValue);
            return this;
        };

        this.write = function(val, path) {
            if (path) {
                var paths = R.split('.', path);
                var current = privateValue;
                for (var idx = 0; idx < paths.length - 1; idx++) {
                    current = current[paths[idx]];
                }
                current[paths[idx]] = val;
            } else {
                privateValue = val;
            }
            return this;
        };

        this.read = function(val, path) {
            if (path) {
                var paths = R.split('.', path);
                var current = privateValue;
                for (var idx = 0; idx < paths.length; idx++) {
                    current = current[paths[idx]];
                }
                return R.cloneObj(current); // does not deep clone!
            } else {
                return R.cloneObj(privateValue); // does not deep clone!;
            }
        };
    }

    return STRef;
}));
