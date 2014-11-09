(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('../..'));
    } else {
        // Browser globals
        this.returnExports = factory(this.R);
    }
}(function(R) {
    var compose = R.compose;

    function IO(fn) {
        if (!(this instanceof IO)) {
            return new IO(fn);
        }
        this.fn = fn;
    }

    // `f` must return an IO
    IO.prototype.chain = function(f) {
        var io = this;
        return new IO(function() {
            return f(io.fn()).fn();
        });
    };

    IO.prototype.map = function(f) {
        var io = this;
        return new IO(compose(f, io.fn));
    };

    // `this` IO must wrap a function `f` that takes an IO (`thatIo`) as input
    // `f` must return an IO
    IO.prototype.ap = function(thatIo) {
        return this.chain(function(f) {
            return thatIo.map(f);
        });
    };

    IO.runIO = function(io) {
        return io.runIO.apply(io, [].slice.call(arguments, 1));
    };

    IO.prototype.runIO = function() {
        return this.fn.apply(this, arguments);
    };

    IO.prototype.of = function(x) {
        return new IO(function() { return x; });
    };

    IO.of = IO.prototype.of;

    // this is really only to accommodate testing ....
    IO.prototype.equals = function(that) {
        return this === that ||
            this.fn === that.fn ||
            IO.runIO(this) === IO.runIO(that);
    };

    return IO;
}));
