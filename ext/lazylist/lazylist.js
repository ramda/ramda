(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../..'));
    } else {
        this.lazylist = factory(this.R);
    }
}(function(R) {

    /** lazylist constructor
     *  @func
     *  @param {*} seed - initial seed for the list.
     *  @param {Function} current - function to calculate the head from the seed.
     *  @param {Function} step - function to calculate the next value of the list from the seed.
     *
     *  Lazy list objects have this structure:
     *
     *     {
     *        '0': someValue,
     *        tail: someFunction() {},
     *        length: Infinity
     *     }
     *
     * Lazy list objects also have such functions as `take`, `skip`, `map`, and `filter`, but the equivalent
     * functions from Ramda will work with them as well.
     *
     * ### Examples ###
     *
     *     //Infinite list of positive integers
     *     lazylist(1, R.identity, R.add(1)) //=> [1, 2, 3, 4...]
     *
     *     var fibonacci = lazylist(
     *         [0, 1],
     *         function(pair) {return pair[0];},
     *         function(pair) {return [pair[1], pair[0] + pair[1]];}
     *     );
     *     var even = function(n) {return (n % 2) === 0;};
     *
     *     take(5, filter(even, fibonacci)) //=> [0, 2, 8, 34, 144]
     *
     * Note that the `take(5)` call is necessary to get a finite list out of this.  Otherwise, this would still
     * be an infinite list.
     */
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

        // Internal Lazy list constructor. See lazylist docs above.
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

            /**
             * Returns a new lazylist containing the first `n` elements of the given list.  If
             * `n` is greater than the number of elements in the list it returns all elements.
             *
             * @func
             * @memberOf lazylist
             * @category lazylist
             * @sig Number -> lazylist a -> [a]
             * @param {Number} n The number of elements to return.
             * @return {Array} A new array containing the taken elements.
             */
            take: function(n) {
                var take = function(ctr, lz, ret) {
                    return (ctr === 0) ? ret : take(ctr - 1, lz.tail(), ret.concat([lz[0]]));
                };
                return trampoline(take, n, this, []);
            },

            /**
             * Returns a new lazylist containing the first `n` elements of a given list, passing each value
             * to the supplied predicate function, and terminating when the predicate function returns
             * `false`. Excludes the element that caused the predicate function to fail. The predicate
             * function is passed one argument: *(value)*.
             *
             * @func
             * @memberOf lazylist
             * @category lazylist
             * @sig (a -> Boolean) -> lazylist a -> [a]
             * @param {Function} pred - The function called per iteration.
             * @return {Array} A new array containing the taken elements.
             * @example
             *
             *      var isNotFour = function(x) {
             *        return !(x === 4);
             *      };
             *
             *      lazylist(1, R.identity, R.add(1)).takeWhile(isNotFour); //=> [1, 2, 3]
             */
            takeWhile: function(pred) {
                var results = [], current = this;
                while (pred(current[0])) {
                    results.push(current[0]);
                    current = current.tail();
                }
                return results;
            },

            /**
             * Returns a new lazylist containing all but the first `n` elements of the given list.
             *
             * @func
             * @memberOf lazylist
             * @category lazylist
             * @sig Number -> lazylist a -> lazylist a
             * @param {Number} n - The number of elements of `list` to skip.
             * @return {Lazylist} The last `n` elements of `list`.
             * @example
             *
             *     lazylist(1, R.identity, R.add(1)).skip(3); //=> [4,5,6,7...]
             */
            skip: function(n) {
                var skip = function(ctr, lz) {
                    return (ctr <= 0) ? lz : skip(ctr - 1, lz.tail());
                };
                return trampoline(skip, n, this);
            },

            /**
             * Returns a new lazylist, constructed by applying the supplied function to every element of the
             * supplied list.
             *
             * @func
             * @memberOf lazylist
             * @category lazylist
             * @sig (a -> b) -> lazylist a -> lazylist b
             * @param {Function} fn The function to be called on every element of the input `list`.
             * @return {Lazylist} The new list.
             * @example
             *
             *      var double = function(x) {
             *        return x * 2;
             *      };
             *
             *      lazylist(1, R.identity, R.add(1)).map(double); //=> [2, 4, 6...]
             */
            map: function(fn) {
                var ls = this;
                var lz = create(LZ.prototype);
                lz[0] = fn(ls[0]);
                lz.tail = function() {
                    return ls.tail().map(fn);
                };
                return lz;
            },

            /**
             * Returns a new lazylist containing only those elements that match a given predicate function.
             * The predicate function is passed one argument: *(value)*.
             *
             * @func
             * @memberOf lazylist
             * @category lazylist
             * @sig (a -> Boolean) -> lazylist a -> lazylist a
             * @param {Function} fn The function called per iteration.
             * @return {Lazylist} The new filtered lazylist.
             * @example
             *
             *      var isEven = function(n) {
             *        return n % 2 === 0;
             *      };
             *      lazylist(1, R.identity, R.add(1)).filter(isEven); //=> [2, 4, 6...]
             */
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

    /**
     * Returns a lazy list of identical values. This is probably most useful with `take` for initializing a list.
     *
     * @func
     * @memberOf R
     * @category lazylist
     * @sig a -> [a]
     * @param {*} value to repeat indefinitely
     * @return {Lazylist} new lazylist
     * @example
     *      R.repeat(1) //=> [1, 1, 1, ...]
     */
    R.repeat = function(value) {
        var fn = R.always(value);
        return lazylist(null, fn, fn);
    };

    return lazylist;
}));
