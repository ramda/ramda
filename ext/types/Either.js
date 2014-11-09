(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        this.returnExports = factory();
    }
}(function() {

    function F() {}

    function inherit(Parent, Child) {
        if (Object.create) {
            Child.prototype = Object.create(Parent.prototype);
        } else {
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
        }
        return Child;
    }

    function Either(left, right) {
        switch (arguments.length) {
            case 0:
                throw new TypeError('no arguments to Either');
            case 1:
                return function(right) {
                    return right == null ? Left(left) : Right(right);
                };
            default:
                return right == null ? Left(left) : Right(right);
        }
    }

    function Right(value) {
        if (!(this instanceof Right)) {
            return new Right(value);
        }
        this.value = value;
    }
    function Left(value) {
        if (!(this instanceof Left)) {
            return new Left(value);
        }
        this.value = value;
    }

    function returnThis() { return this; }

    Either.Right = Right;
    Either.Left = Left;

    Either.prototype.map = returnThis;
    Either.of = Either.prototype.of = function(value) { return new Right(value); };
    Either.prototype.chain = returnThis; // throw
    Either.equals = Either.prototype.equals = function(that) {
        return this.constructor === that.constructor && this.value === that.value;
    };

    inherit(Either, Right);
    inherit(Either, Left);

    Right.prototype.map = function(fn) { return new Right(fn(this.value)); };
    Right.prototype.ap = function(that) { return that.map(this.value); };
    Right.prototype.chain = function(f) { return f(this.value); };

    Left.prototype.ap = function(that) { return that; };

    return Either;
}));
