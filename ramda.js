//     ramda.js 0.2.4
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
         * TODO: JSDoc-style documentation for this function
         */
        var R = {};

        // Internal Functions and Properties
        // ---------------------------------

        /**
         * A reference to the `undefined` value.
         *
         * Note that this is defined as the result of calling an empty function because JSHint
         * complains about these constructs:
         *
         * var undef = void 0;
         * var undef = undefined;
         */
        var undef = (function () {})();

        /**
         * Creates an alias for a public function.
         *
         * @private
         * @category Internal
         * @param {string} oldName The name of the public function to alias.
         * @return {Function} A function decorated with the `is`, `are`, and `and` methods. Create
         * an alias for the `oldName function by invoking any of these methods an passing it a
         * string with the `newName` parameter.
         * @example
         *
         * // Create an alias for `each` named `forEach`
         * aliasFor('each').is('forEach');
         */
        var aliasFor = function (oldName) {
            var fn = function (newName) {
                R[newName] = R[oldName];
                return fn;
            };
            fn.is = fn.are = fn.and = fn;
            return fn;
        };

        /**
         * An optimized, private array `slice` implementation.
         *
         * @private
         * @category Internal
         * @param {Arguments|Array} args The array or arguments object to consider.
         * @param {number} [from=0] The array index to slice from, inclusive.
         * @param {number} [to=args.length] The array index to slice to, exclusive.
         * @return {Array} A new, sliced array.
         * @example
         *
         * _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
         *
         * var firstThreeArgs = function(a, b, c, d) {
         *   return _slice(arguments, 0, 3);
         * };
         * firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
         */
        var _slice = function (args, from, to) {
            from = (typeof from === "number" ) ? from : 0;
            to = (typeof to === "number" ) ? to : args.length;
            var length = to - from,
                arr = new Array(length),
                i = -1;

            while (++i < length) {
                arr[i] = args[from + i];
            }
            return arr;
        };

        /**
         * Private `concat` function to merge two array-like objects.
         *
         * @private
         * @category Internal
         * @param {Array|Arguments} [set1=[]] An array-like object.
         * @param {Array|Arguments} [set2=[]] An array-like object.
         * @return {Array} A new, merged array.
         * @example
         *
         * concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
         */
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

        // Private reference to toString function.
        var toString = Object.prototype.toString;

        /**
         * Tests whether or not an object is an array.
         *
         * @private
         * @category Internal
         * @param {*} val The object to test.
         * @return {boolean} `true` if `val` is an array, `false` otherwise.
         * @example
         *
         * isArray([]); //=> true
         * isArray(true); //=> false
         * isArray({}); //=> false
         */
        var isArray = Array.isArray || function (val) {
            return val && val.length >= 0 && toString.call(val) === "[object Array]";
        };

        /**
         * Creates a new version of `fn` that, when invoked, will return either:
         * - A new function ready to accept one or more of `fn`'s remaining arguments, if all of
         * `fn`'s expected arguments have not yet been provided
         * - `fn`'s result if all of its expected arguments have been provided
         *
         * Optionally, you may provide an arity for the returned function.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to curry.
         * @param {number} [fnArity=fn.length] An optional arity for the returned function.
         * @return {Function} A new, curried function.
         * @example
         *
         * var addFourNumbers = function(a, b, c, d) {
         *   return a + b + c + d;
         * };
         *
         * var curriedAddFourNumbers = curry(addFourNumbers);
         * var f = curriedAddFourNumbers(1, 2);
         * var g = f(3);
         * g(4);//=> 10
         */
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
         * Optimized internal two-arity curry function.
         *
         * @private
         * @category Function
         * @param {Function} fn The function to curry.
         * @return {boolean} `true` if `val` is an array, `false` otherwise.
         * @example
         *
         * var addTwo = function(a, b) {
         *   return a + b;
         * };
         * var curriedAddTwo = curry2(addTwo);
         */
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
         * Optimized internal three-arity curry function.
         *
         * @private
         * @category Function
         * @param {Function} fn The function to curry.
         * @return {boolean} `true` if `val` is an array, `false` otherwise.
         * @example
         *
         * var addThree = function(a, b, c) {
         *   return a + b + c;
         * };
         * var curriedAddThree = curry2(addThree);
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
         * Private function that determines whether or not a provided object has a given method.
         * Does not ignore methods stored on the object's prototype chain. Used for dynamically
         * dispatching Ramda methods to non-Array objects.
         *
         * @private
         * @category Internal
         * @param {Function} methodName The name of the method to check for.
         * @param {Function} obj The object to test.
         * @return {boolean} `true` has a given method, `false` otherwise.
         * @example
         *
         * var person = { name: 'John' };
         * person.shout = function() { alert(this.name); };
         *
         * hasMethod('shout', person); //=> true
         * hasMethod('foo', person); //=> false
         */
        var hasMethod = function (methodName, obj) {
            return obj && !isArray(obj) && typeof obj[methodName] === 'function';
        };

        /**
         * TODO
         *
         * @private
         * @category Internal
         * @param {TODO} n TODO
         * @return {string} TODO
         * @example
         *
         * TODO
         */
        var mkArgStr = function (n) {
            var arr = [], idx = -1;
            while (++idx < n) {
                arr[idx] = "arg" + idx;
            }
            return arr.join(", ");
        };

        /**
         * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
         * parameters. Any extraneous parameters will not be passed to the supplied function.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {number} n The desired arity of the new function.
         * @param {Function} fn The function to wrap.
         * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
         * arity `n`.
         * @example
         *
         * var takesTwoArgs = function(a, b) {
         *   return [a, b];
         * };
         * takesTwoArgs.length; //=> 2
         * takesTwoArgs(1, 2); //=> [1, 2]
         *
         * var takesOneArg = ramda.nAry(1, takesTwoArgs);
         * takesOneArg.length; //=> 1
         * // Only `n` arguments are passed to the wrapped function
         * takesOneArg(1, 2); //=> [1, undefined]
         */
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
         * Wraps a function of any arity (including nullary) in a function that accepts exactly 1
         * parameter. Any extraneous parameters will not be passed to the supplied function.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to wrap.
         * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
         * arity 1.
         * @example
         *
         * var takesTwoArgs = function(a, b) {
         *   return [a, b];
         * };
         * takesTwoArgs.length; //=> 2
         * takesTwoArgs(1, 2); //=> [1, 2]
         *
         * var takesOneArg = ramda.unary(1, takesTwoArgs);
         * takesOneArg.length; //=> 1
         * // Only 1 argument is passed to the wrapped function
         * takesOneArg(1, 2); //=> [1, undefined]
         */
        R.unary = function (fn) {
            return nAry(1, fn);
        };

        /**
         * Wraps a function of any arity (including nullary) in a function that accepts exactly 2
         * parameters. Any extraneous parameters will not be passed to the supplied function.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to wrap.
         * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
         * arity 2.
         * @example
         *
         * var takesThreeArgs = function(a, b, c) {
         *   return [a, b, c];
         * };
         * takesThreeArgs.length; //=> 3
         * takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
         *
         * var takesTwoArgs = ramda.binary(1, takesThreeArgs);
         * takesTwoArgs.length; //=> 2
         * // Only 2 arguments are passed to the wrapped function
         * takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
         */
        var binary = R.binary = function (fn) {
            return nAry(2, fn);
        };

        /**
         * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
         * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
         * functions produced by `arity` will pass all provided arguments to the wrapped function.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {number} n The desired arity of the returned function.
         * @param {Function} fn The function to wrap.
         * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
         * arity `n`.
         * @example
         *
         * var takesTwoArgs = function(a, b) {
         *   return [a, b];
         * };
         * takesTwoArgs.length; //=> 2
         * takesTwoArgs(1, 2); //=> [1, 2]
         *
         * var takesOneArg = ramda.unary(1, takesTwoArgs);
         * takesOneArg.length; //=> 1
         * // All arguments are passed through to the wrapped function
         * takesOneArg(1, 2); //=> [1, 2]
         */
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
         * Turns a named method of an object (or object prototype) into a function that can be
         * called directly. Passing the optional `len` parameter restricts the returned function to
         * the initial `len` parameters of the method.
         *
         * The returned function is curried and accepts `len + 1` parameters (or `method.length + 1`
         * when `len` is not specified), and the final parameter is the target object.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {string} name The name of the method to wrap.
         * @param {Object} obj The object to search for the `name` method.
         * @param [len] The desired arity of the wrapped method.
         * @return {Function} A new function or `undefined` if the specified method is not found.
         * @example
         *
         *
         * var charAt = ramda.invoker('charAt', String.prototype);
         * charAt(6, 'abcdefghijklm'); //=> 'g'
         *
         * var join = ramda.invoker('join', Array.prototype);
         * var firstChar = charAt(0);
         * join('', ramda.map(firstChar, ["light", "ampliifed", "stimulated", "emission", "radiation"]));
         * //=> 'laser'
         */
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
         * Accepts a function `fn` and any number of transformer functions and returns a new
         * function. When the new function is invoked, it calls the function `fn` with parameters
         * consisting of the result of calling each supplied handler on successive arguments to the
         * new function. For example:
         *
         * ```javascript
         *   var useWithExample = invoke(someFn, transformerFn1, transformerFn2);
         *
         *   // This invocation:
         *   useWithExample('x', 'y');
         *   // Is functionally equivalent to:
         *   someFn(transformerFn1('x'), transformerFn2('y'))
         * ```
         *
         * If more arguments are passed to the returned function than transformer functions, those
         * arguments are passed directly to `fn` as additional parameters. If you expect additional
         * arguments that don't need to be transformed, although you can ignore them, it's best to
         * pass an identity function so that the new function reports the correct arity.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to wrap.
         * @param {...Function} transformers A variable number of transformer functions
         * @return {Function} The wrapped function.
         * @example
         *
         * var double = function(y) { return y * 2; };
         * var square = function(x) { return x * x; };
         * var add = function(a, b) { return a + b; };
         * // Adds any number of arguments together
         * var addAll = function() {
         *   return ramda.reduce(add, 0, arguments);
         * };
         *
         * // Basic example
         * var addDoubleAndSquare = ramda.useWith(addAll, double, square);
         *
         * addDoubleAndSquare(10, 5); //≅ addAll(double(10), square(5));
         * //=> 125
         *
         * // Example of passing more arguments than transformers
         * addDoubleAndSquare(10, 5, 100); //≅ addAll(double(10), square(5), 100);
         * //=> 225
         *
         * // But if you're expecting additional arguments that don't need transformation, it's best
         * // to pass transformer functions so the resulting function has the correct arity
         * var addDoubleAndSquareWithExtraParams = ramda.useWith(addAll, double, square, ramda.identity);
         * addDoubleAndSquare(10, 5, 100); //≅ addAll(double(10), square(5), ramda.identity(100));
         * //=> 225
         */
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
         * TODO: JSDoc-style documentation for this function
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
         * Iterate over an input `list`, calling a provided function `fn` for each element in the
         * list.
         *
         * `fn` receives one argument: *(value)*.
         *
         * Note: `ramda.each` does not skip deleted or unassigned indices (sparse arrays), unlike
         * the native `Array.prototype.forEach` method. For more details on this behavior, see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
         *
         * Also note that, unlike `Array.prototype.forEach`, Ramda's `each` returns the original
         * array.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function to invoke. Receives one argument, `value`.
         * @param {Array} list The list to iterate over.
         * @return {Array} The original list.
         * @example
         *
         * ramda.each(function(num) {
         *   console.log(num + 100);
         * }, [1, 2, 3]); //=> [1, 2, 3]
         * //-> 101
         * //-> 102
         * //-> 103
         */
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
         * Like `each`, but but passes additional parameters to the predicate function.
         *
         * `fn` receives three arguments: *(value, index, list)*.
         *
         * Note: `ramda.each.idx` does not skip deleted or unassigned indices (sparse arrays),
         * unlike the native `Array.prototype.forEach` method. For more details on this behavior,
         * see:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
         *
         * Also note that, unlike `Array.prototype.forEach`, Ramda's `each` returns the original
         * array.
         *
         * @static
         * @memberOf R
         * @category List
         * @alias forEach
         * @param {Function} fn The function to invoke. Receives three arguments: (`value`, `index`,
         * `list`).
         * @param {Array} list The list to iterate over.
         * @return {Array} The original list.
         * @example
         *
         * // Note that having access to the original `list` allows for mutation. While you *can* do
         * // this, it's very un-functional behavior:
         * ramda.each.idx(function(num, idx, list) {
         *   list[idx] = num + 100;
         * }, [1, 2, 3]); //=> [101, 102, 103]
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
         * Creates a shallow copy of an array.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {Array} list The list to clone.
         * @return {Array} A new copy of the original list.
         * @example
         *
         * var numbers = [1, 2, 3];
         * var numbersClone = ramda.clone(numbers); //=> [1, 2, 3]
         * numbers === numbersClone; //=> false
         *
         * // Note that this is a shallow clone--it does not clone complex values:
         * var objects = [{}, {}, {}];
         * var objectsClone = ramda.clone(objects);
         * objects[0] === objectsClone[0]; //=> true
         */
        var clone = R.clone = function(list) {
            return _slice(list);
        };

        // Core Functions
        // --------------
        //

        /**
         * Reports whether an array is empty.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {Array} arr The array to consider.
         * @return {boolean} `true` if the `arr` argument has a length of 0 or if `arr` is a falsy
         * value (e.g. undefined).
         * @example
         *
         * ramda.isEmpty([1, 2, 3]); //=> false
         * ramda.isEmpty([]); //=> true
         * ramda.isEmpty(); //=> true
         * ramda.isEmpty(null); //=> true
         */
        var isEmpty = R.isEmpty = function (arr) {
            return !arr || !arr.length;
        };

        /**
         * Returns a new list with the given element at the front, followed by the contents of the
         * list.
         *
         * @static
         * @memberOf R
         * @category Array
         * @alias cons
         * @param {*} el The item to add to the head of the output list.
         * @param {Array} arr The array to add to the tail of the output list.
         * @return {Array} A new array.
         * @example
         *
         * ramda.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
         */
        var prepend = R.prepend = function (el, arr) {
            return concat([el], arr);
        };

        aliasFor("prepend").is("cons");

        /**
         * Returns the first element in a list.
         *
         * @static
         * @memberOf R
         * @category Array
         * @alias car, first
         * @param {Array} [arr=[]] The array to consider.
         * @return {*} The first element of the list, or `undefined` if the list is empty.
         * @example
         *
         * ramda.head(['fi', 'fo', 'fum']); //=> 'fi'
         */
        var head = R.head = function (arr) {
            arr = arr || [];
            return arr[0];
        };

        aliasFor("head").is("car").and("first");

        /**
         * Returns the last element from a list.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {Array} [arr=[]] The array to consider.
         * @return {*} The last element of the list, or `undefined` if the list is empty.
         * @example
         *
         * ramda.last(['fi', 'fo', 'fum']); //=> 'fum'
         */
        R.last = function (arr) {
            arr = arr || [];
            return arr[arr.length - 1];
        };

        /**
         * Returns all but the first element of a list. If the list provided has the `tail` method,
         * it will instead return `list.tail()`.
         *
         * @static
         * @memberOf R
         * @category Array
         * @alias cdr
         * @param {Array} [arr=[]] The array to consider.
         * @return {Array} A new array containing all but the first element of the input list, or an
         * empty list if the input list is a falsy value (e.g. `undefined`).
         * @example
         *
         * ramda.tail(['fi', 'fo', 'fum']); //=> ['fo', 'fum']
         */
        var tail = R.tail = function (arr) {
            arr = arr || [];
            if (hasMethod('tail', arr)) {
                return arr.tail();
            }
            return (arr.length > 1) ? _slice(arr, 1) : [];
        };

        aliasFor("tail").is("cdr");

        /**
         * Returns `true` if the argument is an atom; `false` otherwise. An atom is defined as any
         * value that is not an array, `undefined`, or `null`.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {*} x The element to consider.
         * @return {boolean} `true` if `x` is an atom, and `false` otherwise.
         * @example
         *
         * ramda.isAtom([]); //=> false
         * ramda.isAtom(null); //=> false
         * ramda.isAtom(undefined); //=> false
         *
         * ramda.isAtom(0); //=> true
         * ramda.isAtom(''); //=> true
         * ramda.isAtom('test'); //=> true
         * ramda.isAtom({}); //=> true
         */
        R.isAtom = function (x) {
            return x != null && !isArray(x);
        };

        /**
         * Returns a new list containing the contents of the given list, followed by the given
         * element.
         *
         * @static
         * @memberOf R
         * @category Array
         * @alias push
         * @param {*} el The element to add to the end of the new list.
         * @param {Array} list The list whose contents will be added to the beginning of the output
         * list.
         * @return {Array} A new list containing the contents of the old list followed by `el`.
         * @example
         *
         * ramda.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
         * ramda.append('tests', []); //=> ['tests']
         * ramda.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
         */
        var append = R.append = function(el, list) {
            return concat(list, [el]);
        };

        aliasFor("append").is("push");

        /**
         * Returns a new list consisting of the elements of the first list followed by the elements
         * of the second.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {Array} list1 The first list to merge.
         * @param {Array} list2 The second set to merge.
         * @return {Array} A new array consisting of the contents of `list1` followed by the
         * contents of `list2`. If, instead of an {Array} for `list1`, you pass an object with a `concat`
         * method on it, `concat` will call `list1.concat` and it the value of `list2`.
         * @example
         *
         * ramda.concat([], []); //=> []
         * ramda.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
         * ramda.concat("ABC", "DEF"); // "ABCDEF"
         */
        R.concat = curry2(function(set1, set2) {
            return (hasMethod('concat', set1)) ? set1.concat(set2) : concat(set1, set2);
        });

        /**
         * A function that does nothing but return the parameter supplied to it. Good as a default
         * or placeholder function.
         *
         * @static
         * @memberOf R
         * @category Core
         * @alias I
         * @param {*} x The value to return.
         * @return {*} The input value, `x`.
         * @example
         *
         * ramda.identity(1); //=> 1
         *
         * var obj = {};
         * ramda.identity(obj) === obj; //=> true
         */
        var identity = R.identity = function (x) {
            return x;
        };

        aliasFor("identity").is("I");

        /**
         * Calls an input function `n` times, returning an array containing the results of those
         * function calls.
         *
         * `fn` is passed one argument: The current value of `n`, which begins at `0` and is
         * gradually incremented to `n - 1`.
         *
         * @static
         * @memberOf R
         * @category List
         * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
         * @param {number} n A value between `0` and `n - 1`. Increments after each function call.
         * @return {Array} An array containing the return values of all calls to `fn`.
         * @example
         *
         * ramda.times(function(n) { return n; }, 5); //=> [0, 1, 2, 3, 4]
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
         * Returns a fixed list of size `n` containing a specified identical value.
         *
         * @static
         * @memberOf R
         * @category Array
         * @param {*} value The value to repeat.
         * @param {number} n The desired size of the output list.
         * @return {Array} A new array containing `n` `value`s.
         * @example
         *
         * ramda.repeatN('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
         *
         * var obj = {};
         * var repeatedObjs = ramda.repeatN(obj, 5); //=> [{}, {}, {}, {}, {}]
         * repeatedObjs[0] === repeatedObjs[1]; //=> true
         */
        R.repeatN = curry2(function (value, n) {
            return R.times(R.always(value), n);
        });


        // Function functions :-)
        // ----------------------
        //
        // These functions make new functions out of old ones.

        /**
         * Returns a new function which partially applies a value to a given function, where the
         * function is a variadic function that cannot be curried.
         *
         * @private
         * @category Function
         * @param {Function} f The function to partially apply `a` onto.
         * @param {*} a The argument to partially apply onto `f`.
         * @return {Function} A new function.
         * @example
         *
         * var addThree = function(a, b, c) {
         *   return a + b + c;
         * };
         * var partialAdd = partially(add, 1);
         * partialAdd(2, 3); //=> 6
         *
         * // partialAdd is invoked immediately, even though it expects three arguments. This is
         * // because, unlike many functions here, the result of `partially` is not a curried
         * // function.
         * partialAdd(2); //≅ addThree(1, 2, undefined) => NaN
         */
        function partially(f, a){
            return function() {
                return f.apply(this, concat([a], arguments));
            };
        }

        // --------

        /**
         * Basic, right-associative composition function. Accepts two functions and returns the
         * composite function; this composite function represents the operation `var h = f(g(x))`,
         * where `f` is the first argument, `g` is the second argument, and `x` is whatever
         * argument(s) are passed to `h`.
         *
         * This function's main use is to build the more general `compose` function, which accepts
         * any number of functions.
         *
         * @private
         * @category Function
         * @param {Function} f A function.
         * @param {Function} g A function.
         * @return {Function} A new function that is the equivalent of `f(g(x))`.
         * @example
         *
         * var double = function(x) { return x * 2; };
         * var square = function(x) { return x * x; };
         * var squareThenDouble = internalCompose(double, square);
         *
         * squareThenDouble(5); //≅ double(square(5)) => 50
         */
        function internalCompose(f, g) {
            return function() {
                return f.call(this, g.apply(this, arguments));
            };
        }

        /**
         * Creates a new function that runs each of the functions supplied as parameters in turn,
         * passing the return value of each function invocation to the next function invocation,
         * beginning with whatever arguments were passed to the initial invocation.
         *
         * Note that `compose` is a right-associative function, which means the functions provided
         * will be invoked in order from right to left. In the example `var h = compose(f, g)`,
         * the function `h` is equivalent to `f( g(x) )`, where `x` represents the arguments
         * originally passed to `h`.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {...Function} functions A variable number of functions.
         * @return {Function} A new function which represents the result of calling each of the
         * input `functions`, passing the result of each function call to the next, from right to
         * left.
         * @example
         *
         * var triple = function(x) { return x * 2; };
         * var double = function(x) { return x * 2; };
         * var square = function(x) { return x * x; };
         * var squareThenDoubleThenTriple = ramda.compose(triple, double, square);
         *
         * squareThenDoubleThenTriple(5); //≅ triple(double(square(5))) => 150
         */
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
         * Creates a new function that runs each of the functions supplied as parameters in turn,
         * passing the return value of each function invocation to the next function invocation,
         * beginning with whatever arguments were passed to the initial invocation.
         *
         * `pipe` is the mirror version of `compose`. `pipe` is left-associative, which means that
         * each of the functions provided is executed in order from left to right.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {...Function} functions A variable number of functions.
         * @return {Function} A new function which represents the result of calling each of the
         * input `functions`, passing the result of each function call to the next, from right to
         * left.
         * @example
         *
         * var triple = function(x) { return x * 2; };
         * var double = function(x) { return x * 2; };
         * var square = function(x) { return x * x; };
         * var squareThenDoubleThenTriple = ramda.pipe(square, double, triple);
         *
         * squareThenDoubleThenTriple(5); //≅ triple(double(square(5))) => 150
         */
        R.pipe = function() {  // TODO: type check of arguments?
            if (arguments.length == 1) {
                return partially (R.pipe, arguments[0]);
            }
            return compose.apply(this, _slice(arguments).reverse());
        };
        aliasFor("pipe").is("sequence");

        /**
         * Returns a new function much like the supplied one, except that the first two arguments'
         * order is reversed.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to invoke with its first two parameters reversed.
         * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
         * @example
         *
         * var mergeThree = function(a, b, c) {
         *   ([]).concat(a, b, c);
         * };
         * var numbers = [1, 2, 3];
         *
         * mergeThree(numbers); //=> [1, 2, 3]
         *
         * ramda.flip([1, 2, 3]); //=> [2, 1, 3]
         */
        var flip = R.flip = function (fn) {
            return function (a, b) {
                return arguments.length < 2 ?
                  function(b) { return fn.apply(this, [b, a].concat(_slice(arguments, 1))); } :
                  fn.apply(this, [b, a].concat(_slice(arguments, 2)));
            };
        };

        /**
         * Accepts as its arguments a function and any number of values and returns a function that,
         * when invoked, calls the original function with all of the values prepended to the
         * original function's arguments list.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to invoke.
         * @param {...*} [args] Arguments to prepend to `fn` when the returned function is invoked.
         * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn`
         * with `args` prepended to `fn`'s arguments list.
         * @example
         *
         * var multiply = function(a, b) { return a * b; };
         * var double = ramda.lPartial(multiply, 2);
         *
         * double(2); //=> 4
         *
         *
         * var greet = function(salutation, title, firstName, lastName) {
         *   return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
         * };
         * var sayHello = ramda.lPartial(greet, 'Hello');
         * var sayHelloToMs = ramda.lPartial(sayHello, 'Ms.');
         *
         * sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
         */
        R.lPartial = function (fn /*, args */) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function () {
                return fn.apply(this, concat(args, arguments));
            });
        };
        aliasFor("lPartial").is("applyLeft");

        /**
         * Accepts as its arguments a function and any number of values and returns a function that,
         * when invoked, calls the original function with all of the values appended to the original
         * function's arguments list.
         *
         * Note that `rPartial` is the opposite of `lPartial`: `rPartial` fills `fn`'s arguments
         * from the right to the left.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to invoke.
         * @param {...*} [args] Arguments to append to `fn` when the returned function is invoked.
         * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn` with
         * `args` appended to `fn`'s arguments list.
         * @example
         *
         * var greet = function(salutation, title, firstName, lastName) {
         *   return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
         * };
         * var greetMsJaneJones = ramda.rPartial(greet, 'Ms.', 'Jane', 'Jones');
         *
         * greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
         */
        R.rPartial = function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(fn.length - args.length, 0), function() {
                return fn.apply(this, concat(arguments, args));
            });
        };
        aliasFor("rPartial").is("applyRight");

        /**
         * Creates a new function that, when invoked, caches the result of calling `fn` for a given
         * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
         * argument set will not result in an additional call to `fn`; instead, the cached result
         * for that set of arguments will be returned.
         *
         * Note that this version of `memoize` effectively handles only string and number
         * parameters.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to be wrapped by `memoize`.
         * @return {Function}  Returns a memoized version of `fn`.
         * @example
         *
         * var numberOfCalls = 0;
         * var tracedAdd = function(a, b) {
         *   numberOfCalls += 1;
         *   return a + b;
         * };
         * var memoTrackedAdd = ramda.memoize(trackedAdd);
         *
         * memoAdd(1, 2); //=> 3 (numberOfCalls => 1)
         * memoAdd(1, 2); //=> 3 (numberOfCalls => 1)
         * memoAdd(2, 3); //=> 5 (numberOfCalls => 2)
         *
         * // Note that argument order matters
         * memoAdd(2, 1); //=> 3 (numberOfCalls => 3)
         */
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
         * Accepts a function `fn` and returns a function that guards invocation of `fn` such that
         * `fn` can only ever be called once, no matter how many times the returned function is
         * invoked.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to wrap in a call-only-once wrapper.
         * @return {Function} The wrapped function.
         * @example
         *
         * var alertOnce = ramda.once(alert);
         * alertOnce('Hello!'); // Alerts 'Hello!'
         * alertOnce('Nothing'); // Doesn't alert
         * alertOnce('Again'); // Doesn't alert
         */
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
         * Wrap a function inside another to allow you to make adjustments to the parameters, or do
         * other processing either before the internal function is called or with its results.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} fn The function to wrap.
         * @param {Function} wrapper The wrapper function.
         * @return {Function} The wrapped function.
         * @example
         *
         * TODO
         */
        R.wrap = function(fn, wrapper) {
            return function() {
                return wrapper.apply(this, concat([fn], arguments));
            };
        };

        /**
         * Wraps a constructor function inside a curried function that can be called with the same
         * arguments and returns the same type.
         *
         * @static
         * @memberOf R
         * @category Function
         * @param {Function} Fn The constructor function to wrap.
         * @return {Function} A wrapped, curried constructor function.
         * @example
         *
         * // Constructor function
         * var Widget = function(config) {
         *   // ...
         * };
         * Widget.prototype = {
         *   // ...
         * };
         * map(construct(Widget), allConfigs); //=> a list of Widgets
         */
        R.construct = function (Fn) {
            var f = function () {
                var obj = new Fn();
                Fn.apply(obj, arguments);
                return obj;
            };
            return Fn.length > 1 ? curry(nAry(Fn.length, f)) : f;
        };

        /**
         * Accepts three functions and returns a new function. When invoked, this new function will
         * invoke the first function, `after`, passing as its arguments the results of invoking the
         * second and third functions with whatever arguments are passed to the new function.
         *
         * For example, a function produced by `fork` is equivalent to:
         *
         * ```javascript
         *   var h = ramda.fork(e, f, g);
         *   h(1, 2); //≅ e( f(1, 2), g(1, 2) )
         * ```
         *
         * @static
         * @memberOf R
         * @category
         * @param {Function} after A function. `after` will be invoked with the return values of
         * `fn1` and `fn2` as its arguments.
         * @param {Function} fn1 A function. It will be invoked with the arguments passed to the
         * returned function. Afterward, its resulting value will be passed to `after` as its first
         * argument.
         * @param {Function} fn2 A function. It will be invoked with the arguments passed to the
         * returned function. Afterward, its resulting value will be passed to `after` as its second
         * argument.
         * @return {Function} A new function.
         * @example
         *
         * var add = function(a, b) { return a + b; };
         * var multiply = function(a, b) { return a * b; };
         * var subtract = function(a, b) { return a - b; };
         *
         * ramda.fork(multiply, add, subtract)(1, 2);
         * //≅ multiply( add(1, 2), subtract(1, 2) );
         * //=> -3
         */
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
         * @return {*} The final, accumulated value.
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
         * @return {*} The final, accumulated value.
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
         * @return {*} The final, accumulated value.
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
         * @return {*} The final, accumulated value.
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
         * @return {Array} The final list.
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
         * @return {Array} The new list.
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
         * @return {Array} The new list.
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
         * @return {Object} A new object with the same keys as `obj` and values that are the result
         * of running each property through `fn`.
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
         * @return {Object} A new object with the same keys as `obj` and values that are the result
         * of running each property through `fn`.
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
         * @return {number} The size of the array.
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
         * @return {Array} The new filtered array.
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
         * @return {Array} The new filtered array.
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
         * @return {Array} The new filtered array.
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
         * @return {Array} The new filtered array.
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
         * @return {Array} A new array.
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
         * @param {number} n The number of elements to return.
         * @param {Array} list The array to query.
         * @return {Array} A new array containing the first elements of `list`.
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
         * @return {Array} A new array.
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
         * @param {number} n The number of elements of `list` to skip.
         * @param {Array} list The array to consider.
         * @return {Array} The last `n` elements of `list`.
         */
        R.skip = curry2(function(n, list) {
            if (hasMethod('skip', list)) {
                return list.skip(n);
            }
            return _slice(list, n);
        });
        aliasFor('skip').is('drop');

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns the first zero-indexed position of an object in a flat list
        R.indexOf = curry2(function _indexOf(target, list) {
            return indexOf(list, target);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        R.indexOf.from = curry3(function indexOfFrom(target, fromIdx, list) {
            return indexOf(list, target, fromIdx);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns the last zero-indexed position of an object in a flat list
        R.lastIndexOf = curry2(function _lastIndexOf(target, list) {
            return lastIndexOf(list, target);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        R.lastIndexOf.from = curry3(function lastIndexOfFrom(target, fromIdx, list) {
            return lastIndexOf(list, target, fromIdx);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns `true` if the list contains the sought element, `false` if it does not.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        function contains(a, list) {
            return indexOf(list, a) > -1;
        }
        R.contains = curry2(contains);


        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a new list containing only one copy of each element in the original list.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.

        var uniq = R.uniq = function uniq(list) {
            var idx = -1, len = list.length;
            var result = [], item;
            while (++idx < len) {
                item = list[idx];
                if (!contains(item, result)) {
                    result.push(item);
                }
            }
            return result;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // returns `true` if all of the elements in the `list` are unique.
        R.isSet = function (list) {
            var len = list.length;
            var i = -1;
            while (++i < len) {
                if (indexOf(list, list[i], i+1) >= 0) {
                    return false;
                }
            }
            return true;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a new list containing only one copy of each element in the original list, based upon the value
        // returned by applying the supplied predicate to two list elements.   Equality is strict here,  meaning
        // reference equality for objects and non-coercing equality for primitives.
        var uniqWith = R.uniqWith = curry2(function(pred, list) {
            var idx = -1, len = list.length;
            var result = [], item;
            while (++idx < len) {
                item = list[idx];
                if (!containsWith(pred, item, result)) {
                    result.push(item);
                }
            }
            return result;
        });


        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a new list by plucking the same named property off all objects in the list supplied.
        var pluck = R.pluck = curry2(function(p, list) {
            return map(prop(p), list);
        });

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a new list with the same elements as the original list, just in the reverse order.
        R.reverse = function (list) {
            return clone(list || []).reverse();
        };

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns the elements of the list as a string joined by a separator.
        R.join = invoker("join", Array.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns the sublist of a list starting with the first index and
        // ending before the second one.
        R.slice = invoker("slice", Array.prototype);
        /**
         * TODO: JSDoc-style documentation for this function
         */
        R.slice.from = flip(R.slice)(undef);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Removes the sub-list of `list` starting at index `start` and containing
        // `count` elements.  _Note that this is not destructive_: it returns a
        // copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.remove = curry3(function(start, count, list) {
            return concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Inserts the supplied element into the list, at index `index`.  _Note
        // that this is not destructive_: it returns a copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.insert = curry3(function(index, elt, list) {
            index = index < list.length && index >= 0 ? index : list.length;
            return concat(append(elt, _slice(list, 0, index)), _slice(list, index));
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Inserts the sub-list into the list, at index `index`.  _Note  that this
        // is not destructive_: it returns a copy of the list with the changes.
        // <small>No lists have been harmed in the application of this function.</small>
        R.insert.all = curry3(function(index, elts, list) {
            index = index < list.length && index >= 0 ? index : list.length;
            return concat(concat(_slice(list, 0, index), elts), _slice(list, index));
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns the `n`th element of a list (zero-indexed)
        R.nth = function (n, list) {
             return arguments.length < 2 ? function _nth(list) { return list[n]; } : list[n];
        };

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Runs the given function with the supplied object, then returns the object.
        R.tap = curry2(function(x, fn) {
            if (typeof fn === "function") { fn(x); }
            return x;
        });
        aliasFor("tap").is("K");

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
        // non-coercing equality for primitives.
        R.eq = function (a, b) {
            return arguments.length < 2 ? function _eq(b) { return a === b; } : a === b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a function that when supplied an object returns the indicated property of that object, if it exists.
        var prop = R.prop = function (p, obj) {
            return arguments.length < 2 ? function _prop(obj) { return obj[p]; } :  obj[p];
        };
        aliasFor("prop").is("get"); // TODO: are we sure?  Matches some other libs, but might want to reserve for other use.


        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a function that when supplied a property name returns that property on the indicated object, if it
        // exists.
        R.props = function (obj, prop) {
            return arguments.length < 2 ? function _props(prop) { return obj && obj[prop]; } : obj && obj[prop];
        };


        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a function that always returns the given value.
        var always = R.always = function (val) {
            return function () {
                return val;
            };
        };
        aliasFor("always").is("constant");


        /**
         * TODO: JSDoc-style documentation for this function
         */
        var anyBlanks = R.any(function (val) {
            return val === null || val === undef;
        });

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var nativeKeys = Object.keys;

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
        // property is ignored
        R.pick = curry2(function pick(names, obj) {
            return pickWith(function(val, key) {
                return contains(key, names);
            }, obj);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns a partial copy of an object omitting the keys specified.
        R.omit = curry2(function omit(names, obj) {
            return pickWith(function(val, key) {
                return !contains(key, names);
            }, obj);
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        R.pickWith = curry2(pickWith);

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        R.pickAll = curry2(pickAll);


        /**
         * Assigns own enumerable properties of the other object to the destination
         * object prefering items in other.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} other The other object to merge with destination.
         * @returns {Object} Returns the destination object.
         *
         * @example
         * extend({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
         * // => { 'name': 'fred', 'age': 40 }
         */
        function extend(destination, other) {
            var props = keys(other),
                i = -1, length = props.length;
            while (++i < length) {
                destination[props[i]] = other[props[i]];
            }
            return destination;
        }

        /**
         * Create a new object with the own properties of a
         * merged with the own properties of object b.
         *
         * @static
         * @memberOf R
         * @category Object
         * @param {Object} a source object
         * @param {Object} b object with higher precendence in output
         * @returns {Object} Returns the destination object.
         *
         * @example
         * mixin({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
         * // => { 'name': 'fred', 'age': 40 }
         */
        R.mixin = curry2(function(a, b) {
            return extend(extend({}, a), b);
        });

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // internal helper for `where`
        function satisfiesSpec(spec, parsedSpec, testObj) {
            if (spec === testObj) { return true; }
            if (testObj == null) { return false; }
            parsedSpec.fn = parsedSpec.fn || [];
            parsedSpec.obj = parsedSpec.obj || [];
            var key, val, i = -1, fnLen = parsedSpec.fn.length, j = -1, objLen = parsedSpec.obj.length;
            while (++i < fnLen) {
                key = parsedSpec.fn[i];
                val = spec[key];
                //if (!hasOwnProperty.call(testObj, key)) {
                //    return false;
                //}
                if (!(key in testObj)) {
                    return false;
                }
                if (!val(testObj[key], testObj)) {
                    return false;
                }
            }
            while (++j < objLen) {
                key = parsedSpec.obj[j];
                if (spec[key] !== testObj[key]) {
                    return false;
                }
            }
            return true;
        }

        /**
         * TODO: JSDoc-style documentation for this function
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
                    return typeof spec[key] === "function" ? "fn" : "obj";
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
         * TODO: JSDoc-style documentation for this function
         */
        // Expose the functions from ramda as properties on another object.  If the passed-in object is the
        // global object, or the passed-in object is "falsy", then the ramda functions become global functions.
        R.installTo = function(obj) {
            return extend(obj || global, R);
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // A function that always returns `0`.
        R.alwaysZero = always(0);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // A function that always returns `false`.
        R.alwaysFalse = always(false);

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
        // underlying function would return a false-y value, and `false` when it would return a truth-y one.
        var not = R.not = function (f) {
            return function() {return !f.apply(this, arguments);};
        };

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Given a list of predicates returns a new predicate that will be true exactly when all of them are.
        R.allPredicates = predicateWrap(all);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
        R.anyPredicates = predicateWrap(any);

        // Arithmetic Functions
        // --------------------
        //
        // These functions wrap up the certain core arithmetic operators

        // --------

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Adds two numbers.  Automatic curried:
        //
        //     var add7 = add(7);
        //     add7(10); // => 17
        var add = R.add = function(a, b) {
            return arguments.length < 2 ? function(b) { return a + b; } :  a + b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Multiplies two numbers.  Automatically curried:
        //
        //     var mult3 = multiply(3);
        //     mult3(7); // => 21
        var multiply = R.multiply = function(a, b) {
            return arguments.length < 2 ? function(b) { return a * b; } :  a * b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Reversed version of `subtract`, where first parameter is subtracted from the second.  The curried version of
        // this one might me more useful than that of `subtract`.  For instance:
        //
        //     var decrement = subtractN(1);
        //     decrement(10); // => 9;
        R.subtractN = flip(subtract);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Divides the first parameter by the second.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `divideBy` might be what's wanted.
        var divide = R.divide = function(a, b) {
            return arguments.length < 2 ? function(b) { return a / b; } :  a / b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Reversed version of `divide`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `divide`.  For instance:
        //
        //     var half = divideBy(2);
        //     half(42); // => 21
        R.divideBy = flip(divide);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Divides the second parameter by the first and returns the remainder.
        var modulo = R.modulo = function(a, b) {
            return arguments.length < 2 ? function(b) { return a % b; } :  a % b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Reversed version of `modulo`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `modulo`.  For instance:
        //
        //     var isOdd = moduloBy(2);
        //     isOdd(42); // => 0
        //     isOdd(21); // => 1
        R.moduloBy = flip(modulo);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Adds together all the elements of a list.
        R.sum = foldl(add, 0);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Multiplies together all the elements of a list.
        R.product = foldl(multiply, 1);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns true if the first parameter is less than the second.
        R.lt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a < b; } :  a < b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns true if the first parameter is less than or equal to the second.
        R.lte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a <= b; } :  a <= b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns true if the first parameter is greater than the second.
        R.gt = function(a, b) {
            return arguments.length < 2 ? function(b) { return a > b; } :  a > b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Returns true if the first parameter is greater than or equal to the second.
        R.gte = function(a, b) {
            return arguments.length < 2 ? function(b) { return a >= b; } :  a >= b;
        };

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Determines the largest of a list of numbers (or elements that can be cast to numbers)
        var max = R.max = function(list) {
            return foldl(binary(Math.max), -Infinity, list);
        };

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // A substring of a String:
        //
        //     substring(2, 5, "abcdefghijklm"); //=> "cde"
        var substring = R.substring = invoker("substring", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The trailing substring of a String starting with the nth character:
        //
        //     substringFrom(8, "abcdefghijklm"); //=> "ijklm"
        R.substringFrom = flip(substring)(undef);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The leading substring of a String ending before the nth character:
        //
        //     substringTo(8, "abcdefghijklm"); //=> "abcdefgh"
        R.substringTo = substring(0);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The character at the nth position in a String:
        //
        //     charAt(8, "abcdefghijklm"); //=> "i"
        R.charAt = invoker("charAt", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The ascii code of the character at the nth position in a String:
        //
        //     charCodeAt(8, "abcdefghijklm"); //=> 105
        //     // (... 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105)
        R.charCodeAt = invoker("charCodeAt", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Tests a regular expression agains a String
        //
        //     match(/([a-z]a)/g, "bananas"); //=> ["ba", "na", "na"]
        R.match = invoker("match", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Finds the index of a substring in a string, returning -1 if it's not present
        //
        //     strIndexOf('c', 'abcdefg) //=> 2
        R.strIndexOf = invoker("indexOf", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Finds the last index of a substring in a string, returning -1 if it's not present
        //
        //     strLastIndexOf('a', 'banana split') //=> 5
        R.strLastIndexOf = invoker("lastIndexOf", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The uppercase version of a string.
        //
        //     toUpperCase('abc') //=> 'ABC'
        R.toUpperCase = invoker("toUpperCase", String.prototype);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The lowercase version of a string.
        //
        //     toLowerCase('XYZ') //=> 'xyz'
        R.toLowerCase = invoker("toLowerCase", String.prototype);


        /**
         * TODO: JSDoc-style documentation for this function
         */
        // The string split into substring at the specified token
        //
        //     split('.', 'a.b.c.xyz.d') //=>
        //         ['a', 'b', 'c', 'xyz', 'd']
        R.split = invoker("split", String.prototype, 1);

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Retrieve a value on an object from a deep path, str
        // different properties on nested objects are indicated in string
        // by a seperator, sep
        // R.pathOn("|", "a|b", {a: {b: 2}}) // => 2
        R.pathOn = curry3(function pathOn(sep, str, obj) {
            return path(str.split(sep), obj);
        });

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
         */
        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.
        R.union = compose(uniq, R.concat);

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
        // determined according to the value returned by applying the supplied predicate to two list elements.
        R.unionWith = curry3(function (pred, list1, list2) {
            return uniqWith(pred, concat(list1, list2));
        });

        /**
         * TODO: JSDoc-style documentation for this function
         */
        // Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
        R.difference = curry2(function(first, second) {
            return uniq(reject(flip(contains)(second), first));
        });

        /**
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
         * TODO: JSDoc-style documentation for this function
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
