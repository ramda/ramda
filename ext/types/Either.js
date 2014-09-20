(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    function Either(left, right) {
        if (arguments.length === 0) {
            throw new TypeError('Either called with no arguments');
        } else if (arguments.length === 1) {
            return function(right) {
                return new Either(left, right);
            };
        } else {
            if (!(this instanceof Either)) {
                return new Either(left, right);
            }
            this.left = left;
            this.right = right;
        }
    }

    Either.of = function(value, err) {
        return new Either(err, value);
    };

    Either.prototype.map = function(f) {
        return this.right == null ? this : new Either(this.left, f(this.right));
    };

    Either.prototype.ap = function(app) {
        return this.right == null ? this : app.map(this.right);
    };

    // `f` must return a new Either; not sure if this impl is sufficient
    Either.prototype.chain = function(f) {
        return this.right == null ? this : f(this.right);
    };

    Either.prototype.of = Either.of;

    Either.prototype.equals = function(that) {
        return this.right === that.right;
    };

    Either.equals = function(e1, e2) {
        return e1.equals(e2);
    };

    return Either;
}));
