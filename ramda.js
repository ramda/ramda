//     ramda.js 0.2.2
//     https://github.com/CrossEye/ramda
//     (c) 2013-2014 Scott Sauyet and Michael Hurley
//     Ramda may be freely distributed under the MIT license.

// Ramda
// -----
// A practical functional library for Javascript programmers.  Ramda is a collection of tools to make it easier to
// use Javascript as a functional programming language.  (The name is just a silly play on `lambda`.)

// Basic Setup
// -----------
// Uses a technique from the [Universal Module Definition][umd] to wrap this up for use in Node.js or in the browser,
// with or without an AMD-style loader.
//
//  [umd]: https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root);} else if (typeof define === 'function' && define.amd) {define(factory);} else {root.ramda = factory(root);}}(this, function (global) {

    "use strict";
    return  (function() {
        // This object is what is actually returned, with all the exposed functions attached as properties.

        /**
         * XXX
         */
        var R = {};

        // Internal Functions and Properties
        // ---------------------------------

        /**
         * XXX
         */
        var undef = (function () {})();

        /**
         * XXX
         */
        // Makes a public alias for one of the public functions:
        var aliasFor = function (oldName) {
            var fn = function (newName) {
                R[newName] = R[oldName];
                return fn;
            };
            fn.is = fn.are = fn.and = fn;
            return fn;
        };

        /**
         * XXX
         */
        // (private) `slice` implemented iteratively for performance
        var _slice = function (args, from, to) {
            from = from || 0;
            to = to || args.length;
            var length = to - from,
                arr = new Array(length),
                i = -1;

            while (++i < length) {
                arr[i] = args[from + i];
            }
            return arr;
        };

        /**
         * XXX
         */
        // private concat function to merge 2 collections
        var concat = function(set1, set2) {
            set1 = set1 || [];
            set2 = set2 || [];
            var length1 = set1.length,
                length2 = set2.length,
                result = new Array(length1 + length2);

            for (var i = 0; i < length1; i++) {
                result[i] = set1[i];
            }
            for (i = 0; i < length2; i++) {
                result[i + length1] = set2[i];
            }
            return result;
        };

        /**
         * XXX
         */
        // (private)
        var toString = Object.prototype.toString;
        /**
         * XXX
         */
        var isArray = Array.isArray || function (val) {
            return val && val.length >= 0 && toString.call(val) === "[object Array]";
        };

        /**
         * XXX
         */
        // Returns a curried version of the supplied function.  For example:
        //
        //      var discriminant = function(a, b, c) {
        //          return b * b - 4 * a * c;
        //      };
        //      var f = curry(discriminant);
        //      var g = f(3), h = f(3, 7) i = g(7);
        //      i(4) ≅ h(4) == g(7, 4) == f(3, 7, 4) == 1
        //
        //  Almost all exposed functions of more than one parameter already have curry applied to them.
        var curry = R.curry = function (fn, fnArity) {
            fnArity = typeof fnArity === "number" ? fnArity : fn.length;
            function recurry(args) {
                return arity(Math.max(fnArity - (args && args.length || 0), 0), function () {
                    if (arguments.length === 0) { throw NO_ARGS_EXCEPTION; }
                    var newArgs = concat(args, arguments);
                    if (newArgs.length >= fnArity) {
                        return fn.apply(this, newArgs);
                    }
                    else {
                        return recurry(newArgs);
                    }
                });
            }

            return recurry([]);
        };

        var NO_ARGS_EXCEPTION = new TypeError('Function called with no arguments');

        /**
         * XXX
         */
        // Optimized internal curriers
        function curry2(fn) {
            return function(a, b) {
                switch (arguments.length) {
                    case 0: throw NO_ARGS_EXCEPTION;
                    case 1: return function(b) {
                        return fn(a, b);
                    };
                }
                return fn(a, b);
            };
        }
        /**
         * XXX
         */
        function curry3(fn) {
            return function(a, b, c) {
                switch (arguments.length) {
                    case 0: throw NO_ARGS_EXCEPTION;
                    case 1: return curry2(function(b, c) {
                        return fn(a, b, c);
                    });
                    case 2: return function(c) {
                        return fn(a, b, c);
                    };
                }
                return fn(a, b, c);
            };
        }

        /**
         * XXX
         */
        // (private) for dynamically dispatching Ramda method to non-Array objects
        var hasMethod = function (methodName, obj) {
            return obj && !isArray(obj) && typeof obj[methodName] === 'function';
        };

        /**
         * XXX
         */
        var mkArgStr = function (n) {
            var arr = [], idx = -1;
            while (++idx < n) {
                arr[idx] = "arg" + idx;
            }
            return arr.join(", ");
        };

        /**
         * XXX
         */
        // Wraps a function that may be nullary, or may take fewer than or more than `n` parameters, in a function that
        // specifically takes exactly `n` parameters.  Any extraneous parameters will not be passed on to the function
        // supplied
        var nAry = R.nAry = (function () {
            var cache = {
                0: function (func) {
                    return function () {
                        return func.call(this);
                    };
                },
                1: function (func) {
                    return function (arg0) {
                        return func.call(this, arg0);
                    };
                },
                2: function (func) {
                    return function (arg0, arg1) {
                        return func.call(this, arg0, arg1);
                    };
                },
                3: function (func) {
                    return function (arg0, arg1, arg2) {
                        return func.call(this, arg0, arg1, arg2);
                    };
                }
            };


            //     For example:
            //     cache[5] = function(func) {
            //         return function(arg0, arg1, arg2, arg3, arg4) {
            //             return func.call(this, arg0, arg1, arg2, arg3, arg4);
            //         }
            //     };

            var makeN = function (n) {
                var fnArgs = mkArgStr(n);
                var body = [
                        "    return function(" + fnArgs + ") {",
                        "        return func.call(this" + (fnArgs ? ", " + fnArgs : "") + ");",
                    "    }"
                ].join("\n");
                return new Function("func", body);
            };

            return function (n, fn) {
                return (cache[n] || (cache[n] = makeN(n)))(fn);
            };
        }());

        /**
         * XXX
         */
        // Returns a function that only accepts a single parameter, regardless of how
        // many the supplied one takes.
        R.unary = function (fn) {
            return nAry(1, fn);
        };

        /**
         * XXX
         */
        // Returns a function that only accepts two parameters, regardless of how
        // many the supplied one takes.
        var binary = R.binary = function (fn) {
            return nAry(2, fn);
        };

        /**
         * XXX
         */
        // Wraps a function that may be nullary, or may take fewer than or more than `n` parameters, in a function that
        // specifically takes exactly `n` parameters.  Note, though, that all parameters supplied will in fact be
        // passed along, in contrast with `nAry`, which only passes along the exact number specified.
        var arity = R.arity = (function () {
            var cache = {
                0: function (func) {
                    return function () {
                        return func.apply(this, arguments);
                    };
                },
                1: function (func) {
                    return function (arg0) {
                        return func.apply(this, arguments);
                    };
                },
                2: function (func) {
                    return function (arg0, arg1) {
                        return func.apply(this, arguments);
                    };
                },
                3: function (func) {
                    return function (arg0, arg1, arg2) {
                        return func.apply(this, arguments);
                    };
                }
            };

            //     For example:
            //     cache[5] = function(func) {
            //         return function(arg0, arg1, arg2, arg3, arg4) {
            //             return func.apply(this, arguments);
            //         }
            //     };

            var makeN = function (n) {
                var fnArgs = mkArgStr(n);
                var body = [
                        "    return function(" + fnArgs + ") {",
                    "        return func.apply(this, arguments);",
                    "    }"
                ].join("\n");
                return new Function("func", body);
            };

            return function (n, fn) {
                return (cache[n] || (cache[n] = makeN(n)))(fn);
            };
        }());

        /**
         * XXX
         */
        // Turns a named method of an object (or object prototype) into a function that can be called directly.
        // The object becomes the last parameter to the function, and the function is automatically curried.
        // Passing the optional `len` parameter restricts the function to the initial `len` parameters of the method.
        var invoker = R.invoker = function (name, obj, len) {
            var method = obj[name];
            var length = len === undef ? method.length : len;
            return method && curry(function () {
                if (arguments.length) {
                    var target = Array.prototype.pop.call(arguments);
                    var targetMethod = target[name];
                    if (targetMethod == method) {
                        return targetMethod.apply(target, arguments);
                    }
                }
                return undef;
            }, length + 1);
        };

        /**
         * XXX
         */
        // Creates a new function that calls the function `fn` with parameters consisting of  the result of the
        // calling each supplied handler on successive arguments, followed by all unmatched arguments.
        //
        // If there are extra _expected_ arguments that don't need to be transformed, although you can ignore
        // them, it might be best to pass in and identity function so that the new function correctly reports arity.
        // See for example, the definition of `project`, below.
        var useWith = R.useWith = function (fn /*, transformers */) {
            var transformers = _slice(arguments, 1);
            var tlen = transformers.length;
            return curry(arity(tlen, function () {
                var args = [], idx = -1;
                while (++idx < tlen) {
                    args.push(transformers[idx](arguments[idx]));
                }
                return fn.apply(this, args.concat(_slice(arguments, tlen)));
            }));
        };

        /**
         * XXX
         */
        // A two-step version of the `useWith` function.  This would allow us to write `project`, currently written
        // as `useWith(map, pickAll, identity)`, as, instead, `use(map).over(pickAll, identity)`, which is a bit
        // more explicit.
        // TODO: One of these versions should be eliminated eventually.  So not worrying about the duplication for now.
        R.use = function (fn) {
            return {
                over: function (/*transformers*/) {
                    var transformers = _slice(arguments, 0);
                    var tlen = transformers.length;
                    return curry(arity(tlen, function () {
                        var args = [], idx = -1;
                        while (++idx < tlen) {
                            args.push(transformers[idx](arguments[idx]));
                        }
                        return fn.apply(this, args.concat(_slice(arguments, tlen)));
                    }));
                }
            };
        };

        /**
         * XXX
         */
        // Loop over a list for side effects. Nasty, yes, but this is a *practical* library
        var each = R.each = function (fn, list) {
            function _each(list) {
                var idx = -1, len = list.length;
                while (++idx < len) {
                    fn(list[idx]);
                }
                // i can't bear not to return *something*
                return list;
            }
            return arguments.length < 2 ? _each : _each(list);
        };

        /**
         * XXX
         */
        each.idx = function (fn, list) {
            function _eachIdx(list) {
                var idx = -1, len = list.length;
                while (++idx < len) {
                    fn(list[idx], idx, list);
                }
                // i can't bear not to return *something*
                return list;
            }
            return arguments.length < 2 ? _eachIdx : _eachIdx(list);
        };
        aliasFor("each").is("forEach");

        /**
         * XXX
         */
        // Create a shallow copy of an array.
        var clone = R.clone = function(list) {
            return _slice(list);
        };

        // Core Functions
        // --------------
        //

        /**
         * XXX
         */
        // Boolean function which reports whether a list is empty.
        var isEmpty = R.isEmpty = function (arr) {
            return !arr || !arr.length;
        };

        /**
         * XXX
         */
        // Returns a new list with the new element at the front and the existing elements following
        var prepend = R.prepend = function (el, arr) {
            return concat([el], arr);
        };
        aliasFor("prepend").is("cons");

        /**
         * XXX
         */
        //  Returns the first element of a list
        var head = R.head = function (arr) {
            arr = arr || [];
            return arr[0];
        };
        aliasFor("head").is("car").and("first");

        /**
         * XXX
         */
        //  Returns the last element of a list
        R.last = function (arr) {
            arr = arr || [];
            return arr[arr.length - 1];
        };

        /**
         * XXX
         */
        // Returns the rest of the list after the first element.
        // If the passed-in list is not annary, but is an object with a `tail` method,
        // it will return object.tail().
        var tail = R.tail = function (arr) {
            arr = arr || [];
            if (hasMethod('tail', arr)) {
                return arr.tail();
            }
            return (arr.length > 1) ? _slice(arr, 1) : [];
        };
        aliasFor("tail").is("cdr");

        /**
         * XXX
         */
        //   Boolean function which is `true` for non-list, `false` for a list.
        R.isAtom = function (x) {
            return x != null && !isArray(x);
        };

        /**
         * XXX
         */
        // Returns a new list with the new element at the end of a list following all the existing ones.
        var append = R.append = function(el, list) {
            return concat(list, [el]);
        };
        aliasFor("append").is("push");

        /**
         * XXX
         */
        // Returns a new list consisting of the elements of the first list followed by the elements of the second.
        var merge = R.merge = curry2(concat);
        R.concat = curry2(function(set1, set2) {
            return (hasMethod('concat', set1)) ? set1.concat(set2) : concat(set1, set2);
        });

        /**
         * XXX
         */
        // A surprisingly useful function that does nothing but return the parameter supplied to it.
        var identity = R.identity = function (x) {
            return x;
        };
        aliasFor("identity").is("I");

        /**
         * XXX
         */
        R.times = curry2(function (fn, n) {
            var arr = new Array(n);
            var i = -1;
            while (++i < n) {
                arr[i] = fn(i);
            }
            return arr;
        });

        /**
         * XXX
         */
        // Returns a fixed list (of size `n`) of identical values.
        R.repeatN = curry2(function (value, n) {
            return R.times(R.always(value), n);
        });


        // Function functions :-)
        // ----------------------
        //
        // These functions make new functions out of old ones.

        //Partially applies a to f when f is a variadic function that cant be curried
        function partially(f, a){
            return function() {
                return f.apply(this, concat([a], arguments));
            };
        }

        // --------

        /**
         * XXX
         */
        //Basic composition function, takes 2 functions and returns the composite function. Its mainly used to build
        //the more general compose function, which takes any number of functions.
        function internalCompose(f, g) {
            return function() {
                return f.call(this, g.apply(this, arguments));
            };
        }

        /**
         * XXX
         */
        // Creates a new function that runs each of the functions supplied as parameters in turn, passing the output
        // of each one to the next one, starting with whatever arguments were passed to the initial invocation.
        // Note that if `var h = compose(f, g)`, `h(x)` calls `g(x)` first, passing the result of that to `f()`.
        var compose = R.compose = function() {  // TODO: type check of arguments?
            var length = arguments.length, func = arguments[--length];
            if (!length) {
                return partially(compose, func);
            }
            while (length--) {
                func = internalCompose(arguments[length], func);
            }
            return func;
        };

        /**
         * XXX
         */
        // Similar to `compose`, but processes the functions in the reverse order so that if if `var h = pipe(f, g)`,
        // `h(x)` calls `f(x)` first, passing the result of that to `g()`.
        R.pipe = function() {  // TODO: type check of arguments?
            if (arguments.length == 1) {
                return partially (R.pipe, arguments[0]);
            }
            return compose.apply(this, _slice(arguments).reverse());
        };
        aliasFor("pipe").is("sequence");

        /**
         * XXX
         */
        // Returns a new function much like the supplied one except that the first two arguments are inverted.
        var flip = R.flip = function (fn) {
            return function (a, b) {
                return arguments.length < 2 ?
                  function(b) { return fn.apply(this, [b, a].concat(_slice(arguments, 1))); } :
                  fn.apply(this, [b, a].concat(_slice(arguments, 2)));
            };
        };

        /**
         * XXX
         */
        // Creates a new function that acts like the supplied function except that the left-most parameters are
        // pre-filled.
        R.lPartial = function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function () {
                return fn.apply(this, concat(args, arguments));
            });
        };
        aliasFor("lPartial").is("applyLeft");

        /**
         * XXX
         */
        // Creates a new function that acts like the supplied function except that the right-most parameters are
        // pre-filled.
        R.rPartial = function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function() {
                return fn.apply(this, concat(arguments, args));
            });
        };
        aliasFor("rPartial").is("applyRight");

        /**
         * XXX
         */
        // Creates a new function that stores the results of running the supplied function and returns those
        // stored value when the same request is made.  **Note**: this really only handles string and number parameters.
        R.memoize = function (fn) {
            var cache = {};
            return function () {
                var position = foldl(function (cache, arg) {
                        return cache[arg] || (cache[arg] = {});
                    }, cache,
                    _slice(arguments, 0, arguments.length - 1));
                var arg = arguments[arguments.length - 1];
                return (position[arg] || (position[arg] = fn.apply(this, arguments)));
            };
        };

        /**
         * XXX
         */
        // Wraps a function up in one that will only call the internal one once, no matter how many times the outer one
        // is called.  ** Note**: this is not really pure; it's mostly meant to keep side-effects from repeating.
        R.once = function (fn) {
            var called = false, result;
            return function () {
                if (called) {
                    return result;
                }
                called = true;
                result = fn.apply(this, arguments);
                return result;
            };
        };

        /**
         * XXX
         */
        // Wrap a function inside another to allow you to make adjustments to the parameters or do other processing
        // either before the internal function is called or with its results.
        R.wrap = function(fn, wrapper) {
            return function() {
                return wrapper.apply(this, concat([fn], arguments));
            };
        };

        /**
         * XXX
         */
        // Wraps a constructor function inside a (curried) plain function that can be called with the same arguments
        // and returns the same type.  Allows, for instance,
        //
        //     var Widget = function(config) { /* ... */ }; // Constructor
        //     Widget.prototype = { /* ... */ }
        //     map(construct(Widget), allConfigs); //=> list of Widgets
        R.construct = function (Fn) {
            var f = function () {
                var obj = new Fn();
                Fn.apply(obj, arguments);
                return obj;
            };
            return Fn.length > 1 ? curry(nAry(Fn.length, f)) : f;
        };

        /**
         * XXX
         */
        // Runs two separate functions against a single one and then calls another
        // function with the results of those initial calls.
        R.fork = function (after) {
            var fns = _slice(arguments, 1);
            return function () {
                var args = arguments;
                return after.apply(this, map(function (fn) {
                    return fn.apply(this, args);
                }, fns));
            };
        };

        // List Functions
        // --------------
        //
        // These functions operate on logical lists, here plain arrays.  Almost all of these are curried, and the list
        // parameter comes last, so you can create a new function by supplying the preceding arguments, leaving the
        // list parameter off.  For instance:
        //
        //     // skip third parameter
        //     var checkAllPredicates = reduce(andFn, alwaysTrue);
        //     // ... given suitable definitions of odd, lt20, gt5
        //     var test = checkAllPredicates([odd, lt20, gt5]);
        //     // test(7) => true, test(9) => true, test(10) => false,
        //     // test(3) => false, test(21) => false,

        // --------

        /**
         * Returns a single item by iterating through the list, successively calling the iterator
         * function and passing it an accumulator value and the current value from the array, and
         * then passing the result to the next call.
         *
         * The iterator function receives two values: *(acc, value)*
         *
         * Note: `ramda.foldl` does not skip deleted or unassigned indices (sparse arrays), unlike
         * the native `Array.prototype.filter` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @alias reduce
         * @param {Function} fn The iterator function. Receives two values, the accumulator and the
         * current element from the array.
         * @param {*} acc The accumulator value.
         * @param {Array} list The list to iterate over.
         * @return {*} Returns the final, accumulated value.
         * @example
         *
         * var numbers = [1, 2, 3];
         * var add = function(a, b) {
         *   return a + b;
         * };
         *
         * foldl(numbers, add, 10); //=> 16
         */
        var foldl = R.foldl =  curry3(function(fn, acc, list) {
            if (hasMethod('foldl', list)) {
                return list.foldl(fn, acc);
            }
            var idx = -1, len = list.length;
            while (++idx < len) {
                acc = fn(acc, list[idx]);
            }
            return acc;
        });
        aliasFor("foldl").is("reduce");

        /**
         * Like `foldl`, but passes additional parameters to the predicate function.
         *
         * The iterator function receives four values: *(acc, value, index, list)*
         *
         * Note: `ramda.foldl.idx` does not skip deleted or unassigned indices (sparse arrays),
         * unlike the native `Array.prototype.filter` method. For more details on this behavior,
         * see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The iterator function. Receives four values: the accumulator, the
         * current element from `list`, that element's index, and the entire `list` itself.
         * @param {*} acc The accumulator value.
         * @param {Array} list The list to iterate over.
         * @return {*} Returns the final, accumulated value.
         * @example
         *
         * var letters = ['a', 'b', 'c'];
         * var objectify = function(accObject, elem, idx, list) {
         *   return accObject[elem] = idx;
         * };
         *
         * foldl.idx(letters, objectify, {}); //=> { 'a': 0, 'b': 1, 'c': 2 }
         */
        R.foldl.idx = curry3(function(fn, acc, list) {
            if (hasMethod('foldl', list)) {
                return list.foldl(fn, acc);
            }
            var idx = -1, len = list.length;
            while (++idx < len) {
                acc = fn(acc, list[idx], idx, list);
            }
            return acc;
        });

        /**
         * Returns a single item by iterating through the list, successively calling the iterator
         * function and passing it an accumulator value and the current value from the array, and
         * then passing the result to the next call.
         *
         * Similar to `foldl`, except moves through the input list from the right to the left.
         *
         * The iterator function receives two values: *(acc, value)*
         *
         * Note: `ramda.foldr` does not skip deleted or unassigned indices (sparse arrays), unlike
         * the native `Array.prototype.filter` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @alias reduceRight
         * @param {Function} fn The iterator function. Receives two values, the accumulator and the
         * current element from the array.
         * @param {*} acc The accumulator value.
         * @param {Array} list The list to iterate over.
         * @return {*} Returns the final, accumulated value.
         * @example
         *
         * var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
         * var flattenPairs = function(acc, pair) {
         *   return acc.concat(pair);
         * };
         *
         * foldr(numbers, flattenPairs, []); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
         */
        var foldr = R.foldr = curry3(function(fn, acc, list) {
            if (hasMethod('foldr', list)) {
                return list.foldr(fn, acc);
            }
            var idx = list.length;
            while (idx--) {
                acc = fn(acc, list[idx]);
            }
            return acc;
        });
        aliasFor("foldr").is("reduceRight");

        /**
         * Like `foldr`, but passes additional parameters to the predicate function. Moves through
         * the input list from the right to the left.
         *
         * The iterator function receives four values: *(acc, value, index, list)*.
         *
         * Note: `ramda.foldr.idx` does not skip deleted or unassigned indices (sparse arrays),
         * unlike the native `Array.prototype.filter` method. For more details on this behavior,
         * see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The iterator function. Receives four values: the accumulator, the
         * current element from `list`, that element's index, and the entire `list` itself.
         * @param {*} acc The accumulator value.
         * @param {Array} list The list to iterate over.
         * @return {*} Returns the final, accumulated value.
         * @example
         *
         * var letters = ['a', 'b', 'c'];
         * var objectify = function(accObject, elem, idx, list) {
         *   return accObject[elem] = idx;
         * };
         *
         * foldr.idx(letters, objectify, {}); //=> { 'c': 2, 'b': 1, 'a': 0 }
         */
        R.foldr.idx = curry3(function (fn, acc, list) {
            if (hasMethod('foldr', list)) {
                return list.foldr(fn, acc);
            }
            var idx = list.length;
            while (idx--) {
                acc = fn(acc, list[idx], idx, list);
            }
            return acc;
        });

        /**
         * Builds a list from a seed value. Accepts an iterator function, which returns either false
         * to stop iteration or an array of length 2 containing the value to add to the resulting
         * list and the seed to be used in the next call to the iterator function.
         *
         * The iterator function receives one argument: *(seed)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
         * either false to quit iteration or an array of length two to proceed. The element at index
         * 0 of this array will be added to the resulting array, and the element at index 1 will be
         * passed to the next call to `fn`.
         * @param {*} seed The seed value.
         * @return {Array} Returns the final list.
         * @example TODO
         */
        R.unfoldr = curry2(function (fn, seed) {
            var pair = fn(seed);
            var result = [];
            while (pair && pair.length) {
                result.push(pair[0]);
                pair = fn(pair[1]);
            }
            return result;
        });

        /**
         * Returns a new list, constructed by applying the supplied function to every element of the
         * supplied list.
         *
         * Note: `ramda.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
         * native `Array.prototype.map` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function to be called on every element of the input `list`.
         * @param {Array} list The list to be iterated over.
         * @return {Array} Returns the new list.
         * @example
         *
         * var double = function(x) {
         *   return x * 2;
         * };
         *
         * ramda.map(double, [1, 2, 3]); //=> [2, 4, 6]
         */
        function map(fn, list) {
            if (hasMethod('map', list)) {
                return list.map(fn);
            }
            var idx = -1, len = list.length, result = new Array(len);
            while (++idx < len) {
                result[idx] = fn(list[idx]);
            }
            return result;
        }
        R.map = curry2(map);

        /**
         * Like `map`, but but passes additional parameters to the predicate function.
         *
         * `fn` receives three arguments: *(value, index, list)*.
         *
         * Note: `ramda.map.idx` does not skip deleted or unassigned indices (sparse arrays), unlike
         * the native `Array.prototype.map` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function to be called on every element of the input `list`.
         * @param {Array} list The list to be iterated over.
         * @return {Array} Returns the new list.
         * @example
         *
         * var squareEnds = function(elt, idx, list) {
         *   if (idx === 0 || idx === list.length - 1) {
         *     return elt * elt;
         *   }
         *   return elt;
         * };
         *
         * ramda.map.idx(squareEnds, [8, 6, 7, 5, 3, 0, 9];
         * //=> [64, 6, 7, 5, 3, 0, 81]
         */
        R.map.idx = curry2(function(fn, list) {
            if (hasMethod('map', list)) {
                return list.map(fn);
            }
            var idx = -1, len = list.length, result = new Array(len);
            while (++idx < len) {
                result[idx] = fn(list[idx], idx, list);
            }
            return result;
        });

        /**
         * Map, but for objects. Creates an object with the same keys as `obj` and values
         * generated by running each property of `obj` through `fn`. `fn` is passed one argument:
         * *(value)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Array} fn A function called for each property in `obj`. Its return value will
         * become a new property on the return object.
         * @param {Object} obj The object to iterate over.
         * @return {Object} Returns new object with the same keys as `obj` and values that are the
         * result of running each property through `fn`.
         * @example
         *
         * var values = { x: 1, y: 2, z: 3 };
         * var double = function(num) {
         *   return num * 2;
         * };
         *
         * ramda.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
         */
        // TODO: consider mapObj.key in parallel with mapObj.idx.  Also consider folding together with `map` implementation.
        R.mapObj = curry2(function (fn, obj) {
            return foldl(function (acc, key) {
                acc[key] = fn(obj[key]);
                return acc;
            }, {}, keys(obj));
        });

        /**
         * Like `mapObj`, but but passes additional arguments to the predicate function. The
         * predicate function is passed three arguments: *(value, key, obj)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Array} fn A function called for each property in `obj`. Its return value will
         * become a new property on the return object.
         * @param {Object} obj The object to iterate over.
         * @return {Object} Returns new object with the same keys as `obj` and values that are the
         * result of running each property through `fn`.
         * @example
         *
         * var values = { x: 1, y: 2, z: 3 };
         * var double = function(num, key, obj) {
         *   return key + num;
         * };
         *
         * ramda.mapObj(double, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
         */
        R.mapObj.idx = function (fn, obj) {
            function _mapObjIdx(obj) {
                return foldl(function (acc, key) {
                    acc[key] = fn(obj[key], key, obj);
                    return acc;
                }, {}, keys(obj));
            }
            return arguments.length < 2 ? _mapObjIdx : _mapObjIdx(obj);
        };

        /**
         * Returns the number of elements in the array by returning `arr.length`.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Array} arr The array to inspect.
         * @return {Number} Returns the size of the array.
         * @example
         *
         * ramda.size([]); //=> 0
         * ramda.size([1, 2, 3]); //=> 3
         */
        R.size = function (arr) {
            return arr.length;
        };

        /**
         * Returns a new list containing only those items that match a given predicate function.
         * The predicate function is passed one argument: *(value)*.
         *
         * Note that `ramda.filter` does not skip deleted or unassigned indices, unlike the native
         * `Array.prototype.filter` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns the new filtered array.
         * @example
         *
         * var isEven = function(n) {
         *     return n % 2 === 0;
         * };
         * var evens = ramda.filter(isEven, [1, 2, 3, 4]); // => [2, 4]
         */
        var filter = function(fn, list) {
            if (hasMethod('filter', list)) {
                return list.filter(fn);
            }
            var idx = -1, len = list.length, result = [];
            while (++idx < len) {
                if (fn(list[idx])) {
                    result.push(list[idx]);
                }
            }
            return result;
        };

        R.filter = curry2(filter);

        /**
         * Like `filter`, but passes additional parameters to the predicate function. The predicate
         * function is passed three arguments: *(value, index, list)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns the new filtered array.
         * @example
         *
         * var lastTwo = function(val, idx, list) {
         *     return list.length - idx <= 2;
         * };
         * ramda.filter.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
         */
        var filterIdx = function(fn, list) {
            if (hasMethod('filter', list)) {
                return list.filter(fn);
            }
            var idx = -1, len = list.length, result = [];
            while (++idx < len) {
                if (fn(list[idx], idx, list)) {
                    result.push(list[idx]);
                }
            }
            return result;
        };

        R.filter.idx = curry2(filterIdx);

        /**
         * Similar to `filter`, except that it keeps only values for which the given predicate
         * function returns falsy. The predicate function is passed one argument: *(value)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns the new filtered array.
         * @example
         *
         * var isEven = function(n) {
         *     return n % 2 === 0;
         * };
         * var odds = ramda.reject(isOdd, [1, 2, 3, 4]); // => [2, 4]
         */
        var reject = function(fn, list) {
            return filter(not(fn), list);
        };

        R.reject = curry2(reject);

        /**
         * Like `reject`, but passes additional parameters to the predicate function. The predicate
         * function is passed three arguments: *(value, index, list)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns the new filtered array.
         * @example
         *
         * var lastTwo = function(val, idx, list) {
         *     return list.length - idx <= 2;
         * };
         *
         * reject.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
         */
        R.reject.idx = curry2(function(fn, list) {
            return filterIdx(not(fn), list);
        });

        /**
         * Returns a new list containing the first `n` elements of a given list, passing each value
         * to the supplied predicate function, and terminating when the predicate function returns
         * `false`. Excludes the element that caused the predicate function to fail. The predicate
         * function is passed one argument: *(value)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns a new array.
         * @example
         *
         * var isNotFour = function(x) {
         *   return !(x === 4);
         * };
         *
         * takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
         */
        R.takeWhile = curry2(function(fn, list) {
            if (hasMethod('takeWhile', list)) {
                return list.takeWhile(fn);
            }
            var idx = -1, len = list.length;
            while (++idx < len && fn(list[idx])) {}
            return _slice(list, 0, idx);
        });


        /**
         * Returns a new list containing the first `n` elements of the given list.  If
         * `n > * list.length`, returns a list of `list.length` elements.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Number} n The number of elements to return.
         * @param {Array} list The array to query.
         * @return {Array} Returns a new array containing the first elements of `list`.
         */
        R.take = curry2(function(n, list) {
            if (hasMethod('take', list)) {
                return list.take(n);
            }
            var ls = clone(list);
            ls.length = Math.min(n, list.length);
            return ls;
        });

        /**
         * Returns a new list containing the last `n` elements of a given list, passing each value
         * to the supplied predicate function, beginning when the predicate function returns
         * `true`. Excludes the element that caused the predicate function to fail. The predicate
         * function is passed one argument: *(value)*.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function called per iteration.
         * @param {Array} list The collection to iterate over.
         * @return {Array} Returns a new array.
         * @example
         *
         * var isNotTwo = function(x) {
         *   return !(x === 2);
         * };
         *
         * skipUntil(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
         */
        R.skipUntil = curry2(function (fn, list) {
            var idx = -1, len = list.length;
            while (++idx < len && !fn(list[idx])) {}
            return _slice(list, idx);
        });

        /**
         * Returns a new list containing all but the first `n` elements of the given `list`.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Number} n The number of elements of `list` to skip.
         * @param {Array} list The array to consider.
         * @return {Array} Returns the last `n` elements of `list`.
         */
        R.skip = curry2(function(n, list) {
            if (hasMethod('skip', list)) {
                return list.skip(n);
            }
            return _slice(list, n);
        });
        aliasFor('skip').is('drop');

        /**
         * XXX
         */
        // Returns the first element of the list which matches the predicate, or `undefined` if no element matches.
        R.find = function (fn, list) {
            function _find(list) {
                var idx = -1;
                var len = list.length;
                while (++idx < len) {
                    if (fn(list[idx])) {
                        return list[idx];
                    }
                }
                return undef;
            }
            return arguments.length < 2 ? _find : _find(list);
        };

        /**
         * XXX
         */
        // Returns the index of first element of the list which matches the predicate, or `undefined` if no element matches.
        R.findIndex = curry2(function(fn, list) {
            var idx = -1;
            var len = list.length;
            while (++idx < len) {
                if (fn(list[idx])) {
                    return idx;
                }
            }
            return -1;
        });

        /**
         * XXX
         */
        // Returns the last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLast = curry2(function(fn, list) {
            var idx = list.length;
            while (--idx) {
                if (fn(list[idx])) {
                    return list[idx];
                }
            }
            return undef;
        });

        /**
         * XXX
         */
        // Returns the index of last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLastIndex = curry2(function(fn, list) {
            var idx = list.length;
            while (--idx) {
                if (fn(list[idx])) {
                    return idx;
                }
            }
            return -1;
        });

        /**
         * XXX
         */
        // Returns `true` if all elements of the list match the predicate, `false` if there are any that don't.
        var all = function(fn, list) {
            var i = -1;
            while (++i < list.length) {
                if (!fn(list[i])) {
                    return false;
                }
            }
            return true;
        };
        R.all = curry2(all);
        aliasFor("all").is("every");


        /**
         * XXX
         */
        // Returns `true` if any elements of the list match the predicate, `false` if none do.
        var any = function (fn, list) {
            var i = -1;
            while (++i < list.length) {
                if (fn(list[i])) {
                    return true;
                }
            }
            return false;
        };
        R.any = curry2(any);
        aliasFor("any").is("some");

        /**
         * XXX
         */
        // Internal implementations of indexOf and lastIndexOf

        // Return the position of the first occurrence of an item in an array,
        // or -1 if the item is not included in the array.
        var indexOf = function(array, item, from) {
            var i = 0, length = array.length;
            if (typeof from == 'number') {
                i = from < 0 ? Math.max(0, length + from) : from;
            }
            for (; i < length; i++) {
                if (array[i] === item) return i;
            }
            return -1;
        };

        /**
         * XXX
         */
        var lastIndexOf = function(array, item, from) {
            var idx = array.length;
            if (typeof from == 'number') {
                idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
            }
            while (--idx >= 0) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };

        /**
         * XXX
         */
        // Returns the first zero-indexed position of an object in a flat list
        R.indexOf = curry2(function _indexOf(target, list) {
            return indexOf(list, target);
        });

        /**
         * XXX
         */
        R.indexOf.from = curry3(function indexOfFrom(target, fromIdx, list) {
            return indexOf(list, target, fromIdx);
        });

        /**
         * XXX
         */
        // Returns the last zero-indexed position of an object in a flat list
        R.lastIndexOf = curry2(function _lastIndexOf(target, list) {
            return lastIndexOf(list, target);
        });

        /**
         * XXX
         */
        R.lastIndexOf.from = curry3(function lastIndexOfFrom(target, fromIdx, list) {
            return lastIndexOf(list, target, fromIdx);
        });

        /**
         * XXX
         */
        // Returns `true` if the list contains the sought element, `false` if it does not.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        function contains(a, list) {
            return indexOf(list, a) > -1;
        }
        R.contains = curry2(contains);


        /**
         * XXX
         */
        // Returns `true` if the list contains the sought element, `false` if it does not, based upon the value
        // returned by applying the supplied predicated to two list elements.  Equality is strict here, meaning
        // reference equality for objects and non-coercing equality for primitives.  Probably inefficient.
        var containsWith = function (pred, x, list) {
            var idx = -1, len = list.length;
            while (++idx < len) {
                if (pred(x, list[idx])) {
                    return true;
                }
            }
            return false;
        };
        R.containsWith = curry3(containsWith);

        /**
         * XXX
         */
        // Returns a new list containing only one copy of each element in the original list.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var uniq = R.uniq = foldr(function (acc, x) {
            return (contains(x, acc)) ? acc : prepend(x, acc);
        }, []);

        /**
         * XXX
         */
        // returns `true` if all of the elements in the `list` are unique.
        R.isSet = function (list) {
            for (var i = 0; i < list.length; i++) {
                if (indexOf(list, list[i], i+1) >= 0) return false;
            }
            return true;
        };

        /**
         * XXX
         */
        // Returns a new list containing only one copy of each element in the original list, based upon the value
        // returned by applying the supplied predicate to two list elements.   Equality is strict here,  meaning
        // reference equality for objects and non-coercing equality for primitives.
        var uniqWith = R.uniqWith = curry2(function(pred, list) {
            return foldr(function (acc, x) {
                return (containsWith(pred, x, acc)) ? acc : prepend(x, acc);
            }, [], list);
        });


        /**
         * XXX
         */
        // Returns a new list by plucking the same named property off all objects in the list supplied.
        var pluck = R.pluck = curry2(function(p, list) {
            return map(prop(p), list);
        });

        /**
         * XXX
         */
        // Returns a list that contains a flattened version of the supplied list.  For example:
        //
        //     flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
        //     // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var flatten = R.flatten = function(list) {
            var output = [], idx = 0, value;
            for (var i = 0, length = list.length; i < length; i++) {
              value = list[i];
              if (isArray(value)) {
                //flatten current level of array or arguments object
                value = flatten(value);
                var j = 0, len = value.length;
                output.length += len;
                while (j < len) {
                  output[idx++] = value[j++];
                }
              } else {
                output[idx++] = value;
              }
            }
            return output;
        };

        /**
         * XXX
         */
        // Creates a new list out of the two supplied by applying the function to each equally-positioned pair in the
        // lists.  For example,
        //
        //     zipWith(f, [1, 2, 3], ['a', 'b', 'c'])
        //     //    => [f(1, 'a'), f(2, 'b'), f(3, 'c')];
        //
        // Note that the output list will only be as long as the length of the shorter input list.
        R.zipWith = curry3(function(fn, a, b) {
            var rv = [], i = -1, len = Math.min(a.length, b.length);
            while (++i < len) {
                rv[i] = fn(a[i], b[i]);
            }
            return rv;
        });

        /**
         * XXX
         */
        // Creates a new list out of the two supplied by yielding the pair of each equally-positioned pair in the
        // lists.  For example,
        //
        //     zip([1, 2, 3], ['a', 'b', 'c'])
        //     //    => [[1, 'a'], [2, 'b'], [3, 'c']];
        R.zip = curry2(function(a, b) { // = zipWith(prepend);
            var rv = [];
            var i = -1;
            var len = Math.min(a.length, b.length);
            while (++i < len) {
                rv[i] = [a[i], b[i]];
            }
            return rv;
        });

        /**
         * XXX
         */
        // Creates a new list out of the two supplied by applying the function to each possible pair in the lists.
        //  For example,
        //
        //     xProdWith(f, [1, 2], ['a', 'b'])
        //     //    => [f(1, 'a'), f(1, 'b'), f(2, 'a'), f(2, 'b')];
        R.xprodWith = curry3(function (fn, a, b) {
            if (isEmpty(a) || isEmpty(b)) {
                return [];
            }
            var i = -1, ilen = a.length, j, jlen = b.length, result = []; // better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
            while (++i < ilen) {
                j = -1;
                while (++j < jlen) {
                    result.push(fn(a[i], b[j]));
                }
            }
            return result;
        });

        /**
         * XXX
         */
        // Creates a new list out of the two supplied by yielding the pair of each possible pair in the lists.
        // For example,
        //
        //     xProd([1, 2], ['a', 'b'])
        //     //    => [[1, 'a'], [1, 'b')], [2, 'a'], [2, 'b']];
        R.xprod = curry2(function (a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
            if (isEmpty(a) || isEmpty(b)) {
                return [];
            }
            var i = -1;
            var ilen = a.length;
            var j;
            var jlen = b.length;
            var result = []; // better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
            while (++i < ilen) {
                j = -1;
                while (++j < jlen) {
                    result.push([a[i], b[j]]);
                }
            }
            return result;
        });

        /**
         * XXX
         */
        // Returns a new list with the same elements as the original list, just in the reverse order.
        R.reverse = function (list) {
            return clone(list || []).reverse();
        };

        /**
         * XXX
         */
        // // Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
        // For example,
        //
        //     range(1, 5) // => [1, 2, 3, 4]
        //     range(50, 53) // => [50, 51, 52]
        R.range = curry2(function (from, to) {
            if (from >= to) {
                return [];
            }
            var idx = 0, result = new Array(Math.floor(to) - Math.ceil(from));
            for (; from < to; idx++, from++) {
                result[idx] = from;
            }
            return result;
        });

        /**
         * XXX
         */
        // Returns the elements of the list as a string joined by a separator.
        R.join = invoker("join", Array.prototype);

        /**
         * XXX
         */
        // Returns the sublist of a list starting with the first index and
        // ending before the second one.
        R.slice = invoker("slice", Array.prototype);
        /**
         * XXX
         */
        R.slice.from = flip(R.slice)(undef);

        /**
         * XXX
         */
        // Removes the sub-list of `list` starting at index `start` and containing
        // `count` elements.  _Note that this is not destructive_: it returns a
        // copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.remove = curry3(function(start, count, list) {
            return concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
        });

        /**
         * XXX
         */
        // Inserts the supplied element into the list, at index `index`.  _Note
        // that this is not destructive_: it returns a copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.insert = curry3(function(index, elt, list) {
            index = index < list.length && index >= 0 ? index : list.length;
            return concat(append(elt, _slice(list, 0, index)), _slice(list, index));
        });

        /**
         * XXX
         */
        // Inserts the sub-list into the list, at index `index`.  _Note  that this
        // is not destructive_: it returns a copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.insert.all = curry3(function(index, elts, list) {
            index = index < list.length && index >= 0 ? index : list.length;
            return concat(concat(_slice(list, 0, index), elts), _slice(list, index));
        });

        /**
         * XXX
         */
        // Returns the `n`th element of a list (zero-indexed)
        R.nth = function (n, list) {
             return arguments.length < 2 ? function _nth(list) { return list[n]; } : list[n];
        };

        /**
         * XXX
         */
        // Makes a comparator function out of a function that reports whether the first element is less than the second.
        //
        //     var cmp = comparator(function(a, b) {
        //         return a.age < b.age;
        //     };
        //     sort(cmp, people);
        var comparator = R.comparator = function(pred) {
            return function (a, b) {
                return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
            };
        };

        /**
         * XXX
         */
        // Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
        // time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
        // if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
        var sort = R.sort = function(comparator, list) {
            return arguments.length < 2 ?
                function _sort(list) { return clone(list).sort(comparator); } :
                clone(list).sort(comparator);
        };

        // Splits a list into sublists stored in an object, based on the result of calling a String-returning function
        // on each element, and grouping the results according to values returned.
        //
        //     var byGrade = partition(function(student) {
        //         var score = student.score
        //         return (score < 65) ? 'F' : (score < 70) ? 'D' :
        //                (score < 80) ? 'C' : (score < 90) ? 'B' : 'A';
        //     };
        //     var students = [{name: "Abby", score: 84} /*, ... */,
        //                     {name: 'Jack', score: 69}];
        //     byGrade(students);
        //     //=> {
        //     //   "A": [{name: 'Dianne', score: 99} /*, ... */],
        //     //   "B": [{name: "Abby", score: 84} /*, ... */]
        //     //   /*, ... */
        //     //   "F": [{name: 'Eddy', score: 58}]
        //     // }

        /**
         * XXX
         */
        R.partition = curry2(function (fn, list) {
            return foldl(function (acc, elt) {
                var key = fn(elt);
                acc[key] = append(elt, acc[key] || (acc[key] = []));
                return acc;
            }, {}, list);
        });
        aliasFor("partition").is("groupBy");

        // Object Functions
        // ----------------
        //
        // These functions operate on plain Javascript object, adding simple functions to test properties on these
        // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
        // objects.

        // --------

        /**
         * XXX
         */
        // Runs the given function with the supplied object, then returns the object.
        R.tap = curry2(function(x, fn) {
            if (typeof fn === "function") { fn(x); }
            return x;
        });
        aliasFor("tap").is("K");

        /**
         * XXX
         */
        // Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
        // non-coercing equality for primitives.
        R.eq = function (a, b) {
            return arguments.length < 2 ? function _eq(b) { return a === b; } : a === b;
        };

        /**
         * XXX
         */
        // Returns a function that when supplied an object returns the indicated property of that object, if it exists.
        var prop = R.prop = function (p, obj) {
            return arguments.length < 2 ? function _prop(obj) { return obj[p]; } :  obj[p];
        };
        aliasFor("prop").is("get"); // TODO: are we sure?  Matches some other libs, but might want to reserve for other use.


        /**
         * XXX
         */
        // Returns a function that when supplied an object returns the result of running the indicated function on
        // that object, if it has such a function.
        R.func = function (fn, obj) {
            function _func(obj) {
                return obj[fn].apply(obj, _slice(arguments, 1));
            }
            return arguments.length < 2 ? _func : _func(obj);
        };


        /**
         * XXX
         */
        // Returns a function that when supplied a property name returns that property on the indicated object, if it
        // exists.
        R.props = function (obj, prop) {
            return arguments.length < 2 ? function _props(prop) { return obj && obj[prop]; } : obj && obj[prop];
        };


        /**
         * XXX
         */
        // Returns a function that always returns the given value.
        var always = R.always = function (val) {
            return function () {
                return val;
            };
        };
        aliasFor("always").is("constant");


        /**
         * XXX
         */
        var anyBlanks = R.any(function (val) {
            return val === null || val === undef;
        });

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var nativeKeys = Object.keys;

        /**
         * XXX
         */
        // Returns a list containing the names of all the enumerable own
        // properties of the supplied object.
        var keys = R.keys = function (obj) {
            if (nativeKeys) return nativeKeys(Object(obj));
            var prop, ks = [];
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    ks.push(prop);
                }
            }
            return ks;
        };

        /**
         * XXX
         */
        // Returns a list containing the names of all the
        // properties of the supplied object, including prototype properties.
        R.keysIn = function (obj) {
            var prop, ks = [];
            for (prop in obj) {
                ks.push(prop);
            }
            return ks;
        };

        /**
         * XXX
         */
        // Returns a list of all the enumerable own properties of the supplied object.
        R.values = function (obj) {
            var prop, props = keys(obj),
                length = props.length,
                vals = new Array(length);
            for (var i = 0; i < length; i++) {
                vals[i] = obj[props[i]];
            }
            return vals;
        };

        /**
         * XXX
         */
        // Returns a list of all the properties, including prototype properties,
        // of the supplied object.
        R.valuesIn = function (obj) {
            var prop, vs = [];
            for (prop in obj) {
                vs.push(obj[prop]);
            }
            return vs;
        };

        /**
         * XXX
         */
        // internal helper function
        function pickWith(test, obj) {
            var copy = {},
                props = keys(obj), prop, val;
            for (var i = 0, len = props.length; i < len; i++) {
                prop = props[i];
                val = obj[prop];
                if (test(val, prop, obj)) {
                    copy[prop] = val;
                }
            }
            return copy;
        }

        /**
         * XXX
         */
        // Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
        // property is ignored
        R.pick = curry2(function pick(names, obj) {
            return pickWith(function(val, key) {
                return contains(key, names);
            }, obj);
        });

        /**
         * XXX
         */
        // Returns a partial copy of an object omitting the keys specified.
        R.omit = curry2(function omit(names, obj) {
            return pickWith(function(val, key) {
                return !contains(key, names);
            }, obj);
        });

        /**
         * XXX
         */
        R.pickWith = curry2(pickWith);

        /**
         * XXX
         */
        // Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
        var pickAll = function (names, obj) {
            var copy = {};
            each(function (name) {
                copy[name] = obj[name];
            }, names);
            return copy;
        };

        /**
         * XXX
         */
        R.pickAll = curry2(pickAll);

        /**
         * XXX
         */
        // Returns a new object that mixes in the own properties of two objects.
        R.mixin = curry2(function(a, b) {
            var mixed = pickAll(R.keys(a), a);
            each(function(key) {
                mixed[key] = b[key];
            }, R.keys(b));
            return mixed;
        });

        /**
         * XXX
         */
        // Reports whether two functions have the same value for the specified property.  Useful as a curried predicate.
        R.eqProps = function (prop, obj1, obj2) {
            var f1 = function eqPropsCurried1(obj1, obj2) {
                var f2 = function eqPropsCurried2(obj2) {
                    return obj1[prop] === obj2[prop];
                };
                return arguments.length < 2 ? f2 : f2(obj2);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(obj1) :
                    f1(obj1, obj2);
        };

        /**
         * XXX
         */
        // internal helper for `where`
        function satisfiesSpec(spec, parsedSpec, testObj) {
            if (spec === testObj) { return true; }
            testObj = Object(testObj);
            // parsed spec is an object {"true": [functions], "false": [non-functions]}
            var funcProps = parsedSpec[true],
                props = parsedSpec[false];
            var key, val, tVal;
            for (var i = 0, length = props ? props.length : 0; i < length; i++) {
                key = props[i];
                tVal = testObj[key];
                if (!(tVal !== undef || key in testObj) || spec[key] !== tVal) {
                    return false;
                }
            }
            for (i = 0, length = funcProps ? funcProps.length : 0; i < length; i++) {
                key = funcProps[i];
                val = spec[key];
                tVal = testObj[key];
                if (!(tVal !== undef || key in testObj) || !val(tVal, testObj)) { 
                    return false; 
                }                
            }
            return true;
        }

        /**
         * XXX
         */
        // `where` takes a spec object and a test object and returns true if the test satisfies the spec. 
        // Any property on the spec that is not a function is interpreted as an equality 
        // relation. For example:
        //
        //     var spec = {x: 2};
        //     where(spec, {w: 10, x: 2, y: 300}); // => true, x === 2
        //     where(spec, {x: 1, y: 'moo', z: true}); // => false, x !== 2
        //
        // If the spec has a property mapped to a function, then `where` evaluates the function, passing in
        // the test object's value for the property in question, as well as the whole test object. For example:
        //
        //     var spec = {x: function(val, obj) { return  val + obj.y > 10; };
        //     where(spec, {x: 2, y: 7}); // => false
        //     where(spec, {x: 3, y: 8}); // => true
        //
        // `where` is well suited to declarativley expressing constraints for other functions, e.g., `filter`:
        //
        //     var xs = [{x: 2, y: 1}, {x: 10, y: 2},
        //               {x: 8, y: 3}, {x: 10, y: 4}];
        //     var fxs = filter(where({x: 10}), xs);
        //     // fxs ==> [{x: 10, y: 2}, {x: 10, y: 4}]
        //
        R.where = function where(spec, testObj) {
            var parsedSpec = R.partition(function(key) { 
                    return typeof spec[key] === "function";
                }, keys(spec)
            );
            switch (arguments.length) {
                case 0: throw NO_ARGS_EXCEPTION;
                case 1:
                    return function(testObj) {
                        return satisfiesSpec(spec, parsedSpec, testObj);
                    };
            }
            return satisfiesSpec(spec, parsedSpec, testObj);
        };

        // Miscellaneous Functions
        // -----------------------
        //
        // A few functions in need of a good home.

        // --------

        /**
         * XXX
         */
        // Expose the functions from ramda as properties on another object.  If the passed-in object is the
        // global object, or the passed-in object is "falsy", then the ramda functions become global functions.
        R.installTo = function(obj) {
            each(function(key) {
                (obj || global)[key] = R[key];
            })(keys(R));
        };

        /**
         * XXX
         */
        // A function that always returns `0`.
        R.alwaysZero = always(0);

        /**
         * XXX
         */
        // A function that always returns `false`.
        R.alwaysFalse = always(false);

        /**
         * XXX
         */
        // A function that always returns `true`.
        R.alwaysTrue = always(true);



        // Logic Functions
        // ---------------
        //
        // These functions are very simple wrappers around the built-in logical operators, useful in building up
        // more complex functional forms.

        // --------

        /**
         * XXX
         */
        // A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
        // value.
        R.and = function(f, g) {
           function _and(g) {
               return function() {return !!(f.apply(this, arguments) && g.apply(this, arguments));};
           }
            return arguments.length < 2 ? _and : _and(g);
        };

        /**
         * XXX
         */
        // A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
        // value. (Note also that at least Oliver Twist can pronounce this one...)
        R.or = function(f, g) { // TODO: arity?
           function _or(g) {
               return function() {return !!(f.apply(this, arguments) || g.apply(this, arguments));};
           }
            return arguments.length < 2 ? _or : _or(g);
        };

        /**
         * XXX
         */
        // A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
        // underlying function would return a false-y value, and `false` when it would return a truth-y one.
        var not = R.not = function (f) {
            return function() {return !f.apply(this, arguments);};
        };

        /**
         * XXX
         */
        // Create a predicate wrapper which will call a pick function (all/any) for each predicate
        var predicateWrap = function(predPicker) {
            return function(preds /* , args */) {
                var predIterator = function() {
                    var args = arguments;
                    return predPicker(function(predicate) {
                        return predicate.apply(null, args);
                    }, preds);
                };
                return arguments.length > 1 ?
                        // Call function imediately if given arguments
                        predIterator.apply(null, _slice(arguments, 1)) :
                        // Return a function which will call the predicates with the provided arguments
                        arity(max(pluck("length", preds)), predIterator);
            };
        };

        /**
         * XXX
         */
        // Given a list of predicates returns a new predicate that will be true exactly when all of them are.
        R.allPredicates = predicateWrap(all);

        /**
         * XXX
         */
        // Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
        R.anyPredicates = predicateWrap(any);

        // Arithmetic Functions
        // --------------------
        //
        // These functions wrap up the certain core arithmetic operators

        // --------

        /**
         * XXX
         */
        // Adds two numbers.  Automatic curried:
        //
        //     var add7 = add(7);
        //     add7(10); // => 17
        var add = R.add = function(a, b) {
            return arguments.length < 2 ? function(b) { return a + b; } :  a + b;
        };

        /**
         * XXX
         */
        // Multiplies two numbers.  Automatically curried:
        //
        //     var mult3 = multiply(3);
        //     mult3(7); // => 21
        var multiply = R.multiply = function(a, b) {
            return arguments.length < 2 ? function(b) { return a * b; } :  a * b;
        };

        /**
         * XXX
         */
        // Subtracts the second parameter from the first.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `subtractN` might be what's wanted.
        //
        //     var complementaryAngle = subtract(90);
        //     complementaryAngle(30) ; // => 60
        var subtract = R.subtract = function(a, b) {
            return arguments.length < 2 ? function(b) { return a - b; } :  a - b;
        };

        /**
         * XXX
         */
        // Reversed version of `subtract`, where first parameter is subtracted from the second.  The curried version of
        // this one might me more useful than that of `subtract`.  For instance:
        //
        //     var decrement = subtractN(1);
        //     decrement(10); // => 9;
        R.subtractN = flip(subtract);

        /**
         * XXX
         */
        // Divides the first parameter by the second.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `divideBy` might be what's wanted.
        var divide = R.divide = function(a, b) {
            return arguments.length < 2 ? function(b) { return a / b; } :  a / b;
        };

        /**
         * XXX
         */
        // Reversed version of `divide`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `divide`.  For instance:
        //
        //     var half = divideBy(2);
        //     half(42); // => 21
        R.divideBy = flip(divide);

        /**
         * XXX
         */
        // Divides the second parameter by the first and returns the remainder.
        var modulo = R.modulo = function(a, b) {
            return arguments.length < 2 ? function(b) { return a % b; } :  a % b;
        };

        /**
         * XXX
         */
        // Reversed version of `modulo`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `modulo`.  For instance:
        //
        //     var isOdd = moduloBy(2);
        //     isOdd(42); // => 0
        //     isOdd(21); // => 1
        R.moduloBy = flip(modulo);

        /**
         * XXX
         */
        // Adds together all the elements of a list.
        R.sum = foldl(add, 0);

        /**
         * XXX
         */
        // Multiplies together all the elements of a list.
        R.product = foldl(multiply, 1);

        /**
         * XXX
         */
        // Returns true if the first parameter is less than the second.
        R.lt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a < b; } :  a < b;
        };

        /**
         * XXX
         */
        // Returns true if the first parameter is less than or equal to the second.
        R.lte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a <= b; } :  a <= b;
        };

        /**
         * XXX
         */
        // Returns true if the first parameter is greater than the second.
        R.gt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a > b; } :  a > b;
        };

        /**
         * XXX
         */
        // Returns true if the first parameter is greater than or equal to the second.
        R.gte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a >= b; } :  a >= b;
        };

        /**
         * XXX
         */
        // Determines the largest of a list of numbers (or elements that can be cast to numbers)
        var max = R.max = function(list) {
            return foldl(binary(Math.max), -Infinity, list);
        };

        /**
         * XXX
         */
        // Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.maxWith = curry2(function(keyFn, list) {
            if (!(list && list.length > 0)) {
               return undef;
            }
            var idx = 0, winner = list[idx], max = keyFn(winner), testKey;
            while (++idx < list.length) {
                testKey = keyFn(list[idx]);
                if (testKey > max) {
                    max = testKey;
                    winner = list[idx];
                }
            }
            return winner;
        });

        /**
         * XXX
         */
        // TODO: combine this with maxWith?

        // Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.minWith = curry2(function(keyFn, list) {
            if (!(list && list.length > 0)) {
                return undef;
            }
            var idx = 0, winner = list[idx], min = keyFn(list[idx]), testKey;
            while (++idx < list.length) {
                testKey = keyFn(list[idx]);
                if (testKey < min) {
                    min = testKey;
                    winner = list[idx];
                }
            }
            return winner;
        });


        /**
         * XXX
         */
        // Determines the smallest of a list of numbers (or elements that can be cast to numbers)
        R.min = function(list) {
            return foldl(binary(Math.min), Infinity, list);
        };


        // String Functions
        // ----------------
        //
        // Much of the String.prototype API exposed as simple functions.

        // --------

        /**
         * XXX
         */
        // A substring of a String:
        //
        //     substring(2, 5, "abcdefghijklm"); //=> "cde"
        var substring = R.substring = invoker("substring", String.prototype);

        /**
         * XXX
         */
        // The trailing substring of a String starting with the nth character:
        //
        //     substringFrom(8, "abcdefghijklm"); //=> "ijklm"
        R.substringFrom = flip(substring)(undef);

        /**
         * XXX
         */
        // The leading substring of a String ending before the nth character:
        //
        //     substringTo(8, "abcdefghijklm"); //=> "abcdefgh"
        R.substringTo = substring(0);

        /**
         * XXX
         */
        // The character at the nth position in a String:
        //
        //     charAt(8, "abcdefghijklm"); //=> "i"
        R.charAt = invoker("charAt", String.prototype);

        /**
         * XXX
         */
        // The ascii code of the character at the nth position in a String:
        //
        //     charCodeAt(8, "abcdefghijklm"); //=> 105
        //     // (... 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105)
        R.charCodeAt = invoker("charCodeAt", String.prototype);

        /**
         * XXX
         */
        // Tests a regular expression agains a String
        //
        //     match(/([a-z]a)/g, "bananas"); //=> ["ba", "na", "na"]
        R.match = invoker("match", String.prototype);

        /**
         * XXX
         */
        // Finds the index of a substring in a string, returning -1 if it's not present
        //
        //     strIndexOf('c', 'abcdefg) //=> 2
        R.strIndexOf = invoker("indexOf", String.prototype);

        /**
         * XXX
         */
        // Finds the last index of a substring in a string, returning -1 if it's not present
        //
        //     strLastIndexOf('a', 'banana split') //=> 5
        R.strLastIndexOf = invoker("lastIndexOf", String.prototype);

        /**
         * XXX
         */
        // The uppercase version of a string.
        //
        //     toUpperCase('abc') //=> 'ABC'
        R.toUpperCase = invoker("toUpperCase", String.prototype);

        /**
         * XXX
         */
        // The lowercase version of a string.
        //
        //     toLowerCase('XYZ') //=> 'xyz'
        R.toLowerCase = invoker("toLowerCase", String.prototype);


        /**
         * XXX
         */
        // The string split into substring at the specified token
        //
        //     split('.', 'a.b.c.xyz.d') //=>
        //         ['a', 'b', 'c', 'xyz', 'd']
        R.split = invoker("split", String.prototype, 1);

        /**
         * XXX
         */
        // internal path function
        // Takes an array, paths, indicating the deep set of keys
        // to find. E.g.
        // path(['a', 'b'], {a: {b: 2}}) // => 2
        function path(paths, obj) {
            var i = -1, length = paths.length, val;
            while (obj != null && ++i < length) {
                obj = val = obj[paths[i]];
            }
            return val;
        }

        /**
         * XXX
         */
        // Retrieve a computed path by a function, fn. Fn will be given
        // a string, str which it will use to compute the path
        // e.g. fn("a.b") => ["a", "b"]
        // This path will be looked up on the object
        R.pathWith = curry3(function pathWith(fn, str, obj) {
            var paths = fn(str) || [];
            return path(paths, obj);
        });

        /**
         * XXX
         */
        // Retrieve a value on an object from a deep path, str
        // different properties on nested objects are indicated in string
        // by a seperator, sep
        // R.pathOn("|", "a|b", {a: {b: 2}}) // => 2
        R.pathOn = curry3(function pathOn(sep, str, obj) {
            return path(str.split(sep), obj);
        });

        /**
         * XXX
         */
        // Retrieve a nested path on an object seperated by periods
        // R.path('a.b'], {a: {b: 2}}) // => 2
        R.path = R.pathOn('.');

        // Data Analysis and Grouping Functions
        // ------------------------------------
        //
        // Functions performing SQL-like actions on lists of objects.  These do not have any SQL-like optimizations
        // performed on them, however.

        // --------

        /**
         * XXX
         */
        // Reasonable analog to SQL `select` statement.
        //
        //     var kids = [
        //         {name: 'Abby', age: 7, hair: 'blond', grade: 2},
        //         {name: 'Fred', age: 12, hair: 'brown', grade: 7}
        //     ];
        //     project(['name', 'grade'], kids);
        //     //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
        R.project = useWith(map, R.pickAll, identity); // passing `identity` gives correct arity

        /**
         * XXX
         */
        // Determines whether the given property of an object has a specific value
        // Most likely used to filter a list:
        //
        //     var kids = [
        //       {name: 'Abby', age: 7, hair: 'blond'},
        //       {name: 'Fred', age: 12, hair: 'brown'},
        //       {name: 'Rusty', age: 10, hair: 'brown'},
        //       {name: 'Alois', age: 15, disposition: 'surly'}
        //     ];
        //     filter(propEq("hair", "brown"), kids);
        //     //=> Fred and Rusty
        R.propEq = function (name, val, obj) {
            var f1 = function propEqCurried1(val, obj) {
                var f2 = function propEqCurried2(obj) {
                    return obj[name] === val;
                };
                return arguments.length < 2 ? f2 : f2(obj);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(val) :
                    f1(val, obj);
        };

        /**
         * XXX
         */
        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.
        R.union = compose(uniq, merge);

        /**
         * XXX
         */
        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
        // determined according to the value returned by applying the supplied predicate to two list elements.
        R.unionWith = curry3(function (pred, list1, list2) {
            return uniqWith(pred, merge(list1, list2));
        });

        /**
         * XXX
         */
        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        R.difference = curry2(function(first, second) {
            return uniq(reject(flip(contains)(second), first));
        });

        /**
         * XXX
         */
        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        // Duplication is determined according to the value returned by applying the supplied predicate to two list
        // elements.
        R.differenceWith = function (pred, first, second) {
            var f1 = function differenceWithCurried1(first, second) {
                var f2 = function differenceWithCurried2(second) {
                    return uniqWith(pred)(reject(flip(R.containsWith(pred))(second), first));
                };
                return arguments.length < 2 ? f2 : f2(second);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(first) :
                    f1(first, second);
        };

        // Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
        R.intersection = function(list1, list2) {
            function _intersection(list2) {
                return uniq(filter(flip(contains)(list1), list2));
            }
            return arguments.length < 2 ? _intersection : _intersection(list2);
        };

        /**
         * XXX
         */
        // Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
        // Duplication is determined according to the value returned by applying the supplied predicate to two list
        // elements.
        R.intersectionWith = function (pred, list1, list2) {
            var f1 = function intersectionWithCurried1(list1, list2) {
                var f2 = function intersectionWithCurried2(list2) {
                    var results = [], idx = -1;
                    while (++idx < list1.length) {
                        if (containsWith(pred, list1[idx], list2)) {
                            results[results.length] = list1[idx];
                        }
                    }
                    return uniqWith(pred, results);
                };
                return arguments.length < 2 ? f2 : f2(list2);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(list1) :
                    f1(list1, list2);
        };

        /**
         * XXX
         */
        // Creates a new list whose elements each have two properties: `val` is the value of the corresponding
        // item in the list supplied, and `key` is the result of applying the supplied function to that item.
        var keyValue = function(fn, list) { // TODO: Should this be made public?
            function _keyValue(list) {
                return map(function(item) {return {key: fn(item), val: item};}, list);
            }
            return arguments.length < 2 ? _keyValue : _keyValue(list);
        };

        /**
         * XXX
         */
        // Sorts the list according to a key generated by the supplied function.
        R.sortBy = function(fn, list) {
            /*
              return sort(comparator(function(a, b) {return fn(a) < fn(b);}), list); // clean, but too time-inefficient
              return pluck("val", sort(comparator(function(a, b) {return a.key < b.key;}), keyValue(fn, list))); // nice, but no need to clone result of keyValue call, so...
            */
            function _sortBy(list) {
                return pluck("val", keyValue(fn, list).sort(comparator(function(a, b) {return a.key < b.key;})));
            }
            return arguments.length < 2 ? _sortBy : _sortBy(list);
        };

        /**
         * XXX
         */
        // Counts the elements of a list according to how many match each value of a key generated by the supplied function.
        R.countBy = function(fn, list) {
            function _countBy(list) {
                return foldl(function(counts, obj) {
                    counts[obj.key] = (counts[obj.key] || 0) + 1;
                    return counts;
                }, {}, keyValue(fn, list));
            }
            return arguments.length < 2 ? _countBy : _countBy(list);
        };

        // All the functional goodness, wrapped in a nice little package, just for you!
        return R;
    }());
}));
