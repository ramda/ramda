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
        switch (arguments.length) {
            case 0:
                throw new TypeError('Either called with no arguments');
            case 1:
                return function(right) {
                    return new Either(left, right);
                };
            default:
                if (!(this instanceof Either)) {
                    return new Either(left, right);
                }
        }
        this._left = left;
        this._right = right;
    }

    Either.Left = function(err) {
        return new Either(err, null);
    };

    Either.prototype.Left = Either.Left;

    Either.prototype.isLeft = function() {
        return !this.isRight();
    };

    Either.prototype.left = function() {
        return this._left;
    };

    Either.Right = function(value) {
        return new Either(null, value);
    };

    Either.prototype.Right = Either.Right;

    Either.prototype.isRight = function() {
        return this._right !== null && this._right !== undefined;
    };

    Either.prototype.right = function() {
        return this._right;
    };

    Either.of = function(value) {
        return Either.Right(value);
    };

    Either.prototype.map = function(f) {
        return this.isRight() ? new Either(this._left, f(this._right)) : this;
    };

    Either.prototype.ap = function(app) {
        return this.isRight() ? app.map(this._right) : this;
    };

    // `f` must return a new Either; not sure if this impl is sufficient
    Either.prototype.chain = function(f) {
        return this.isRight() ? f(this._right) : this;
    };

    Either.prototype.of = Either.of;

    Either.prototype.equals = function(that) {
        return this._right === that._right;
    };

    Either.equals = function(e1, e2) {
        return e1.equals(e2);
    };

    return Either;
}));
