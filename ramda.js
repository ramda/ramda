//     ramda.js 0.2.0
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

        var R = {};

        // Internal Functions and Properties
        // ---------------------------------

        var undef = (function () {
        })(), EMPTY;

        // Makes a public alias for one of the public functions:
        var aliasFor = function (oldName) {
            var fn = function (newName) {
                R[newName] = R[oldName];
                return fn;
            };
            fn.is = fn.are = fn.and = fn;
            return fn;
        };

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

        // (private)
        var isArray = function (val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        };

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
        var curry = R.curry = function (fn) {
            var fnArity = fn.length;
            var f = function (args) {
                return arity(Math.max(fnArity - (args && args.length || 0), 0), function () {
                    var newArgs = concat(args, arguments);
                    if (newArgs.length >= fnArity) {
                        return fn.apply(this, newArgs);
                    }
                    else {
                        return f(newArgs);
                    }
                });
            };

            return f([]);
        };

        // (private) for dynamically dispatching Ramda method to non-Array objects
        var hasMethod = function (methodName, obj) {
            return obj && !isArray(obj) && typeof obj[methodName] === 'function';
        };

        var mkArgStr = function (n) {
            var arr = [], idx = -1;
            while (++idx < n) {
                arr[idx] = "arg" + idx;
            }
            return arr.join(", ");
        };

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

        // Returns a function that only accepts a single parameter, regardless of how
        // many the supplied one takes.
        R.unary = function (fn) {
            return nAry(1, fn);
        };

        // Returns a function that only accepts two parameters, regardless of how
        // many the supplied one takes.
        var binary = R.binary = function (fn) {
            return nAry(2, fn);
        };

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

        // Turns a named method of an object (or object prototype) into a function that can be called directly.
        // The object becomes the last parameter to the function, and the function is automatically curried.
        // Passing the optional `len` parameter restricts the function to the initial `len` parameters of the method.
        var invoker = R.invoker = function (name, obj, len) {
            var method = obj[name];
            var length = len === undef ? method.length : len;
            return method && curry(nAry(length + 1, function () {
                if (arguments.length) {
                    var target = Array.prototype.pop.call(arguments);
                    var targetMethod = target[name];
                    if (targetMethod == method) {
                        return targetMethod.apply(target, arguments);
                    }
                }
                return undef;
            }));
        };

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


        // Fills out an array to the specified length. Internal private function.
        var expand = function (a, len) {
            var arr = a ? isArray(a) ? a : _slice(a) : [];
            while (arr.length < len) {
                arr[arr.length] = undef;
            }
            return arr;
        };

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

        // Create a shallow copy of an array.
        var clone = R.clone = function(list) {
            return _slice(list);
        };

        // Core Functions
        // --------------
        //

        //   Prototypical (or only) empty list
        EMPTY = [];

        // Boolean function which reports whether a list is empty.
        var isEmpty = R.isEmpty = function (arr) {
            return !arr || !arr.length;
        };

        // Returns a new list with the new element at the front and the existing elements following
        var prepend = R.prepend = function (el, arr) {
            return concat([el], arr);
        };
        aliasFor("prepend").is("cons");

        //  Returns the first element of a list
        var head = R.head = function (arr) {
            arr = arr || EMPTY;
            return arr[0];
        };
        aliasFor("head").is("car").and("first");

        //  Returns the last element of a list
        R.last = function (arr) {
            arr = arr || EMPTY;
            return arr[arr.length - 1];
        };

        // Returns the rest of the list after the first element.
        // If the passed-in list is not annary, but is an object with a `tail` method, 
        // it will return object.tail().
        var tail = R.tail = function (arr) {
            arr = arr || EMPTY;
            if (hasMethod('tail', arr)) {
                return arr.tail();
            }
            return (arr.length > 1) ? _slice(arr, 1) : [];
        };
        aliasFor("tail").is("cdr");

        //   Boolean function which is `true` for non-list, `false` for a list.
        R.isAtom = function (x) {
            return (x !== null) && (x !== undef) && !isArray(x);
        };

        // Returns a new list with the new element at the end of a list following all the existing ones.
        var append = R.append = function(el, list) {
            return concat(list, [el]);
        };
        aliasFor("append").is("push");

        // Returns a new list consisting of the elements of the first list followed by the elements of the second.
        var merge = R.merge = function (list1, list2) {
             return arguments.length < 2 ? 
               function _merge(list2) { return concat(list1, list2); } :
               concat(list1, list2);
        };
        aliasFor("merge").is("concat");

        // A surprisingly useful function that does nothing but return the parameter supplied to it.
        var identity = R.identity = function (x) {
            return x;
        };
        aliasFor("identity").is("I");

        // Returns a fixed list (of size `n`) of identical values.
        R.repeatN = function (value, n) {
            function _repeatN(n) {
                var arr = new Array(n);
                var i = -1;
                while (++i < n) {
                    arr[i] = value;
                }
                return arr;
            }
            return arguments.length < 2 ? _repeatN : _repeatN(n);
        };


        // Function functions :-)
        // ----------------------
        //
        // These functions make new functions out of old ones.

        // --------
        //Basic composition function, takes 2 functions and returns the composite function. Its mainly used to build
        //the more general compose function, which takes any number of functions.
        var internalCompose = function(f, g) {
            return function () {
                return f(g.apply(this, arguments));
            };
        };

        // Creates a new function that runs each of the functions supplied as parameters in turn, passing the output
        // of each one to the next one, starting with whatever arguments were passed to the initial invocation.
        // Note that if `var h = compose(f, g)`, `h(x)` calls `g(x)` first, passing the result of that to `f()`.
        var compose = R.compose = function() {  // TODO: type check of arguments?
            var i = 0;
            var f = arguments[0];
            while (++i < arguments.length) {
                f = internalCompose(f, arguments[i]);
            }
            return f;
        };

        // Similar to `compose`, but processes the functions in the reverse order so that if if `var h = pipe(f, g)`,
        // `h(x)` calls `f(x)` first, passing the result of that to `g()`.
        R.pipe = function() { // TODO: type check of arguments?
            return compose.apply(this, _slice(arguments).reverse());
        };
        aliasFor("pipe").is("sequence");

        // Returns a new function much like the supplied one except that the first two arguments are inverted.
        var flip = R.flip = function (fn) {
            return function (a, b) {  
                return arguments.length < 2 ? 
                  function(b) { return fn.apply(this, [b, a].concat(_slice(arguments, 1))); } :
                  fn.apply(this, [b, a].concat(_slice(arguments, 2)));
            };
        };

        // Creates a new function that acts like the supplied function except that the left-most parameters are
        // pre-filled.
        R.lPartial = function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function () {
                return fn.apply(this, concat(args, arguments));
            });
        };
        aliasFor("lPartial").is("applyLeft");

        // Creates a new function that acts like the supplied function except that the right-most parameters are
        // pre-filled.
        R.rPartial = function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function() {
                return fn.apply(this, concat(arguments, args));
            });
        };
        aliasFor("rPartial").is("applyRight");

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

        // Wrap a function inside another to allow you to make adjustments to the parameters or do other processing
        // either before the internal function is called or with its results.
        R.wrap = function(fn, wrapper) {
            return function() {
                return wrapper.apply(this, concat([fn], arguments));
            };
        };

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

        // Returns a single item, by successively calling the function with the current element and the the next
        // element of the list, passing the result to the next call.  We start with the `acc` parameter to get
        // things going.  The function supplied should accept this running value and the latest element of the list,
        // and return an updated value.
        // n.b.: `ramda.foldl` (aka `ramda.reduce`) differs from `Array.prototype.reduce` in that it 
        // does not distinguish "sparse arrays".
        var foldl = R.foldl =  function (fn, acc, list) {
            function __foldl(acc, list) {
                function _foldl(list) {
                    if (hasMethod('foldl', list)) {
                        return list.foldl(fn, acc);
                    }
                    var idx = -1, len = list.length;
                    while (++idx < len) {
                        acc = fn(acc, list[idx]);
                    }
                    return acc;
                }
                return arguments.length < 2 ? _foldl : _foldl(list);
            }
            return arguments.length < 2 ? __foldl :
                arguments.length < 3 ? __foldl(acc) :
                    __foldl(acc, list);
        };
        aliasFor("foldl").is("reduce");
        // Like `foldl`, but passes additional parameters to the predicate function.  Parameters are
        // `list item`, `index of item in list`, `entire list`.
        //
        // Example:
        //
        //     var objectify = function(acc, elem, idx, ls) {
        //         acc[elem] = idx; 
        //         return acc;
        //     }
        //
        //     map(objectify, ['a', 'b', 'c']);
        //     //=> {a: 0, 'b': 1, c: 2}
        R.foldl.idx = function (fn, acc, list) {
            var f1 = function foldlIdxCurried1(acc, list) {
                var f2 = function foldlIdxCurried1(list) {
                    if (hasMethod('foldl', list)) {
                        return list.foldl(fn, acc);
                    }
                    var idx = -1, len = list.length;
                    while (++idx < len) {
                        acc = fn(acc, list[idx], idx, list);
                    }
                    return acc;
                };
                return arguments.length < 2 ? f2 : f2(list);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(acc) :
                    f1(acc, list);
        };


        // Returns a single item, by successively calling the function with the current element and the the next
        // Similar to `foldl`/`reduce` except that it moves from right to left on the list.
        // n.b.: `ramda.foldr` (aka `ramda.reduceRight`) differs from `Array.prototype.reduceRight` in that it 
        // does not distinguish "sparse arrays".
        var foldr = R.foldr = function (fn, acc, list) {
            var f1 = function foldrCurried1(acc, list) {
                var f2 = function foldrCurried2(list) {
                    if (hasMethod('foldr', list)) {
                         return list.foldr(fn, acc);
                     }
                     var idx = list.length;
                     while (idx--) {
                         acc = fn(acc, list[idx]);
                     }
                     return acc;
                };
                return arguments.length < 2 ? f2 : f2(list);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(acc) :
                    f1(acc, list);
        };
        aliasFor("foldr").is("reduceRight");
        R.foldr.idx = function (fn, acc, list) {
            var f1 = function foldrIdxCurried1(acc, list) {
                var f2 = function foldfIdxCurried2(list) {
                    if (hasMethod('foldr', list)) {
                        return list.foldr(fn, acc);
                    }
                    var idx = list.length;
                    while (idx--) {
                        acc = fn(acc, list[idx], idx, list);
                    }
                    return acc;
                };
                return arguments.length < 2 ? f2 : f2(list);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(acc) :
                    f1(acc, list);
        };

        // Builds a list from a seed value, using a function that returns falsy to quit and a pair otherwise,
        // consisting of the current value and the seed to be used for the next value.

        R.unfoldr = function (fn, seed) {
            function _unfoldr(seed) {
                var pair = fn(seed);
                var result = [];
                while (pair && pair.length) {
                    result.push(pair[0]);
                    pair = fn(pair[1]);
                }
                return result;
            }
            return arguments.length < 2 ? _unfoldr : _unfoldr(seed);
        };


        // Returns a new list constructed by applying the function to every element of the list supplied.
        // n.b.: `ramda.map` differs from `Array.prototype.map` in that it does not distinguish "sparse 
        // arrays" (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description).
        var map = R.map = function(fn, list) {
            var f1 = function mapCurried1(list) {
                if (hasMethod('map', list)) {
                    return list.map(fn);
                }
                var idx = -1, len = list.length, result = new Array(len);
                while (++idx < len) {
                    result[idx] = fn(list[idx]);
                }
                return result;
            };
            return arguments.length < 2 ? f1 : f1(list);
        };

        // Like `map`, but passes additional parameters to the predicate function.  Parameters are
        // `list item`, `index of item in list`, `entire list`.
        //
        // Example:
        //
        //     var squareEnds = function(x, idx, list) {
        //         return (idx === 0 || idx === list.length - 1) ? x * x : x;
        //     };
        //
        //     map(squareEnds, [8, 6, 7, 5, 3, 0, 9];
        //     //=> [64, 6, 7, 5, 3, 0, 81]

        map.idx = function(fn, list) {
            var f1 = function mapIdxCurried1(list) {
                if (hasMethod('map', list)) {
                    return list.map(fn);
                }
                var idx = -1, len = list.length, result = new Array(len);
                while (++idx < len) {
                    result[idx] = fn(list[idx], idx, list);
                }
                return result;
            };
            return arguments.length < 2 ? f1 : f1(list);
        };


        // Adds a `map`-like function for objects.
        //
        // TODO: consider mapObj.key in parallel with mapObj.idx.  Also consider folding together with `map` implementation.
        R.mapObj = function (fn, obj) {
            function _mapObj(obj) {
                return foldl(function (acc, key) {
                    acc[key] = fn(obj[key]);
                    return acc;
                }, {}, keys(obj));
            }
            return arguments.length < 2 ? _mapObj : _mapObj(obj);
        };

        // Reports the number of elements in the list
        R.size = function (arr) {
            return arr.length;
        };

        // Returns a new list containing only those items that match a given predicate function.
        // n.b.: `ramda.filter` differs from `Array.prototype.filter` in that it does not distinguish "sparse 
        // arrays".
        var filter = R.filter = function(fn, list) {
            var f1 = function filterCurried1(list) {
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
            return arguments.length < 2 ? f1 : f1(list);
        };

        // Like `filter`, but passes additional parameters to the predicate function.  Parameters are
        // `list item`, `index of item in list`, `entire list`.
        //
        // Example:
        //
        //     var lastTwo = function(val, idx, list) {
        //         return list.length - idx <= 2;
        //     };
        //     filter.idx(lastTwo, [8, 6, 7, 5, 3, 0 ,9]); //=> [0, 9]
        filter.idx = function(fn, list) {
            var f1 = function filterIdxCurried1(list) {
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
            return arguments.length < 2 ? f1 : f1(list);
        };

        // Similar to `filter`, except that it keeps only those that **don't** match the given predicate functions.
        var reject = R.reject = function (fn, list) {
          return arguments.length < 2 ? 
              function (list) { return filter(not(fn), list); } :
              filter(not(fn), list);
        };

        // Like `reject`, but passes additional parameters to the predicate function.  Parameters are
        // `list item`, `index of item in list`, `entire list`.
        //
        // Example:
        //
        //     var lastTwo = function(val, idx, list) {
        //         return list.length - idx <= 2;
        //     };
        //     reject.idx(lastTwo, [8, 6, 7, 5, 3, 0 ,9]);
        //     //=> [8, 6, 7, 5, 3]
        reject.idx = function (fn, list) {
          return arguments.length < 2 ? 
              function (list) { return filter.idx(not(fn), list); } :
              filter.idx(not(fn), list);
        };

        // Returns a new list containing the elements of the given list up until the first one where the function
        // supplied returns `false` when passed the element.
        R.takeWhile = function (fn, list) {
            function _takeWhile(list) {
                if (hasMethod('takeWhile', list)) {
                    return list.takeWhile(fn);
                }
                var idx = -1, len = list.length;
                while (++idx < len && fn(list[idx])) {}
                return _slice(list, 0, idx);
            }
            return arguments.length < 2 ? _takeWhile : _takeWhile(list);
        };

        // Returns a new list containing the first `n` elements of the given list.
        // if `n > list.length`, take will return a list if `list.length` elements.
        var take = R.take = function (n, list) {
            function _take(list) {
                if (hasMethod('take', list)) {
                    return list.take(n);
                }
                var ls = clone(list);
                ls.length = Math.min(n, list.length);
                return ls;
            }
            return arguments.length < 2 ? _take : _take(list);
        };

        // Returns a new list containing the elements of the given list starting with the first one where the function
        // supplied returns `false` when passed the element.
        R.skipUntil = function (fn, list) {
            function _skipUntil(list) {
                var idx = -1, len = list.length;
                while (++idx < len && !fn(list[idx])) {}
                return _slice(list, idx);
            }
            return arguments.length < 2 ? _skipUntil : _skipUntil(list);
        };

        // Returns a new list containing all **but** the first `n` elements of the given list.
        R.skip = function (n, list) {
            function _skip(list) { 
                if (hasMethod('skip', list)) { return list.skip(n); }
                return _slice(list, n); 
            } 
            return arguments.length < 2 ? _skip : _skip(list);
        };
        aliasFor('skip').is('drop');

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

        // Returns the index of first element of the list which matches the predicate, or `undefined` if no element matches.
        R.findIndex = function (fn, list) {
            function _findIndex(list) {
                var idx = -1;
                var len = list.length;
                while (++idx < len) {
                    if (fn(list[idx])) {
                        return idx;
                    }
                }
                return -1;
            }
            return arguments.length < 2 ? _findIndex : _findIndex(list);
        };

        // Returns the last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLast = function (fn, list) {
            function _findLast(list) {
                var idx = list.length;
                while (--idx) {
                    if (fn(list[idx])) {
                        return list[idx];
                    }
                }
                return undef;
            }
            return arguments.length < 2 ? _findLast : _findLast(list);
        };

        // Returns the index of last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLastIndex = function (fn, list) {
            function _findLastIndex(list) {
                var idx = list.length;
                while (--idx) {
                    if (fn(list[idx])) {
                        return idx;
                    }
                }
                return -1;
            }
            return arguments.length < 2 ? _findLastIndex : _findLastIndex(list);
        };

        // Returns `true` if all elements of the list match the predicate, `false` if there are any that don't.
        var all = R.all = function (fn, list) {
            function _all(list) {
                var i = -1;
                while (++i < list.length) {
                    if (!fn(list[i])) {
                        return false;
                    }
                }
                return true;
            }
            return arguments.length < 2 ? _all : _all(list);
        };
        aliasFor("all").is("every");


        // Returns `true` if any elements of the list match the predicate, `false` if none do.
        var any = R.any = function (fn, list) {
            function _any(list) {
                var i = -1;
                while (++i < list.length) {
                    if (fn(list[i])) {
                        return true;
                    }
                }
                return false;
            }
            return arguments.length < 2 ? _any : _any(list);
        };
        aliasFor("any").is("some");

        // Returns `true` if the list contains the sought element, `false` if it does not.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var contains = R.contains = function (a, list) {
             return arguments.length < 2 ? 
                 function _contains(list) { return list.indexOf(a) > -1; } :
                 list.indexOf(a) > -1;
        };

        // Returns `true` if the list contains the sought element, `false` if it does not, based upon the value
        // returned by applying the supplied predicated to two list elements.  Equality is strict here, meaning
        // reference equality for objects and non-coercing equality for primitives.  Probably inefficient.
        var containsWith = R.containsWith = function (pred, x, list) {
            var f1 = function containsWithCurried1(x, list) {
                var f2 = function containsWithCurried2(list) {
                    var idx = -1, len = list.length;
                    while (++idx < len) {
                        if (pred(x, list[idx])) {
                            return true;
                        }
                    }
                    return false;
                };
                return arguments.length < 2 ? f2 : f2(list);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(x) :
                    f1(x, list);
        };
        // Returns a new list containing only one copy of each element in the original list.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var uniq = R.uniq = function (list) {
            return foldr(function (acc, x) {
                return (contains(x, acc)) ? acc : prepend(x, acc);
            }, EMPTY, list);
        };

        // returns `true` if all of the elements in the `list` are unique.
        R.isSet = function (list) {
            return uniq(list).length === list.length;
        };

        // Returns a new list containing only one copy of each element in the original list, based upon the value
        // returned by applying the supplied predicate to two list elements.   Equality is strict here,  meaning
        // reference equality for objects and non-coercing equality for primitives.
        var uniqWith = R.uniqWith = function (pred, list) {
            function _uniqWith(list) {
                return foldr(function (acc, x) {
                    return (containsWith(pred, x, acc)) ? acc : prepend(x, acc);
                }, EMPTY, list);
            }
            return arguments.length < 2 ? _uniqWith : _uniqWith(list);
        };


        // Returns a new list by plucking the same named property off all objects in the list supplied.
        var pluck = R.pluck = function (p, list) {
            return arguments.length < 2 ? 
                function _pluck(list) { return map(prop(p), list); } : 
                map(prop(p), list);
        };

        // Returns a list that contains a flattened version of the supplied list.  For example:
        //
        //     flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
        //     // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var flatten = R.flatten = function (list) {
            var idx = -1, len = list ? list.length : 0, result = [], push = result.push, val;
            while (++idx < len) {
                val = list[idx];
                push.apply(result, isArray(val) ? flatten(val) : [val]);
            }
            return result;
        };


        // Creates a new list out of the two supplied by applying the function to each equally-positioned pair in the
        // lists.  For example,
        //
        //     zipWith(f, [1, 2, 3], ['a', 'b', 'c'])
        //     //    => [f(1, 'a'), f(2, 'b'), f(3, 'c')];
        //
        // Note that the output list will only be as long as the length of the shorter input list.
        R.zipWith = function (fn, a, b) {
            var f1 = function zipWithCurried1(a, b) {
                var f2 = function zipWithCurried2(b) {
                    var rv = [], i = -1, len = Math.min(a.length, b.length);
                    while (++i < len) {
                        rv[i] = fn(a[i], b[i]);
                    }
                    return rv;
                };
                return arguments.length < 2 ? f2 : f2(b);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(a) :
                    f1(a, b);
        };
        // Creates a new list out of the two supplied by yielding the pair of each equally-positioned pair in the
        // lists.  For example,
        //
        //     zip([1, 2, 3], ['a', 'b', 'c'])
        //     //    => [[1, 'a'], [2, 'b'], [3, 'c']];
        R.zip = function (a, b) { // = zipWith(prepend);
            function _zip(b) {
                var rv = [];
                var i = -1;
                var len = Math.min(a.length, b.length);
                while (++i < len) {
                    rv[i] = [a[i], b[i]];
                }
                return rv;
            }
            return arguments.length < 2 ? _zip : _zip(b);
        };

        // Creates a new list out of the two supplied by applying the function to each possible pair in the lists.
        //  For example,
        //
        //     xProdWith(f, [1, 2], ['a', 'b'])
        //     //    => [f(1, 'a'), f(1, 'b'), f(2, 'a'), f(2, 'b')];
        R.xprodWith = function (fn, a, b) {
            var f1 = function xprodWithCurried1(a, b) {
                var f2 = function xprodWithCurried2(b) {
                    if (isEmpty(a) || isEmpty(b)) {
                        return EMPTY;
                    }
                    var i = -1, ilen = a.length, j, jlen = b.length, result = []; // better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
                    while (++i < ilen) {
                        j = -1;
                        while (++j < jlen) {
                            result.push(fn(a[i], b[j]));
                        }
                    }
                    return result;
                };
                return arguments.length < 2 ? f2 : f2(b);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(a) :
                    f1(a, b);
        };
        // Creates a new list out of the two supplied by yielding the pair of each possible pair in the lists.
        // For example,
        //
        //     xProd([1, 2], ['a', 'b'])
        //     //    => [[1, 'a'], [1, 'b')], [2, 'a'], [2, 'b']];
        R.xprod = function (a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
            function _xprod(b) {
                if (isEmpty(a) || isEmpty(b)) {
                    return EMPTY;
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
            }
            return arguments.length < 2 ? _xprod : _xprod(b);
        };

        // Returns a new list with the same elements as the original list, just in the reverse order.
        R.reverse = function (list) {
            return clone(list || []).reverse();
        };

        // // Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
        // For example, 
        //
        //     range(1, 5) // => [1, 2, 3, 4]
        //     range(50, 53) // => [50, 51, 52]
        R.range = function (from, to) {
            function _range(to) {
                if (from >= to) {
                    return EMPTY;
                }
                var idx, result = new Array(Math.floor(to) - Math.ceil(from));
                for (idx = 0; from < to; idx++, from++) {
                    result[idx] = from;
                }
                return result;
            }
            return arguments.length < 2 ? _range : _range(to);
        };


        // Returns the first zero-indexed position of an object in a flat list
        R.indexOf = invoker("indexOf", Array.prototype, 1);

        // Returns the last zero-indexed position of an object in a flat list
        R.lastIndexOf = invoker("lastIndexOf", Array.prototype, 1);

        // Returns the elements of the list as a string joined by a separator.
        R.join = invoker("join", Array.prototype);

        // Returns the sublist of a list starting with the first index and
        // ending before the second one.
        R.slice = invoker("slice", Array.prototype);
        R.slice.from = flip(R.slice)(undef);

        // ramda.splice has a different contract than Array.splice. Array.splice mutates its array
        // and returns the removed elements. ramda.splice does not mutate the passed in list (well,
        // it makes a shallow copy), and returns a new list with the specified elements removed. 
        R.splice = function (start, len, list) {
            var f1 = function spliceCurried1(len, list) {
                var f2 = function spliceCurried2(list) {
                    return _slice(list, 0, start).concat(_slice(list, start + len));
                };
                return arguments.length < 2 ? f2 : f2(list);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(len) :
                    f1(len, list);
        };
        // Returns the `n`th element of a list (zero-indexed)
        R.nth = function (n, list) {
             return arguments.length < 2 ? function _nth(list) { return list[n]; } : list[n];
        };

        // Makes a comparator function out of a function that reports whether the first element is less than the second.
        //
        //     var cmp = comparator(function(a, b) {
        //         return a.age < b.age;
        //     };
        //     sort(cmp, people);
        var comparator = R.comparator = function (pred) {
            return function (a, b) {
                return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
            };
        };

        // Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
        // time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
        // if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
        var sort = R.sort = function (comparator, list) {
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

        R.partition = function (fn, list) {
            function _partition(list) {
                return foldl(function (acc, elt) {
                    var key = fn(elt);
                    acc[key] = append(elt, acc[key] || (acc[key] = []));
                    return acc;
                }, {}, list);
            }
            return arguments.length < 2 ? _partition : _partition(list);
        };
        aliasFor("partition").is("groupBy");

        // Object Functions
        // ----------------
        //
        // These functions operate on plain Javascript object, adding simple functions to test properties on these
        // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
        // objects.

        // --------

        // Runs the given function with the supplied object, then returns the object.
        R.tap = function (x, fn) {
            function _tap(fn) {
                if (typeof fn === "function") { fn(x); }
                return x;
            }
            return arguments.length < 2 ? _tap : _tap(fn);
        };
        aliasFor("tap").is("K");

        // Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
        // non-coercing equality for primitives.
        R.eq = function (a, b) {
            return arguments.length < 2 ? function _eq(b) { return a === b; } : a === b;
        };

        // Returns a function that when supplied an object returns the indicated property of that object, if it exists.
        var prop = R.prop = function (p, obj) {
            return arguments.length < 2 ? function (obj) { return obj[p]; } :  obj[p];
        };
        aliasFor("prop").is("get"); // TODO: are we sure?  Matches some other libs, but might want to reserve for other use.


        // Returns a function that when supplied an object returns the result of running the indicated function on
        // that object, if it has such a function.
        R.func = function (fn, obj) {
            function _func(obj) {
                return obj[fn].apply(obj, _slice(arguments, 1));
            }
            return arguments.length < 2 ? _func : _func(obj);
        };


        // Returns a function that when supplied a property name returns that property on the indicated object, if it
        // exists.
        R.props = function (obj, prop) {
            return arguments.length < 2 ? function _props(prop) { return obj && obj[prop]; } : obj && obj[prop];
        };


        // Returns a function that always returns the given value.
        var always = R.always = function (val) {
            return function () {
                return val;
            };
        };
        aliasFor("always").is("constant");


        var anyBlanks = any(function (val) {
            return val === null || val === undef;
        });

        // Returns a list containing the names of all the enumerable own
        // properties of the supplied object.
        var keys = R.keys = function (obj) {
            var prop, ks = [];
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ks.push(prop);
                }
            }
            return ks;
        };

        // Returns a list containing the names of all the 
        // properties of the supplied object, including prototype properties.
        R.keysIn = function (obj) {
            var prop, ks = [];
            for (prop in obj) {
                ks.push(prop);
            }
            return ks;
        };

        // Returns a list of all the enumerable own properties of the supplied object.
        R.values = function (obj) {
            var prop, vs = [];
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    vs.push(obj[prop]);
                }
            }
            return vs;
        };

        // Returns a list of all the properties, including prototype properties, 
        // of the supplied object.
        R.valuesIn = function (obj) {
            var prop, vs = [];
            for (prop in obj) {
                vs.push(obj[prop]);
            }
            return vs;
        };

        // internal helper function
        var partialCopy = function (test, obj) {
            var copy = {};
            each(function (key) {
                if (test(key, obj)) {
                    copy[key] = obj[key];
                }
            }, keys(obj));
            return copy;
        };

        // Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
        // property is ignored
        R.pick = function (names, obj) {
            function _pick(obj) {
                return partialCopy(function (key) {
                    return contains(key, names);
                }, obj);
            }
            return arguments.length < 2 ? _pick : _pick(obj);
        };

        // Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
        var pickAll = R.pickAll = function (names, obj) {
            function _pickAll(obj) {
                var copy = {};
                each(function (name) {
                    copy[name] = obj[name];
                }, names);
                return copy;
            }
            return arguments.length < 2 ? _pickAll : _pickAll(obj);
        };

        // Returns a partial copy of an object omitting the keys specified.
        R.omit = function (names, obj) {
            function _omit(obj) {
                return partialCopy(function (key) {
                    return !contains(key, names);
                }, obj);
            }
            return arguments.length < 2 ? _omit : _omit(obj);
        };

        // Returns a new object that mixes in the own properties of two objects.
        R.mixin = function (a, b) {
            function _mixin(b) {
                var mixed = pickAll(R.keys(a), a);
                each(function (key) {
                    mixed[key] = b[key];
                }, R.keys(b));
                return mixed;
            }
            return arguments.length < 2 ? _mixin : _mixin(b);
        };

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
        R.where = function(spec, test) {
            function isFn(key) {return typeof spec[key] === 'function';}
            var specKeys = keys(spec);
            var fnKeys = filter(isFn, specKeys);
            var objKeys = reject(isFn, specKeys);
            var process = function(test) {
                if (!test) { return false; }
                var i = -1, key;
                while (++i < fnKeys.length) {
                    key = fnKeys[i];
                    if (!spec[key](test[key], test)) {
                        return false;
                    }
                }
                i = -1;
                while (++i < objKeys.length) {
                    key = objKeys[i];
                    // if (test[key] !== spec[key]) {  // TODO: discuss Scott's objections
                    if (!test.hasOwnProperty(key) || test[key] !== spec[key]) {
                        return false;
                    }
                }
                return true;
            };
            return (arguments.length > 1) ? process(test) : process;
        };

        // Miscellaneous Functions
        // -----------------------
        //
        // A few functions in need of a good home.

        // --------

        // Expose the functions from ramda as properties on another object.  If the passed-in object is the 
        // global object, or the passed-in object is "falsy", then the ramda functions become global functions.
        R.installTo = function(obj) {
            each(function(key) {
                (obj || global)[key] = R[key];
            })(keys(R));
        };

        // A function that always returns `0`.
        R.alwaysZero = always(0);

        // A function that always returns `false`.
        R.alwaysFalse = always(false);

        // A function that always returns `true`.
        R.alwaysTrue = always(true);



        // Logic Functions
        // ---------------
        //
        // These functions are very simple wrappers around the built-in logical operators, useful in building up
        // more complex functional forms.

        // --------

        // A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
        // value.
        R.and = function(f, g) { 
           function _and(g) {
               return function() {return !!(f.apply(this, arguments) && g.apply(this, arguments));};
           }
            return arguments.length < 2 ? _and : _and(g);
        };

        // A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
        // value. (Note also that at least Oliver Twist can pronounce this one...)
        R.or = function(f, g) { // TODO: arity?
           function _or(g) {
               return function() {return !!(f.apply(this, arguments) || g.apply(this, arguments));};
           }
            return arguments.length < 2 ? _or : _or(g);
        };

        // A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
        // underlying function would return a false-y value, and `false` when it would return a truth-y one.
        var not = R.not = function (f) {
            return function() {return !f.apply(this, arguments);};
        };


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

        // Given a list of predicates returns a new predicate that will be true exactly when all of them are.
        R.allPredicates = predicateWrap(all);

        // Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
        R.anyPredicates = predicateWrap(any);

        // Arithmetic Functions
        // --------------------
        //
        // These functions wrap up the certain core arithmetic operators

        // --------

        // Adds two numbers.  Automatic curried:
        //
        //     var add7 = add(7);
        //     add7(10); // => 17
        var add = R.add = function(a, b) {
            return arguments.length < 2 ? function(b) { return a + b; } :  a + b;
        };

        // Multiplies two numbers.  Automatically curried:
        //
        //     var mult3 = multiply(3);
        //     mult3(7); // => 21
        var multiply = R.multiply = function(a, b) {
            return arguments.length < 2 ? function(b) { return a * b; } :  a * b;
        };

        // Subtracts the second parameter from the first.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `subtractN` might be what's wanted.
        //
        //     var complementaryAngle = subtract(90);
        //     complementaryAngle(30) ; // => 60
        var subtract = R.subtract = function(a, b) {
            return arguments.length < 2 ? function(b) { return a - b; } :  a - b;
        };

        // Reversed version of `subtract`, where first parameter is subtracted from the second.  The curried version of
        // this one might me more useful than that of `subtract`.  For instance:
        //
        //     var decrement = subtractN(1);
        //     decrement(10); // => 9;
        R.subtractN = flip(subtract);

        // Divides the first parameter by the second.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `divideBy` might be what's wanted.
        var divide = R.divide = function(a, b) {
            return arguments.length < 2 ? function(b) { return a / b; } :  a / b;
        };

        // Reversed version of `divide`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `divide`.  For instance:
        //
        //     var half = divideBy(2);
        //     half(42); // => 21
        R.divideBy = flip(divide);

        // Divides the second parameter by the first and returns the remainder.
        var modulo = R.modulo = function(a, b) { 
            return arguments.length < 2 ? function(b) { return a % b; } :  a % b;
        };

        // Reversed version of `modulo`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `modulo`.  For instance:
        //
        //     var isOdd = moduloBy(2);
        //     isOdd(42); // => 0
        //     isOdd(21); // => 1
        R.moduloBy = flip(modulo);

        // Adds together all the elements of a list.
        R.sum = foldl(add, 0);

        // Multiplies together all the elements of a list.
        R.product = foldl(multiply, 1);

        // Returns true if the first parameter is less than the second.
        R.lt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a < b; } :  a < b;
        };

        // Returns true if the first parameter is less than or equal to the second.
        R.lte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a <= b; } :  a <= b;
        };

        // Returns true if the first parameter is greater than the second.
        R.gt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a > b; } :  a > b;
        };

        // Returns true if the first parameter is greater than or equal to the second.
        R.gte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a >= b; } :  a >= b;
        };

        // Determines the largest of a list of numbers (or elements that can be cast to numbers)
        var max= R.max = function(list) {
            return foldl(binary(Math.max), -Infinity, list);
        };

        // Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.maxWith = function(keyFn, list) {
            function _maxWith(list) {
                if (!isArray(list) || !list.length) {
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
            }
            return arguments.length < 2 ? _maxWith : _maxWith(list);
        };

        // TODO: combine this with maxWith?

        // Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.minWith = function(keyFn, list) {
            function _minWith(list) {
                if (!isArray(list) || !list.length) {
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
            }
            return arguments.length < 2 ? _minWith : _minWith(list);
        };


        // Determines the smallest of a list of numbers (or elements that can be cast to numbers)
        R.min = function(list) {
            return foldl(binary(Math.min), Infinity, list);
        };


        // String Functions
        // ----------------
        //
        // Much of the String.prototype API exposed as simple functions.

        // --------

        // A substring of a String:
        //
        //     substring(2, 5, "abcdefghijklm"); //=> "cde"
        var substring = R.substring = invoker("substring", String.prototype);

        // The trailing substring of a String starting with the nth character:
        //
        //     substringFrom(8, "abcdefghijklm"); //=> "ijklm"
        R.substringFrom = flip(substring)(undef);

        // The leading substring of a String ending before the nth character:
        //
        //     substringTo(8, "abcdefghijklm"); //=> "abcdefgh"
        R.substringTo = substring(0);

        // The character at the nth position in a String:
        //
        //     charAt(8, "abcdefghijklm"); //=> "i"
        R.charAt = invoker("charAt", String.prototype);

        // The ascii code of the character at the nth position in a String:
        //
        //     charCodeAt(8, "abcdefghijklm"); //=> 105
        //     // (... 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105)
        R.charCodeAt = invoker("charCodeAt", String.prototype);

        // Tests a regular expression agains a String
        //
        //     match(/([a-z]a)/g, "bananas"); //=> ["ba", "na", "na"]
        R.match = invoker("match", String.prototype);

        // Finds the index of a substring in a string, returning -1 if it's not present
        //
        //     strIndexOf('c', 'abcdefg) //=> 2
        R.strIndexOf = invoker("indexOf", String.prototype);

        // Finds the last index of a substring in a string, returning -1 if it's not present
        //
        //     strLastIndexOf('a', 'banana split') //=> 5
        R.strLastIndexOf = invoker("lastIndexOf", String.prototype);

        // The uppercase version of a string.
        //
        //     toUpperCase('abc') //=> 'ABC'
        R.toUpperCase = invoker("toUpperCase", String.prototype);

        // The lowercase version of a string.
        //
        //     toLowerCase('XYZ') //=> 'xyz'
        R.toLowerCase = invoker("toLowerCase", String.prototype);


        // The string split into substring at the specified token
        //
        //     split('.', 'a.b.c.xyz.d') //=>
        //         ['a', 'b', 'c', 'xyz', 'd']
        R.split = invoker("split", String.prototype, 1);

        var pathWith = R.pathWith = function (fn, str, obj) {
            var f1 = function pathWithCurried1(str, obj) {
                var f2 = function pathWithCurried2(obj) {
                    if (!obj) { return undef; }
                    var parts = fn(str) || [];
                    if (parts.length === 0) { return undef; }
                    var i = -1;
                    var tmpObj = obj;
                    while (++i < parts.length) {
                        if (tmpObj[parts[i]] === undef) {
                            return undef;
                        } else {
                            tmpObj = tmpObj[parts[i]];
                        }
                    }
                    return tmpObj;
                };
                return arguments.length < 2 ? f2 : f2(obj);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(str) :
                    f1(str, obj);
        };        

        R.path = pathWith(R.split("."));

        R.pathOn = function (sep, str, obj) {
            var f1 = function pathOnCurried1(str, obj) {
                var f2 = function pathOnCurried2(obj) {
                    if (!obj) { return undef; }
                    return pathWith(R.split(sep), str, obj);
                };
                return arguments.length < 2 ? f2 : f2(obj);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(str) : 
                    f1(str, obj);
        };

        // Data Analysis and Grouping Functions
        // ------------------------------------
        //
        // Functions performing SQL-like actions on lists of objects.  These do not have any SQL-like optimizations
        // performed on them, however.

        // --------

        // Reasonable analog to SQL `select` statement.
        //
        //     var kids = [
        //         {name: 'Abby', age: 7, hair: 'blond', grade: 2},
        //         {name: 'Fred', age: 12, hair: 'brown', grade: 7}
        //     ];
        //     project(['name', 'grade'], kids);
        //     //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
        R.project = useWith(map, pickAll, identity); // passing `identity` gives correct arity

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

        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.
        R.union = compose(uniq, merge);

        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
        // determined according to the value returned by applying the supplied predicate to two list elements.
        R.unionWith = function (pred, list1, list2) {
            var f1 = function unionWithCurried1(list1, list2) {
                var f2 = function unionWithCurried2(list2) {
                    return uniqWith(pred, merge(list1, list2));
                };
                return arguments.length < 2 ? f2 : f2(list2);
            };
            return arguments.length < 2 ? f1 :
                arguments.length < 3 ? f1(list1) :
                    f1(list1, list2);
        };        

        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        R.difference = function(first, second) {
            function _difference(second) {
                return uniq(reject(flip(contains)(second))(first));
            }
            return arguments.length < 2 ? _difference : _difference(second);
        };

        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        // Duplication is determined according to the value returned by applying the supplied predicate to two list
        // elements.
        R.differenceWith = function (pred, first, second) {
            var f1 = function differenceWithCurried1(first, second) {
                var f2 = function differenceWithCurried2(second) {
                    return uniqWith(pred)(reject(flip(containsWith(pred))(second), first));
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

        // Creates a new list whose elements each have two properties: `val` is the value of the corresponding
        // item in the list supplied, and `key` is the result of applying the supplied function to that item.
        var keyValue = function(fn, list) { // TODO: Should this be made public?
            function _keyValue(list) {
                return map(function(item) {return {key: fn(item), val: item};}, list);
            }
            return arguments.length < 2 ? _keyValue : _keyValue(list);
        };

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
