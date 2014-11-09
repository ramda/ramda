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
    function Maybe(x) {
        if (!(this instanceof Maybe)) {
            return new Maybe(x);
        }
        this.value = x;
    }

    Maybe.of = function(x) {
        return new Maybe(x);
    };

    // functor
    Maybe.prototype.map = function(f) {
        return this.value == null ? this : new Maybe(f(this.value));
    };

    // apply
    // takes a Maybe that wraps a function (`app`) and applies its `map`
    // method to this Maybe's value, which must be a function.
    Maybe.prototype.ap = function(m) {
        return typeof this.value !== 'function' ? new Maybe(null) : m.map(this.value);
    };

    // applicative
    Maybe.prototype.of = Maybe.of;

    // chain
    //  f must be a function which returns a value
    //  f must return a value of the same Chain
    //  chain must return a value of the same Chain
    //
    Maybe.prototype.chain = function(f) {
        return this.value == null ? this : f(this.value);
    };

    // monad
    // A value that implements the Monad specification must also implement the Applicative and Chain specifications.
    // see above.

    // equality method to enable testing
    Maybe.prototype.equals = function(that) {
        return this.value === that.value;
    };

    return Maybe;
}));
