//     ramda.js 0.0.1
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

    return  (function() {

        // This object is what is actually returned, with all the exposed functions attached as properties.

        var R = {};

        // Internal Functions and Properties
        // ---------------------------------

        var undef = (function(){})(), EMPTY;

        // Makes a public alias for one of the public functions:
        var aliasFor = function(oldName) {
            var fn = function(newName) {R[newName] = R[oldName]; return fn;};
            fn.is = fn.are = fn.and = fn;
            return fn;
        };

        // (private) `slice` implemented iteratively for performance
        var slice = function (args, from, to) {
            var i, arr = [];
            from = from || 0;
            to = to || args.length;
            for (i = from; i < to; i++) {
                arr[arr.length] = args[i];
            }
            return arr;
        };

        // (private)
        var isArray = function(val) {return Object.prototype.toString.call(val) === "[object Array]";};

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
        var _ = R.curry = function(fn) {
            var fnArity = fn.length;
            var f = function(args) {
                return arity(Math.max(fnArity - (args && args.length || 0), 0), function () {
                    var newArgs = (args || []).concat(slice(arguments, 0));
                    if (newArgs.length >= fnArity) {
                        return fn.apply(this, newArgs);
                    }
                    else {return f(newArgs);}
                });
            };

            return f([]);
        };

        var mkArgStr = function(n) {
            var arr = [], idx = -1;
            while(++idx < n) {
                arr[idx] = "arg" + idx;
            }
            return arr.join(", ");
        };

        // Wraps a function that may be nullary, or may take fewer than or more than `n` parameters, in a function that
        // specifically takes exactly `n` parameters.  Any extraneous parameters will not be passed on to the function
        // supplied
        var nAry = R.nAry = (function() {
            var cache = {};


            //     For example:
            //     cache[3] = function(func) {
            //         return function(arg0, arg1, arg2) {
            //             return func.call(this, arg0, arg1, arg2);
            //         }
            //     };

            var makeN = function(n) {
                var fnArgs = mkArgStr(n);
                var body = [
                    "    return function(" + fnArgs + ") {",
                    "        return func.call(this" + (fnArgs ? ", " + fnArgs : "") + ");",
                    "    }"
                ].join("\n");
                return new Function("func", body);
            };

            return function(n, fn) {
                return (cache[n] || (cache[n] = makeN(n)))(fn);
            };
        }());

        // Wraps a function that may be nullary, or may take fewer than or more than `n` parameters, in a function that
        // specifically takes exactly `n` parameters.  Note, though, that all parameters supplied will in fact be
        // passed along, in contrast with `nAry`, which only passes along the exact number specified.
        var arity = R.arity = (function() {
            var cache = {};

            //     For example:
            //     cache[3] = function(func) {
            //         return function(arg0, arg1, arg2) {
            //             return func.apply(this, arguments);
            //         }
            //     };

            var makeN = function(n) {
                var fnArgs = mkArgStr(n);
                var body = [
                    "    return function(" + fnArgs + ") {",
                    "        return func.apply(this, arguments);",
                    "    }"
                ].join("\n");
                return new Function("func", body);
            };

            return function(n, fn) {
                return (cache[n] || (cache[n] = makeN(n)))(fn);
            };
        }());

        // Turns a named method of an object (or object prototype) into a function that can be called directly.
        // The object becomes the last parameter to the function, and the function is automatically curried.
        // Passing the optional `len` parameter restricts the function to the initial `len` parameters of the method.
        var invoker = R.invoker = function(name, obj, len) {
            var method = obj[name];
            var length = len === undef ? method.length : len;
            return method && _(nAry(length + 1, function() {
                if(arguments.length) {
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
        var useWith = R.useWith = function(fn /*, transformers */) {
            var transformers = slice(arguments, 1);
            var tlen = transformers.length;
            return _(arity(tlen, function() {
                var args = [], idx = -1;
                while (++idx < tlen) {
                    args.push(transformers[idx](arguments[idx]));
                }
                return fn.apply(this, args.concat(slice(arguments, tlen)));
            }));
        };

        // A two-step version of the `useWith` function.  This would allow us to write `project`, currently written
        // as `useWith(map, pickAll, identity)`, as, instead, `use(map).over(pickAll, identity)`, which is a bit
        // more explicit.
        // TODO: One of these versions should be eliminated eventually.  So not worrying about the duplication for now.
        R.use = function(fn) {
            return {
                over: function(/*transformers*/) {
                    var transformers = slice(arguments, 0);
                    var tlen = transformers.length;
                    return _(arity(tlen, function() {
                        var args = [], idx = -1;
                        while (++idx < tlen) {
                            args.push(transformers[idx](arguments[idx]));
                        }
                        return fn.apply(this, args.concat(slice(arguments, tlen)));
                    }));
                }
            };
        };


        // Fills out an array to the specified length. Internal private function.
        var expand = function(a, len) {
            var arr = a ? isArray(a) ? a : slice(a) : [];
            while(arr.length < len) {arr[arr.length] = undef;}
            return arr;
        };

        // (Internal use only) The basic implementation of `each`.
        var internalEach = _(function(useIdx, fn, list) {
            var idx = -1, len = list.length;
            while (++idx < len) {
               if (useIdx) {
                 fn(list[idx], idx, list);
               } else {
                 fn(list[idx]);
               }
            }
            // i can't bear not to return *something*
            return list;
        });

        // Loop over a list for side effects. Nasty, yes, but this is a *practical* library
        var each = R.each = internalEach(false);
        each.idx = internalEach(true);
        aliasFor("each").is("forEach");

        // Create a shallow copy of an array.
        var clone = R.clone = function(list) {
            return list.concat();
        };

        // Create a shallow copy of an array.
        // (TODO: find a more performant cloneDeep)
        R.cloneDeep = function(obj) {
          return JSON.parse(JSON.stringify(obj));
        };

        // Core Functions
        // --------------
        //

        //   Prototypical (or only) empty list
        EMPTY = [];

        // Boolean function which reports whether a list is empty.
        var isEmpty = R.isEmpty = function(arr) {return !arr || !arr.length;};

        // Returns a new list with the new element at the front and the existing elements following
        var prepend = R.prepend = function(el, arr) {return [el].concat(arr);};
        aliasFor("prepend").is("cons");

        //  Returns the first element of a list
        var head = R.head = function(arr) {
            arr = arr || EMPTY;
            return arr[0]; 
        };
        aliasFor("head").is("car"); 

        // Returns the rest of the list after the first element.
        // If the passed-in list is a Generator, it will return the 
        // next iteration of the Generator.
        var tail = R.tail = function(arr) {
            arr = arr || EMPTY;
            if (arr.length === Infinity) {
                return arr.tail();
            }
            return (arr.length > 1) ? slice(arr, 1) : [];
        };
        aliasFor("tail").is("cdr");

        //   Boolean function which is `true` for non-list, `false` for a list.
        R.isAtom = function(x) {
            return (x !== null) && (x !== undef) && Object.prototype.toString.call(x) !== "[object Array]";
        };

        // Returns a new list with the new element at the end of a list following all the existing ones.
        R.append = function(el, list) {
            var newList = clone(list);
            newList.push(el);
            return newList;
        };
        aliasFor("append").is("push");

        // Returns a new list consisting of the elements of the first list followed by the elements of the second.
        var merge = R.merge = _(function(list1, list2) {
            return (isEmpty(list1)) ? clone(list2) : list1.concat(list2);
        });
        aliasFor("merge").is("concat");

        // A surprisingly useful function that does nothing but return the parameter supplied to it.
        var identity = R.identity = function(x) {return x;};
        aliasFor("identity").is("I");



        // Generators
        // ----------
        //

        // Support for infinite lists, using an initial seed, a function that calculates the head from the seed and
        // a function that creates a new seed from the current seed.  Generator objects have this structure:
        //
        //     {
        //        "0": someValue,
        //        tail: someFunction() {},
        //        length: Infinity
        //     }
        //
        // Generator objects also have such functions as `take`, `skip`, `map`, and `filter`, but the equivalent
        // functions from Ramda will work with them as well.
        //
        // ### Example ###
        //
        //     var fibonacci = generator(
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

        var generator = R.generator = (function() {
            // partial shim for Object.create
            var create = (function() {
                var F = function() {};
                return function(src) {
                    F.prototype = src;
                    return new F();
                };
            }());

            // Trampolining to support recursion in Generators
            var trampoline = function(fn) {
                var result = fn.apply(this, tail(arguments));
                while (typeof result === "function") {
                    result = result();
                }
                return result;
            };
            // Internal Generator constructor
            var  G = function(seed, current, step) {
                this["0"] = current(seed);
                this.tail = function() {
                    return new G(step(seed), current, step);
                };
            };
            // Generators can be used with OO techniques as well as our standard functional calls.  These are the
            // implementations of those methods and other properties.
            G.prototype = {
                 constructor: G,
                 // All generators are infinite.
                 length: Infinity,
                 // `take` implementation for generators.
                 take: function(n) {
                     var take = function(ctr, g, ret) {
                         return (ctr === 0) ? ret : take(ctr - 1, g.tail(), ret.concat([g[0]]));
                     };
                     return trampoline(take, n, this, []);
                 },
                 // `skip` implementation for generators.
                 skip: function(n) {
                     var skip = function(ctr, g) {
                         return (ctr <= 0) ? g : skip(ctr - 1, g.tail());
                     };
                     return trampoline(skip, n, this);
                 },
                 // `map` implementation for generators.
                 map: function(fn, gen) {
                     var g = create(G.prototype);
                     g[0] = fn(gen[0]);
                     g.tail = function() { return this.map(fn, gen.tail()); };
                     return g;
                 },
                 // `filter` implementation for generators.
                 filter: function(fn) {
                     var gen = this, head = gen[0];
                     while (!fn(head)) {
                         gen = gen.tail();
                         head = gen[0];
                     }
                     var g = create(G.prototype);
                     g[0] = head;
                     g.tail = function() {return filter(fn, gen.tail());};
                     return g;
                 }
            };

            // The actual public `generator` function.
            return function(seed, current, step) {
                return new G(seed, current, step);
            };
        }());

        // Returns a lazy list of identical values, probably most useful with `take` for initializing a list.
        var repeat = R.repeat = function(value) {
            var fn = always(value);
            return generator(null, fn, fn);
        };

        // Returns a fixed list (of size `n`) of identical values.
        repeat.nTimes = _(function(value, n) {
            return take(n, repeat(value));
        });


        // Function functions :-)
        // ----------------------
        //
        // These functions make new functions out of old ones.

        // --------

        // Creates a new function that runs each of the functions supplied as parameters in turn, passing the output
        // of each one to the next one, starting with whatever arguments were passed to the initial invocation.
        // Note that if `var h = compose(f, g)`, `h(x)` calls `g(x)` first, passing the result of that to `f()`.
        var compose = R.compose = function() {  // TODO: type check of arguments?
            var fns = slice(arguments);
            return function() {
                return foldr(function(args, fn) { return [fn.apply(this, args)]; }, slice(arguments), fns)[0];
            };
        };

        // Similar to `compose`, but processes the functions in the reverse order so that if if `var h = pipe(f, g)`,
        // `h(x)` calls `f(x)` first, passing the result of that to `g()`.
        R.pipe = function() { // TODO: type check of arguments?
            return compose.apply(this, slice(arguments).reverse());
        };
        aliasFor("pipe").is("sequence");

        // Returns a new function much like the supplied one except that the first two arguments are inverted.
        var flip = R.flip = function(fn) {
            return _(function(a, b) {
                return fn.apply(this, [b, a].concat(slice(arguments, 2)));
            });
        };

        // Creates a new function that acts like the supplied function except that the left-most parameters are
        // pre-filled.
        R.lPartial = function (fn) {
            var args = slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function() {
                return fn.apply(this, args.concat(slice(arguments)));
            });
        };
        aliasFor("lPartial").is("applyLeft");

        // Creates a new function that acts like the supplied function except that the right-most parameters are
        // pre-filled.
        R.rPartial =function (fn) {
            var args = slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function() {
                return fn.apply(this, slice(arguments).concat(args));
            });
        };
        aliasFor("rPartial").is("applyRight");

        // Creates a new function that stores the results of running the supplied function and returns those
        // stored value when the same request is made.  **Note**: this really only handles string and number parameters.
        R.memoize = function(fn) {
            var cache = {};
            return function() {
                var position = foldl(function(cache, arg) {return cache[arg] || (cache[arg] = {});}, cache,
                        slice(arguments, 0, arguments.length - 1));
                var arg = arguments[arguments.length - 1];
                return (position[arg] || (position[arg] = fn.apply(this, arguments)));
            };
        };

        // Wraps a function up in one that will only call the internal one once, no matter how many times the outer one
        // is called.  ** Note**: this is not really pure; it's mostly meant to keep side-effects from repeating.
        R.once = function(fn) {
            var called = false, result;
            return function() {
                if (called) {return result;}
                called = true;
                result = fn.apply(this, arguments);
                return result;
            };
        };

        // Wrap a function inside another to allow you to make adjustments to the parameters or do other processing
        // either before the internal function is called or with its results.
        R.wrap = function(fn, wrapper) {
            return function() {
                return wrapper.apply(this, [fn].concat(slice(arguments)));
            };
        };

        // Wraps a constructor function inside a (curried) plain function that can be called with the same arguments
        // and returns the same type.  Allows, for instance,
        //
        //     var Widget = function(config) { /* ... */ }; // Constructor
        //     Widget.prototype = { /* ... */ }
        //     map(construct(Widget), allConfigs); //=> list of Widgets
        R.construct = function(fn) {
            var f = function() {
                var obj = new fn();
                fn.apply(obj, arguments);
                return obj;
            };
            return fn.length > 1 ? _(nAry(fn.length, f)) : f;
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

        // (Internal use only) The basic implementation of filter.
        var internalFoldl = _(function(useIdx, fn, acc, list) {
            if (list && list.length === Infinity) {
                return list.foldl(fn, acc); // TODO: figure out useIdx
            }
            var idx = -1, len = list.length, result = [];
            while (++idx < len) {
                acc = (useIdx) ? fn(acc, list[idx], idx, list) : fn(acc, list[idx]);
            }
            return acc;
        });

        // Returns a single item, by successively calling the function with the current element and the the next
        // element of the list, passing the result to the next call.  We start with the `acc` parameter to get
        // things going.  The function supplied should accept this running value and the latest element of the list,
        // and return an updated value.
        var foldl = R.foldl = internalFoldl(false);
        aliasFor("foldl").is("reduce");
        R.foldl.idx = internalFoldl(true);

        // Much like `foldl`/`reduce`, except that this takes as its starting value the first element in the list.
        R.foldl1 = _(function (fn, list) {
            if (isEmpty(list)) {
                throw new Error("foldl1 does not work on empty lists");
            }
            return foldl(fn, head(list), tail(list));
        });

        // (Internal use only) The basic implementation of foldr.
        var internalFoldr= _(function(useIdx, fn, acc, list) {
            if (list && list.length === Infinity) {
                return list.foldr(fn, acc); // TODO: figure out useIdx
            }
            var idx = list.length;
            while (idx--) {
                acc = (useIdx) ? fn(acc, list[idx], idx, list) : fn(acc, list[idx]);
            }
            return acc;
        });

        // Returns a single item, by successively calling the function with the current element and the the next
        // Similar to `foldl`/`reduce` except that it moves from right to left on the list.
        var foldr = R.foldr = internalFoldr(false);
        aliasFor("foldr").is("reduceRight");
        R.foldr.idx = internalFoldr(true);


        // Much like `foldr`/`reduceRight`, except that this takes as its starting value the last element in the list.
        R.foldr1 = _(function (fn, list) {
            if (isEmpty(list)) {
                throw new Error("foldr1 does not work on empty lists");
            }
            var newList = clone(list), acc = newList.pop();
            return foldr(fn, acc, newList);
        });

        // Builds a list from a seed value, using a function that returns falsy to quit and a pair otherwise,
        // consisting of the current value and the seed to be used for the next value.

        R.unfoldr = _(function(fn, seed) {
            var pair = fn(seed), result = [];
            while (pair && pair.length) {
                result.push(pair[0]);
                pair = fn(pair[1]);
            }
            return result;
        });


        // (Internal use only) The basic implementation of map.
        var internalMap = _(function(useIdx, fn, list) {
            if (list && list.length === Infinity) {
                return list.map(fn, list);
            }
            var idx = -1, len = list.length, result = new Array(len);
            if (useIdx) {
                while (++idx < len) {
                    result[idx] = fn(list[idx], idx, list);
                }
            } else {
                while (++idx < len) {
                    result[idx] = fn(list[idx]);
                }
            }
            return result;
        });
        // Returns a new list constructed by applying the function to every element of the list supplied.
        var map = R.map = internalMap(false);

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

        map.idx = internalMap(true);

        // Reports the number of elements in the list
        R.size = function(arr) {return arr.length;};

        // (Internal use only) The basic implementation of filter.
        var internalFilter = _(function(useIdx, fn, list) {
            if (list && list.length === Infinity) {
                return list.filter(fn); // TODO: figure out useIdx
            }
            var idx = -1, len = list.length, result = [];
            while (++idx < len) {
                if (!useIdx && fn(list[idx]) || fn(list[idx], idx, list)) {
                    result.push(list[idx]);
                }
            }
            return result;
        });

        // Returns a new list containing only those items that match a given predicate function.
        var filter = R.filter = internalFilter(false);

        // Like `filter`, but passes additional parameters to the predicate function.  Parameters are
        // `list item`, `index of item in list`, `entire list`.
        //
        // Example:
        //
        //     var lastTwo = function(val, idx, list) {
        //         return list.length - idx <= 2;
        //     };
        //     filter.idx(lastTwo, [8, 6, 7, 5, 3, 0 ,9]); //=> [0, 9]
        filter.idx = internalFilter(true);

        // Similar to `filter`, except that it keeps only those that **don't** match the given predicate functions.
        var reject = R.reject = _(function(fn, list) {
            return filter(notFn(fn), list);
        });

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
        reject.idx = _(function(fn, list) {
            return filter.idx(notFn(fn), list);
        });

        // Returns a new list containing the elements of the given list up until the first one where the function
        // supplied returns `false` when passed the element.
        R.takeWhile = _(function(fn, list) {
            var idx = -1, len = list.length, taking = true, result = [];
            while (taking) {
                ++idx;
                if (idx < len && fn(list[idx])) {
                    result.push(list[idx]);
                } else {
                    taking = false;
                }
            }
            return result;
        });

        // Returns a new list containing the first `n` elements of the given list.
        var take = R.take = _(function(n, list) {
            if (list && list.length === Infinity) {
                return list.take(n);
            }
            var ls = clone(list);
            ls.length = n;
            return ls;
        });

        // Returns a new list containing the elements of the given list starting with the first one where the function
        // supplied returns `false` when passed the element.
        R.skipUntil = _(function(fn, list) {
            var idx = -1, len = list.length, taking = false, result = [];
            while (!taking) {
                ++idx;
                if (idx >= len || fn(list[idx])) {
                    taking = true;
                }
            }
            while (idx < len) {
                result.push(list[idx++]);
            }
            return result;
        });

        // Returns a new list containing all **but** the first `n` elements of the given list.
        R.skip = _(function(n, list) {
            if (list && list.length === Infinity) {
                return list.skip(n);
            }
            return slice(list, n);
        });
        aliasFor('skip').is('drop');

        // Returns the first element of the list which matches the predicate, or `undefined` if no element matches.
        R.find = _(function(fn, list) {
            var idx = -1, len = list.length;
            while (++idx < len) {
                if (fn(list[idx])) {
                    return list[idx];
                }
            }
            return undef;
        });

        // Returns the index of first element of the list which matches the predicate, or `undefined` if no element matches.
        R.findIndex = _(function(fn, list) {
            var idx = -1, len = list.length;
            while (++idx < len) {
                if (fn(list[idx])) {
                    return idx;
                }
            }
            return undef;
        });

        // Returns the last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLast = _(function(fn, list) {
            var idx = list.length;
            while (--idx) {
                if (fn(list[idx])) {
                    return list[idx];
                }
            }
            return undef;
        });

        // Returns the index of last element of the list which matches the predicate, or `undefined` if no element matches.
        R.findLastIndex = _(function(fn, list) {
            var idx = list.length;
            while (--idx) {
                if (fn(list[idx])) {
                    return idx;
                }
            }
            return undef;
        });

        // Returns `true` if all elements of the list match the predicate, `false` if there are any that don't.
        var all = R.all = _(function (fn, list) {
            var i = -1;
            while (++i < list.length) {
                if (!fn(list[i])) {
                    return false;
                }
            }
            return true;
        });
        aliasFor("all").is("every");


        // Returns `true` if any elements of the list match the predicate, `false` if none do.
        var any = R.any = _(function(fn, list) {
            var i = -1;
            while (++i < list.length) {
                if (fn(list[i])) {
                    return true;
                }
            }
            return false;
        });
        aliasFor("any").is("some");

        // Returns `true` if the list contains the sought element, `false` if it does not.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var contains = R.contains = _(function(a, list) {
            return list.indexOf(a) > -1;
        });

        // Returns `true` if the list contains the sought element, `false` if it does not, based upon the value
        // returned by applying the supplied predicated to two list elements.  Equality is strict here, meaning
        // reference equality for objects and non-coercing equality for primitives.  Probably inefficient.
        var containsWith = _(function(pred, x, list) {
            var idx = -1, len = list.length;
            while (++idx < len) {
                if (pred(x, list[idx])) {return true;}
            }
            return false;
        });

        // Returns a new list containing only one copy of each element in the original list.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var uniq = R.uniq = function(list) {
            return foldr(function(acc, x) { return (contains(x, acc)) ? acc : prepend(x, acc); }, EMPTY, list);
        };

        // returns `true` if all of the elements in the `list` are unique.
        R.isSet = function(list) {
            return uniq(list).length === list.length;
        };

        // Returns a new list containing only one copy of each element in the original list, based upon the value
        // returned by applying the supplied predicate to two list elements.   Equality is strict here,  meaning
        // reference equality for objects and non-coercing equality for primitives.
        var uniqWith = _(function(pred, list) {
            return foldr(function(acc, x) {return (containsWith(pred, x, acc)) ? acc : prepend(x, acc); }, EMPTY, list);
        });


        // Returns a new list by plucking the same named property off all objects in the list supplied.
        var pluck = R.pluck = _(function(p, list) {return map(prop(p), list);});
        
        // Returns a list that contains a flattened version of the supplied list.  For example:
        //
        //     flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
        //     // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var flatten = R.flatten = function(list) {
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
        // Note that the output list will only be as long as the length os the first list passed in.
        R.zipWith = _(function(fn, a, b) {
            var rv = [], i = -1, len = a.length;
            while(++i < len) {
                rv[i] = fn(a[i], b[i]);
            }
            return rv;
        });

        // Creates a new list out of the two supplied by yielding the pair of each equally-positioned pair in the
        // lists.  For example,
        //
        //     zip([1, 2, 3], ['a', 'b', 'c'])
        //     //    => [[1, 'a'], [2, 'b'], [3, 'c']];
        R.zip =  _(function(a, b) { // = zipWith(prepend);
            var rv = [], i = -1, len = a.length;
            while (++i < len) {
                rv[i] = [a[i], b[i]];
            }
            return rv;
        });

        // Creates a new list out of the two supplied by applying the function to each possible pair in the lists.
        //  For example,
        //
        //     xProdWith(f, [1, 2], ['a', 'b'])
        //     //    => [f(1, 'a'), f(1, 'b'), f(2, 'a'), f(2, 'b')];
        R.xprodWith = _(function(fn, a, b) {
            if (isEmpty(a) || isEmpty(b)) {return EMPTY;}
            var i = -1, ilen = a.length, j, jlen = b.length, result = []; // better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
            while (++i < ilen) {
                j = -1;
                while (++j < jlen) {
                    result.push(fn(a[i], b[j]));
                }
            }
            return result;
        });

        // Creates a new list out of the two supplied by yielding the pair of each possible pair in the lists.
        // For example,
        //
        //     xProd([1, 2], ['a', 'b'])
        //     //    => [[1, 'a'], [1, 'b')], [2, 'a'], [2, 'b']];
        R.xprod = _(function(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
            if (isEmpty(a) || isEmpty(b)) {return EMPTY;}
            var i = -1, ilen = a.length, j, jlen = b.length, result = []; // better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
            while (++i < ilen) {
                j = -1;
                while (++j < jlen) {
                    result.push([a[i], b[j]]);
                }
            }
            return result;
        });

        // Returns a new list with the same elements as the original list, just in the reverse order.
        R.reverse = function(list) {
            return clone(list || []).reverse();
        };

        // // Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
        // For example, 
        //
        //     range(1, 5) // => [1, 2, 3, 4]
        //     range(50, 53) // => [50, 51, 52]
        R.range = _(function(from, to) {
            if (from >= to) {return EMPTY;}
            var idx, result = new Array(to - from);
            for (idx = 0; from < to; idx++, from++) {
                result[idx] = from;
            }
            return result;
        });


        // Returns the first zero-indexed position of an object in a flat list
        R.indexOf = _(function(obj, list) {
            return list.indexOf(obj);
        });

        // Returns the last zero-indexed position of an object in a flat list
        R.lastIndexOf = _(function(obj, list) {
            return list.lastIndexOf(obj);
        });

        // Returns the elements of the list as a string joined by a separator.
        R.join = _(function(sep, list) {
            return list.join(sep);
        });

        // ramda.splice has a different contract than Array.splice. Array.splice mutates its array
        // and returns the removed elements. ramda.splice does not mutate the passed in list (well,
        // it makes a shallow copy), and returns a new list with the specified elements removed. 
        R.splice = _(function(start, len, list) {
            var ls = slice(list, 0);
            ls.splice(start, len);
            return ls;
        });

        // Returns the `n`th element of a list (zero-indexed)
        R.nth = _(function(n, list) {
          return list[n];
        });

        // Makes a comparator function out of a function that reports whether the first element is less than the second.
        //
        //     var cmp = comparator(function(a, b) {
        //         return a.age < b.age;
        //     };
        //     sort(cmp, people);
        var comparator = R.comparator = function(pred) {
            return function(a, b) {
                return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
            };
        };

        // Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
        // time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
        // if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
        var sort = R.sort = _(function(comparator, list) {
            return clone(list).sort(comparator);
        });


        // Object Functions
        // ----------------
        //
        // These functions operate on plain Javascript object, adding simple functions to test properties on these
        // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
        // objects.

        // --------

        // Runs the given function with the supplied object, then returns the object.
        R.tap = _(function(x, fn) {
            if (typeof fn === "function") {
                fn(x);
            }
            return x;
        });
        aliasFor("tap").is("K");

        // Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
        // non-coercing equality for primitives.
        R.eq = _(function(a, b) {
            return a === b;
        });

        // Returns a function that when supplied an object returns the indicated property of that object, if it exists.
        var prop = R.prop = _(function(p, obj) {return obj[p];});
        aliasFor("prop").is("get"); // TODO: are we sure?  Matches some other libs, but might want to reserve for other use.

        // Returns a function that when supplied an object returns the result of running the indicated function on
        // that object, if it has such a function.
        R.func = _(function(fn, obj) {return obj[fn].apply(obj, slice(arguments, 2));});


        // Returns a function that when supplied a property name returns that property on the indicated object, if it
        // exists.
        R.props = _(function(obj, prop) {return obj && obj[prop];});


        // Returns a function that always returns the given value.
        var always = R.always = function(val) {
            return function() {return val;};
        };

        var anyBlanks = any(function(val) {return val === null || val === undef;});

        // Returns a function that will only call the indicated function if the correct number of (defined, non-null)
        // arguments are supplied, returning `undefined` otherwise.
        R.maybe = function (fn) {
            return function () {
                return (arguments.length === 0 || anyBlanks(expand(arguments, fn.length))) ? undef : fn.apply(this, arguments);
            };
        };

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

        var partialCopy = function(test, obj) {
            var copy = {};
            each(function(key) {if (test(key, obj)) {copy[key] = obj[key];}}, keys(obj));
            return copy;
        };

        // Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
        // property is ignored
        R.pick = _(function(names, obj) {
            return partialCopy(function(key) {return contains(key, names);}, obj);
        });

        // Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
        var pickAll = R.pickAll = _(function(names, obj) {
            var copy = {};
            each(function(name) { copy[name] = obj[name]; }, names);
            return copy;
        });

        // Returns a partial copy of an object omitting the keys specified.
        R.omit = _(function(names, obj) {
            return partialCopy(function(key) {return !contains(key, names);}, obj);
        });

        // Returns a new object that mixes in the own properties of two objects.
        R.mixin = _(function(a, b) {
          var mixed = pickAll(R.keys(a), a);
          each(function(key) { mixed[key] = b[key]; }, R.keys(b));
          return mixed;
        });

        // Reports whether two functions have the same value for the specified property.  Useful as a curried predicate.
        R.eqProps = _(function(prop, obj1, obj2) {return obj1[prop] === obj2[prop];});

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
        R.where = _(function(spec, test) {
            return all(function(key) {
                var val = spec[key];
                return (typeof val === 'function') ? val(test[key], test) : (test[key] === val);
            }, keys(spec));
        });


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

        // A function wrapping the boolean `&&` operator.  Note that unlike the underlying operator, though, it
        // aways returns `true` or `false`.
        R.and = _(function (a, b) {
            return !!(a && b);
        });

        // A function wrapping the boolean `||` operator.  Note that unlike the underlying operator, though, it
        // aways returns `true` or `false`.
        R.or = _(function (a, b) {
            return !!(a || b);
        });

        // A function wrapping the boolean `!` operator.  It returns `true` if the parameter is false-y and `false` if
        // the parameter is truth-y
        R.not = function (a) {
            return !a;
        };

        // A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
        // value.
        R.andFn = _(function(f, g) { // TODO: arity?
           return function() {return !!(f.apply(this, arguments) && g.apply(this, arguments));};
        });

        // A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
        // value. (Note also that at least Oliver Twist can pronounce this one...)
        R.orFn = _(function(f, g) { // TODO: arity?
           return function() {return !!(f.apply(this, arguments) || g.apply(this, arguments));};
        });

        // A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
        // underlying function would return a false-y value, and `false` when it would return a truth-y one.
        var notFn = R.notFn = function (f) {
            return function() {return !f.apply(this, arguments);};
        };


        // TODO: is there a way to unify allPredicates and anyPredicates? they are sooooo similar

        // Given a list of predicates returns a new predicate that will be true exactly when all of them are.
        R.allPredicates = function(preds /*, val1, val12, ... */) {
            var args = slice(arguments, 1);
            var maxArity = max(pluck("length", preds));

            var andPreds = arity(maxArity, function() {
                var idx = -1;
                while (++idx < preds.length) {
                    if (!preds[idx].apply(null, arguments)) { return false; }
                }
                return true;
            });
            return (isEmpty(args)) ? andPreds : andPreds.apply(null, args);
        };


        // Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
        R.anyPredicates = function(preds /*, val1, val12, ... */) {
            var args = slice(arguments, 1);
            var maxArity = max(pluck("length", preds));

            var orPreds = arity(maxArity, function() {
                var idx = -1;
                while (++idx < preds.length) {
                    if (preds[idx].apply(null, arguments)) { return true; }
                }
                return false;
            });
            return (isEmpty(args)) ? orPreds : orPreds.apply(null, args);
        };



        // Arithmetic Functions
        // --------------------
        //
        // These functions wrap up the certain core arithmetic operators

        // --------

        // Adds two numbers.  Automatic curried:
        //
        //     var add7 = add(7);
        //     add7(10); // => 17
        var add = R.add = _(function(a, b) {return a + b;});

        // Multiplies two numbers.  Automatically curried:
        //
        //     var mult3 = multiply(3);
        //     mult3(7); // => 21
        var multiply = R.multiply = _(function(a, b) {return a * b;});

        // Subtracts the second parameter from the first.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `subtractN` might be what's wanted.
        //
        //     var complementaryAngle = subtract(90);
        //     complementaryAngle(30) ; // => 60
        var subtract = R.subtract = _(function(a, b) {return a - b;});

        // Reversed version of `subtract`, where first parameter is subtracted from the second.  The curried version of
        // this one might me more useful than that of `subtract`.  For instance:
        //
        //     var decrement = subtractN(1);
        //     decrement(10); // => 9;
        R.subtractN = flip(subtract);

        // Divides the first parameter by the second.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `divideBy` might be what's wanted.
        var divide = R.divide = _(function(a, b) {return a / b;});

        // Reversed version of `divide`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `divide`.  For instance:
        //
        //     var half = divideBy(2);
        //     half(42); // => 21
        R.divideBy = flip(divide);

        // Adds together all the elements of a list.
        R.sum = foldl(add, 0);

        // Multiplies together all the elements of a list.
        R.product = foldl(multiply, 1);

        // Returns true if the first parameter is less than the second.
        R.lt = _(function(a, b) {return a < b;});

        // Returns true if the first parameter is less than or equal to the second.
        R.lte = _(function(a, b) {return a <= b;});

        // Returns true if the first parameter is greater than the second.
        R.gt = _(function(a, b) {return a > b;});

        // Returns true if the first parameter is greater than or equal to the second.
        R.gte = _(function(a, b) {return a >= b;});

        // Determines the largest of a list of numbers (or elements that can be cast to numbers)
        var max = R.max = function(list) {return Math.max.apply(null, list);};

        // Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.maxWith = _(function(comparator, list) {
            if (!isArray(list) || !list.length) {
                return null;
            }
            var idx = 0, max = list[idx];
            while (++idx < list.length) {
                if (comparator(max, list[idx]) < 0) {
                    max = list[idx];
                }
            }
            return max;
        });

        // TODO: combine this with maxWith?

        // Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
        R.minWith = _(function(comparator, list) {
            if (!isArray(list) || !list.length) {
                return null;
            }
            var idx = 0, max = list[idx];
            while (++idx < list.length) {
                if (comparator(max, list[idx]) > 0) {
                    max = list[idx];
                }
            }
            return max;
        });


        // Determines the smallest of a list of numbers (or elements that can be cast to numbers)
        R.min = function(list) {return Math.min.apply(null, list);};


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
        R.propEq = _(function(name, val, obj) {
            return obj[name] === val;
        });

        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.
        R.union = compose(uniq, merge);

        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
        // determined according to the value returned by applying the supplied predicate to two list elements.
        R.unionWith = _(function(pred, list1, list2) {
            return uniqWith(pred, merge(list1, list2));
        });

        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        R.difference = _(function(first, second) {return uniq(reject(flip(contains)(second))(first));});

        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        // Duplication is determined according to the value returned by applying the supplied predicate to two list
        // elements.
        R.differenceWith = _(function(pred, first, second) {
            return uniqWith(pred)(reject(flip(containsWith(pred))(second), first));
        });

        // Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
        R.intersection = _(function(list1, list2) {
            return uniq(filter(flip(contains)(list1), list2));
        });

        // Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
        // Duplication is determined according to the value returned by applying the supplied predicate to two list
        // elements.
        R.intersectionWith = _(function(pred, list1, list2) {
            var results = [], idx = -1;
            while (++idx < list1.length) {
                if (containsWith(pred, list1[idx], list2)) {
                    results[results.length] = list1[idx];
                }
            }
            return uniqWith(pred, results);
        });

        // Creates a new list whose elements each have two properties: `val` is the value of the corresponding
        // item in the list supplied, and `key` is the result of applying the supplied function to that item.
        var keyValue = _(function(fn, list) { // TODO: Should this be made public?
            return map(function(item) {return {key: fn(item), val: item};}, list);
        });

        // Sorts the list according to a key generated by the supplied function.
        R.sortBy = _(function(fn, list) {
            /*
              return sort(comparator(function(a, b) {return fn(a) < fn(b);}), list); // clean, but too time-inefficient
              return pluck("val", sort(comparator(function(a, b) {return a.key < b.key;}), keyValue(fn, list))); // nice, but no need to clone result of keyValue call, so...
            */
            return pluck("val", keyValue(fn, list).sort(comparator(function(a, b) {return a.key < b.key;})));
        });

        // Counts the elements of a list according to how many match each value of a key generated by the supplied function.
        R.countBy = _(function(fn, list) {
            return foldl(function(counts, obj) {
                counts[obj.key] = (counts[obj.key] || 0) + 1;
                return counts;
            }, {}, keyValue(fn, list));
        });

        // Groups the elements of a list by a key generated by the supplied function.
        R.groupBy = _(function(fn, list) {
            return foldl(function(groups, obj) {
                (groups[obj.key] || (groups[obj.key] = [])).push(obj.val);
                return groups;
            }, {}, keyValue(fn, list));
        });



        // All the functional goodness, wrapped in a nice little package, just for you!
        return R;
    }());
}));