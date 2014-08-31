(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../..'));
    } else {
        this.lazylist = factory(this.ramda);
    }
}(function(R) {

    // Lazy lists
    // ----------
    //

    // Support for infinite lists, using an initial seed, a function that calculates the head from the seed and
    // a function that creates a new seed from the current seed.  Lazy list objects have this structure:
    //
    //     {
    //        '0': someValue,
    //        tail: someFunction() {},
    //        length: Infinity
    //     }
    //
    // Lazy list objects also have such functions as `take`, `skip`, `map`, and `filter`, but the equivalent
    // functions from Ramda will work with them as well.
    //
    // ### Example ###
    //
    //     var fibonacci = lazylist(
    //         [0, 1],
    //         function(pair) {return pair[0];},
    //         function(pair) {return [pair[1], pair[0] + pair[1]];}
    //     );
    //     var even = function(n) {return (n % 2) === 0;};
    //
    //     take(5, filter(even, fibonacci)) //=> [0, 2, 8, 34, 144]
    //
    // Note that the `take(5)` call is necessary to get a finite list out of this.  Otherwise, this would still
    // be an infinite list.

    var lazylist = (function() {
        // partial shim for Object.create
        var create = (function() {
            var F = function() {};
            return function(src) {
                F.prototype = src;
                return new F();
            };
        }());

        // Trampolining to support recursion in Lazy lists
        var trampoline = function(fn) {
            var result = fn.apply(this, R.tail(arguments));
            while (typeof result === 'function') {
                result = result();
            }
            return result;
        };
        // Internal Lazy list constructor
        var  LZ = function(seed, current, step) {
            this['0'] = current(seed);
            this.tail = function() {
                return new LZ(step(seed), current, step);
            };
        };

        // Lazy lists can be used with OO techniques as well as our standard functional calls.  These are the
        // implementations of those methods and other properties.
        LZ.prototype = {
            constructor: LZ,
            // All lazylists are infinite.
            length: Infinity,
            // `take` implementation for lazylists.
            take: function(n) {
                var take = function(ctr, lz, ret) {
                    return (ctr === 0) ? ret : take(ctr - 1, lz.tail(), ret.concat([lz[0]]));
                };
                return trampoline(take, n, this, []);
            },
            takeWhile: function(pred) {
                var results = [], current = this;
                while (pred(current[0])) {
                    results.push(current[0]);
                    current = current.tail();
                }
                return results;
            },
            // `skip` implementation for lazylists.
            skip: function(n) {
                var skip = function(ctr, lz) {
                    return (ctr <= 0) ? lz : skip(ctr - 1, lz.tail());
                };
                return trampoline(skip, n, this);
            },
            // `map` implementation for lazylists.
            map: function(fn) {
                var ls = this;
                var lz = create(LZ.prototype);
                lz[0] = fn(ls[0]);
                lz.tail = function() {
                    return ls.tail().map(fn);
                };
                return lz;
            },
            // `filter` implementation for lazylists.
            filter: function(fn) {
                var ls = this, head = ls[0];
                while (!fn(head)) {
                    ls = ls.tail();
                    head = ls[0];
                }
                var lz = create(LZ.prototype);
                lz[0] = head;
                lz.tail = function() {return R.filter(fn, ls.tail());};
                return lz;
            }
        };

        // The actual public `lazylist` function.
        return function(seed, current, step) {
            return new LZ(seed, current, step);
        };
    }());

    R.lazylist = lazylist;

    // Returns a lazy list of identical values, probably most useful with `take` for initializing a list.
    R.repeat = function(value) {
        var fn = R.always(value);
        return lazylist(null, fn, fn);
    };

    return lazylist;
}));
