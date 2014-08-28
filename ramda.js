//     ramda.js
//     "version": "0.4.0"
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

(function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory(this);
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        this.ramda = factory(this);
    }
}(function (global) {

    'use strict';

    // This object is what is actually returned, with all the exposed functions attached as properties.

    /**
     * A practical functional library for Javascript programmers.
     *
     * @namespace R
     */
    var R = {};

    // Internal Functions and Properties
    // ---------------------------------

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
     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
     *
     *      var firstThreeArgs = function(a, b, c, d) {
     *        return _slice(arguments, 0, 3);
     *      };
     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
     */
    function _slice(args, from, to) {
        from = (typeof from === 'number') ? from : 0;
        to = (typeof to === 'number') ? to : args.length;
        var length = to - from,
            arr = new Array(length),
            i = -1;

        while (++i < length) {
            arr[i] = args[from + i];
        }
        return arr;
    }


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
     *      concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     */
    var concat = function _concat(set1, set2) {
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
     *      isArray([]); //=> true
     *      isArray(true); //=> false
     *      isArray({}); //=> false
     */
    var isArray = Array.isArray || function _isArray(val) {
        return val && val.length >= 0 && toString.call(val) === '[object Array]';
    };


    /**
     * Tests whether or not an object is similar to an array.
     *
     * @private
     * @category Internal
     * @param {*} val The object to test.
     * @return {boolean} `true` if `val` has a numeric length property; `false` otherwise.
     * @example
     *
     *      isArrayLike([]); //=> true
     *      isArrayLike(true); //=> false
     *      isArrayLike({}); //=> false
     *      isArrayLike({length: 10}); //=> true
     */
    var isArrayLike = function isArrayLike(x) {
        return isArray(x) || (
            !!x &&
            typeof x === 'object' &&
            !(x instanceof String) &&
            (
                !!(x.nodeType === 1 && x.length) ||
                x.length >= 0
            )
        );
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
     *      var addFourNumbers = function(a, b, c, d) {
     *        return a + b + c + d;
     *      };
     *
     *      var curriedAddFourNumbers = curry(addFourNumbers);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4);//=> 10
     */
    var curry = R.curry = function _curry(fn, fnArity) {
        fnArity = typeof fnArity === 'number' ? fnArity : fn.length;
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
     * @return {Function} curried function
     * @example
     *
     *      var addTwo = function(a, b) {
     *        return a + b;
     *      };
     *
     *      var curriedAddTwo = curry2(addTwo);
     */
    function curry2(fn) {
        return function(a, b) {
            switch (arguments.length) {
                case 0: throw NO_ARGS_EXCEPTION;
                case 1: return function(b) {
                    return fn(a, b);
                };
                default: return fn(a, b);
            }
        };
    }


    /**
     * Optimized internal three-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} curried function
     * @example
     *
     *      var addThree = function(a, b, c) {
     *        return a + b + c;
     *      };
     *
     *      var curriedAddThree = curry3(addThree);
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
                default: return fn(a, b, c);
            }
        };
    }


    /**
     * Private function that determines whether or not a provided object has a given method.
     * Does not ignore methods stored on the object's prototype chain. Used for dynamically
     * dispatching Ramda methods to non-Array objects.
     *
     * @private
     * @category Internal
     * @param {string} methodName The name of the method to check for.
     * @param {Object} obj The object to test.
     * @return {boolean} `true` has a given method, `false` otherwise.
     * @example
     *
     *      var person = { name: 'John' };
     *      person.shout = function() { alert(this.name); };
     *
     *      hasMethod('shout', person); //=> true
     *      hasMethod('foo', person); //=> false
     */
    var hasMethod = function _hasMethod(methodName, obj) {
        return obj && !isArray(obj) && typeof obj[methodName] === 'function';
    };


    /**
     * Similar to hasMethod, this checks whether a function has a [methodname]
     * function. If it isn't an array it will execute that function otherwise it will
     * default to the ramda implementation.
     *
     * @private
     * @category Internal
     * @param {Function} func ramda implemtation
     * @param {String} methodname property to check for a custom implementation
     * @return {Object} whatever the return value of the method is
     */
    function checkForMethod(methodname, func) {
        return function(a, b, c) {
            var length = arguments.length;
            var obj = arguments[length - 1],
                callBound = obj && !isArray(obj) && typeof obj[methodname] === 'function';
            switch (arguments.length) {
                case 0: return func();
                case 1: return callBound ? obj[methodname]() : func(a);
                case 2: return callBound ? obj[methodname](a) : func(a, b);
                case 3: return callBound ? obj[methodname](a, b) : func(a, b, c);
                case 4: return callBound ? obj[methodname](a, b, c) : func(a, b, c, obj);
            }
        };
    }


    /**
     * Private function that generates a parameter list based on the paremeter count passed in.
     *
     * @private
     * @category Internal
     * @param {number} n The number of parameters
     * @return {string} The parameter list
     * @example
     *
     *      mkArgStr(1); //= 'arg1'
     *      mkArgStr(2); //= 'arg1, arg2'
     *      mkArgStr(3); //= 'arg1, arg2, arg3'
     */
    var mkArgStr = function _makeArgStr(n) {
        var arr = [], idx = -1;
        while (++idx < n) {
            arr[idx] = 'arg' + idx;
        }
        return arr.join(', ');
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
     *         arity `n`.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = ramda.nAry(1, takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only `n` arguments are passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
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
                    '    return function(' + fnArgs + ') {',
                    '        return func.call(this' + (fnArgs ? ', ' + fnArgs : '') + ');',
                '    }'
            ].join('\n');
            return new Function('func', body);
        };

        return function _nAry(n, fn) {
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
     *         arity 1.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = ramda.unary(1, takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only 1 argument is passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
     */
    R.unary = function _unary(fn) {
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
     *         arity 2.
     * @example
     *
     *      var takesThreeArgs = function(a, b, c) {
     *        return [a, b, c];
     *      };
     *      takesThreeArgs.length; //=> 3
     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
     *
     *      var takesTwoArgs = ramda.binary(1, takesThreeArgs);
     *      takesTwoArgs.length; //=> 2
     *      // Only 2 arguments are passed to the wrapped function
     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
     */
    var binary = R.binary = function _binary(fn) {
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
     * @return {Function} A new function wrapping `fn`. The new function is
     *         guaranteed to be of arity `n`.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = ramda.unary(1, takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // All arguments are passed through to the wrapped function
     *      takesOneArg(1, 2); //=> [1, 2]
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
                    '    return function(' + fnArgs + ') {',
                '        return func.apply(this, arguments);',
                '    }'
            ].join('\n');
            return new Function('func', body);
        };

        return function _arity(n, fn) {
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
     *      var charAt = ramda.invoker('charAt', String.prototype);
     *      charAt(6, 'abcdefghijklm'); //=> 'g'
     *
     *      var join = ramda.invoker('join', Array.prototype);
     *      var firstChar = charAt(0);
     *      join('', ramda.map(firstChar, ['light', 'ampliifed', 'stimulated', 'emission', 'radiation']));
     *      //=> 'laser'
     */
    var invoker = R.invoker = function _invoker(name, obj, len) {
        var method = obj[name];
        var length = len === void 0 ? method.length : len;
        return method && curry(function () {
            if (arguments.length) {
                var target = Array.prototype.pop.call(arguments);
                var targetMethod = target[name];
                if (targetMethod == method) {
                    return targetMethod.apply(target, arguments);
                }
            }
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
     * @alias disperseTo
     * @example
     *
     *      var double = function(y) { return y * 2; };
     *      var square = function(x) { return x * x; };
     *      var add = function(a, b) { return a + b; };
     *      // Adds any number of arguments together
     *      var addAll = function() {
     *        return ramda.reduce(add, 0, arguments);
     *      };
     *
     *      // Basic example
     *      var addDoubleAndSquare = ramda.useWith(addAll, double, square);
     *
     *      addDoubleAndSquare(10, 5); //≅ addAll(double(10), square(5));
     *      //=> 125
     *
     *      // Example of passing more arguments than transformers
     *      addDoubleAndSquare(10, 5, 100); //≅ addAll(double(10), square(5), 100);
     *      //=> 225
     *
     *      // But if you're expecting additional arguments that don't need transformation, it's best
     *      // to pass transformer functions so the resulting function has the correct arity
     *      var addDoubleAndSquareWithExtraParams = ramda.useWith(addAll, double, square, ramda.identity);
     *      addDoubleAndSquare(10, 5, 100); //≅ addAll(double(10), square(5), ramda.identity(100));
     *      //=> 225
     */
    var useWith = R.useWith = function _useWith(fn /*, transformers */) {
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
    R.disperseTo = R.useWith;


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
     *      ramda.each(function(num) {
     *        console.log(num + 100);
     *      }, [1, 2, 3]); //=> [1, 2, 3]
     *      //-> 101
     *      //-> 102
     *      //-> 103
     */
    function each(fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            fn(list[idx]);
        }
        // i can't bear not to return *something*
        return list;
    }
    R.each = curry2(each);


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
     * @param {Function} fn The function to invoke. Receives three arguments:
     *        (`value`, `index`, `list`).
     * @param {Array} list The list to iterate over.
     * @return {Array} The original list.
     * @alias forEach
     * @example
     *
     *      // Note that having access to the original `list` allows for
     *      // mutation. While you *can* do this, it's very un-functional behavior:
     *      ramda.each.idx(function(num, idx, list) {
     *        list[idx] = num + 100;
     *      }, [1, 2, 3]); //=> [101, 102, 103]
     */
    R.each.idx = curry2(function eachIdx(fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            fn(list[idx], idx, list);
        }
        // i can't bear not to return *something*
        return list;
    });
    R.forEach = R.each;


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
     *      var numbers = [1, 2, 3];
     *      var numbersClone = ramda.clone(numbers); //=> [1, 2, 3]
     *      numbers === numbersClone; //=> false
     *
     *      // Note that this is a shallow clone--it does not clone complex values:
     *      var objects = [{}, {}, {}];
     *      var objectsClone = ramda.clone(objects);
     *      objects[0] === objectsClone[0]; //=> true
     */
    var clone = R.clone = function _clone(list) {
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
     * @return {boolean} `true` if the `arr` argument has a length of 0 or
     *         if `arr` is a falsy value (e.g. undefined).
     * @example
     *
     *      ramda.isEmpty([1, 2, 3]); //=> false
     *      ramda.isEmpty([]); //=> true
     *      ramda.isEmpty(); //=> true
     *      ramda.isEmpty(null); //=> true
     */
    function isEmpty(arr) {
        return !arr || !arr.length;
    }
    R.isEmpty = isEmpty;


    /**
     * Returns a new list with the given element at the front, followed by the contents of the
     * list.
     *
     * @static
     * @memberOf R
     * @category Array
     * @param {*} el The item to add to the head of the output list.
     * @param {Array} arr The array to add to the tail of the output list.
     * @return {Array} A new array.
     * @alias cons
     * @example
     *
     *      ramda.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
     */
    function prepend(el, arr) {
        return concat([el], arr);
    }
    R.prepend = prepend;
    R.cons = R.prepend;


    /**
     * Returns the first element in a list.
     *
     * @static
     * @memberOf R
     * @category Array
     * @param {Array} [arr=[]] The array to consider.
     * @return {*} The first element of the list, or `undefined` if the list is empty.
     * @alias car
     * @alias first
     * @example
     *
     *      ramda.head(['fi', 'fo', 'fum']); //=> 'fi'
     */
    var head = R.head = function _car(arr) {
        arr = arr || [];
        return arr[0];
    };

    R.car = R.first = R.head;


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
     *      ramda.last(['fi', 'fo', 'fum']); //=> 'fum'
     */
    R.last = function _last(arr) {
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
     * @param {Array} [arr=[]] The array to consider.
     * @return {Array} A new array containing all but the first element of the input list, or an
     *         empty list if the input list is a falsy value (e.g. `undefined`).
     * @alias cdr
     * @example
     *
     *      ramda.tail(['fi', 'fo', 'fum']); //=> ['fo', 'fum']
     */
    var tail = R.tail = checkForMethod('tail', function(arr) {
        arr = arr || [];
        return (arr.length > 1) ? _slice(arr, 1) : [];
    });

    R.cdr = R.tail;


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
     *      ramda.isAtom([]); //=> false
     *      ramda.isAtom(null); //=> false
     *      ramda.isAtom(undefined); //=> false
     *
     *      ramda.isAtom(0); //=> true
     *      ramda.isAtom(''); //=> true
     *      ramda.isAtom('test'); //=> true
     *      ramda.isAtom({}); //=> true
     */
    R.isAtom = function _isAtom(x) {
        return x != null && !isArray(x);
    };


    /**
     * Returns a new list containing the contents of the given list, followed by the given
     * element.
     *
     * @static
     * @memberOf R
     * @category Array
     * @param {*} el The element to add to the end of the new list.
     * @param {Array} list The list whose contents will be added to the beginning of the output
     *        list.
     * @return {Array} A new list containing the contents of the old list followed by `el`.
     * @alias push
     * @example
     *
     *      ramda.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
     *      ramda.append('tests', []); //=> ['tests']
     *      ramda.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
     */
    var append = R.append = function _append(el, list) {
        return concat(list, [el]);
    };

    R.push = R.append;


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
     *         contents of `list2`. If, instead of an {Array} for `list1`, you pass an
     *         object with a `concat` method on it, `concat` will call `list1.concat`
     *         and it the value of `list2`.
     * @example
     *
     *      ramda.concat([], []); //=> []
     *      ramda.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     *      ramda.concat('ABC', 'DEF'); // 'ABCDEF'
     */
    R.concat = curry2(function(set1, set2) {
        if (isArray(set2)) { return concat(set1, set2); }
        else if (R.is(String, set1)) { return set1.concat(set2); }
        else if (hasMethod('concat', set2)) { return set2.concat(set1); }
        else { throw new TypeError("can't concat " + typeof set2); }
    });


    /**
     * A function that does nothing but return the parameter supplied to it. Good as a default
     * or placeholder function.
     *
     * @static
     * @memberOf R
     * @category Core
     * @param {*} x The value to return.
     * @return {*} The input value, `x`.
     * @alias I
     * @example
     *
     *      ramda.identity(1); //=> 1
     *
     *      var obj = {};
     *      ramda.identity(obj) === obj; //=> true
     */
    var identity = R.identity = function _I(x) {
        return x;
    };
    R.I = R.identity;


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
     *      ramda.times(function(n) { return n; }, 5); //=> [0, 1, 2, 3, 4]
     */
    R.times = curry2(function _times(fn, n) {
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
     *      ramda.repeatN('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
     *
     *      var obj = {};
     *      var repeatedObjs = ramda.repeatN(obj, 5); //=> [{}, {}, {}, {}, {}]
     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
     */
    R.repeatN = curry2(function _repeatN(value, n) {
        return R.times(R.always(value), n);
    });



    // Function functions :-)
    // ----------------------
    //
    // These functions make new functions out of old ones.

    // --------

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
     *      var addThree = function(a, b, c) {
     *        return a + b + c;
     *      };
     *      var partialAdd = partially(add, 1);
     *      partialAdd(2, 3); //=> 6
     *
     *      // partialAdd is invoked immediately, even though it expects three arguments. This is
     *      // because, unlike many functions here, the result of `partially` is not a curried
     *      // function.
     *      partialAdd(2); //≅ addThree(1, 2, undefined) => NaN
     */
    function partially(f, a) {
        return function() {
            return f.apply(this, concat([a], arguments));
        };
    }


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
     *      var double = function(x) { return x * 2; };
     *      var square = function(x) { return x * x; };
     *      var squareThenDouble = internalCompose(double, square);
     *
     *      squareThenDouble(5); //≅ double(square(5)) => 50
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
     *         input `functions`, passing the result of each function call to the next, from
     *         right to left.
     * @example
     *
     *      var triple = function(x) { return x * 3; };
     *      var double = function(x) { return x * 2; };
     *      var square = function(x) { return x * x; };
     *      var squareThenDoubleThenTriple = ramda.compose(triple, double, square);
     *
     *      squareThenDoubleThenTriple(5); //≅ triple(double(square(5))) => 150
     */
    var compose = R.compose = function _compose() {
        switch (arguments.length) {
            case 0: throw NO_ARGS_EXCEPTION;
            case 1: return arguments[0];
            default:
                var idx = arguments.length - 1, func = arguments[idx], fnArity = func.length;
                while (idx--) {
                    func = internalCompose(arguments[idx], func);
                }
                return arity(fnArity, func);
        }
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
     *         input `functions`, passing the result of each function call to the next, from
     *         right to left.
     * @alias sequence
     * @example
     *
     *      var triple = function(x) { return x * 3; };
     *      var double = function(x) { return x * 2; };
     *      var square = function(x) { return x * x; };
     *      var squareThenDoubleThenTriple = ramda.pipe(square, double, triple);
     *
     *      squareThenDoubleThenTriple(5); //≅ triple(double(square(5))) => 150
     */
    R.pipe = function _pipe() {
        return compose.apply(this, _slice(arguments).reverse());
    };

    R.sequence = R.pipe;


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
     *      var mergeThree = function(a, b, c) {
     *        ([]).concat(a, b, c);
     *      };
     *      var numbers = [1, 2, 3];
     *
     *      mergeThree(numbers); //=> [1, 2, 3]
     *
     *      ramda.flip([1, 2, 3]); //=> [2, 1, 3]
     */
    var flip = R.flip = function _flip(fn) {
        return function (a, b) {
            switch (arguments.length) {
                case 0: throw NO_ARGS_EXCEPTION;
                case 1: return function(b) { return fn.apply(this, [b, a].concat(_slice(arguments, 1))); };
                default: return fn.apply(this, concat([b, a], _slice(arguments, 2)));
            }
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
     *         with `args` prepended to `fn`'s arguments list.
     * @alias applyLeft
     * @example
     *
     *      var multiply = function(a, b) { return a * b; };
     *      var double = ramda.lPartial(multiply, 2);
     *      double(2); //=> 4
     *
     *      var greet = function(salutation, title, firstName, lastName) {
     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *      };
     *      var sayHello = ramda.lPartial(greet, 'Hello');
     *      var sayHelloToMs = ramda.lPartial(sayHello, 'Ms.');
     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
     */
    R.lPartial = function _lPartial(fn /*, args */) {
        var args = _slice(arguments, 1);
        return arity(Math.max(fn.length - args.length, 0), function () {
            return fn.apply(this, concat(args, arguments));
        });
    };

    R.applyLeft = R.lPartial;


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
     *         `args` appended to `fn`'s arguments list.
     * @alias applyRight
     * @example
     *
     *      var greet = function(salutation, title, firstName, lastName) {
     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *      };
     *      var greetMsJaneJones = ramda.rPartial(greet, 'Ms.', 'Jane', 'Jones');
     *
     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
     */
    R.rPartial = function _rPartial(fn) {
        var args = _slice(arguments, 1);
        return arity(Math.max(fn.length - args.length, 0), function() {
            return fn.apply(this, concat(arguments, args));
        });
    };

    R.applyRight = R.rPartial;


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
     *      var numberOfCalls = 0;
     *      var tracedAdd = function(a, b) {
     *        numberOfCalls += 1;
     *        return a + b;
     *      };
     *      var memoTrackedAdd = ramda.memoize(trackedAdd);
     *
     *      memoAdd(1, 2); //=> 3 (numberOfCalls => 1)
     *      memoAdd(1, 2); //=> 3 (numberOfCalls => 1)
     *      memoAdd(2, 3); //=> 5 (numberOfCalls => 2)
     *
     *      // Note that argument order matters
     *      memoAdd(2, 1); //=> 3 (numberOfCalls => 3)
     */
    R.memoize = function _memoize(fn) {
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
     *      var alertOnce = ramda.once(alert);
     *      alertOnce('Hello!'); // Alerts 'Hello!'
     *      alertOnce('Nothing'); // Doesn't alert
     *      alertOnce('Again'); // Doesn't alert
     */
    R.once = function _once(fn) {
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
     *      var slashify = wrap(flip(add)('/'), function(f, x) {
     *        return match(/\/$/)(x) ? x : f(x)
     *      });
     *
     * slashify('a') //= 'a/'
     * slashify('a/') //= 'a/'
     */
    R.wrap = function _wrap(fn, wrapper) {
        return function() {
            return wrapper.apply(this, concat([fn], arguments));
        };
    };


    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type. The arity of the function returned is specified
     * to allow using variadic constructor functions.
     *
     * NOTE: Does not work with some built-in objects such as Date.
     *
     * @static
     * @memberOf R
     * @category Function
     * @param {number} n The arity of the constructor function.
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Variadic constructor function
     *      var Widget = function() {
     *        this.children = Array.prototype.slice.call(arguments);
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      map(constructN(1, Widget), allConfigs); //=> a list of Widgets
     */
    var constructN = R.constructN = function _constructN(n, Fn) {
        var f = function () {
            var Temp = function() {}, inst, ret;
            Temp.prototype = Fn.prototype;
            inst = new Temp();
            ret = Fn.apply(inst, arguments);
            return Object(ret) === ret ? ret : inst;
        };
        return n > 1 ? curry(nAry(n, f)) : f;
    };


    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type.
     *
     * NOTE: Does not work with some built-in objects such as Date.
     *
     * @static
     * @memberOf R
     * @category Function
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Constructor function
     *      var Widget = function(config) {
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      map(construct(Widget), allConfigs); //=> a list of Widgets
     */
    R.construct = function _construct(Fn) {
        return constructN(Fn.length, Fn);
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
     * @category Function
     * @param {Function} after A function. `after` will be invoked with the return values of
     *        `fn1` and `fn2` as its arguments.
     * @param {Function} fn1 A function. It will be invoked with the arguments passed to the
     *        returned function. Afterward, its resulting value will be passed to `after` as
     *        its first argument.
     * @param {Function} fn2 A function. It will be invoked with the arguments passed to the
     *        returned function. Afterward, its resulting value will be passed to `after` as
     *        its second argument.
     * @return {Function} A new function.
     * @alias distributeTo
     * @example
     *
     *      var add = function(a, b) { return a + b; };
     *      var multiply = function(a, b) { return a * b; };
     *      var subtract = function(a, b) { return a - b; };
     *
     *      ramda.fork(multiply, add, subtract)(1, 2);
     *      //≅ multiply( add(1, 2), subtract(1, 2) );
     *      //=> -3
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

    R.distributeTo = R.fork;



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
     * Note: `ramda.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @alias foldl
     * @example
     *
     *      var numbers = [1, 2, 3];
     *      var add = function(a, b) {
     *        return a + b;
     *      };
     *
     *      reduce(numbers, add, 10); //=> 16
     */
    var foldl = R.reduce =  curry3(checkForMethod('reduce', function _reduce(fn, acc, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            acc = fn(acc, list[idx]);
        }
        return acc;
    }));

    R.foldl = R.reduce;


    /**
     * Like `foldl`, but passes additional parameters to the predicate function.
     *
     * The iterator function receives four values: *(acc, value, index, list)*
     *
     * Note: `ramda.foldl.idx` does not skip deleted or unassigned indices (sparse arrays),
     * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
     * see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The iterator function. Receives four values: the accumulator, the
     *        current element from `list`, that element's index, and the entire `list` itself.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var letters = ['a', 'b', 'c'];
     *      var objectify = function(accObject, elem, idx, list) {
     *        return accObject[elem] = idx;
     *      };
     *
     *      foldl.idx(letters, objectify, {}); //=> { 'a': 0, 'b': 1, 'c': 2 }
     */
    R.foldl.idx = curry3(checkForMethod('foldl', function(fn, acc, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            acc = fn(acc, list[idx], idx, list);
        }
        return acc;
    }));


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
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @alias reduceRight
     * @example
     *
     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
     *      var flattenPairs = function(acc, pair) {
     *        return acc.concat(pair);
     *      };
     *
     *      foldr(numbers, flattenPairs, []); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
     */
    var foldr = R.foldr = curry3(checkForMethod('foldr', function(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
            acc = fn(acc, list[idx]);
        }
        return acc;
    }));

    R.reduceRight = R.foldr;


    /**
     * Like `foldr`, but passes additional parameters to the predicate function. Moves through
     * the input list from the right to the left.
     *
     * The iterator function receives four values: *(acc, value, index, list)*.
     *
     * Note: `ramda.foldr.idx` does not skip deleted or unassigned indices (sparse arrays),
     * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
     * see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The iterator function. Receives four values: the accumulator, the
     *        current element from `list`, that element's index, and the entire `list` itself.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var letters = ['a', 'b', 'c'];
     *      var objectify = function(accObject, elem, idx, list) {
     *        return accObject[elem] = idx;
     *      };
     *
     *      foldr.idx(letters, objectify, {}); //=> { 'c': 2, 'b': 1, 'a': 0 }
     */
    R.foldr.idx = curry3(checkForMethod('foldr', function(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
            acc = fn(acc, list[idx], idx, list);
        }
        return acc;
    }));


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
     *        either false to quit iteration or an array of length two to proceed. The element
     *        at index 0 of this array will be added to the resulting array, and the element
     *        at index 1 will be passed to the next call to `fn`.
     * @param {*} seed The seed value.
     * @return {Array} The final list.
     * @example
     *
     *      var f = function(n) { return n > 50 ? false : [-n, n + 10] };
     *      unfoldr(f, 10) //= [-10, -20, -30, -40, -50]
     */
    R.unfoldr = curry2(function _unfoldr(fn, seed) {
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
     *      var double = function(x) {
     *        return x * 2;
     *      };
     *
     *      ramda.map(double, [1, 2, 3]); //=> [2, 4, 6]
     */
    function map(fn, list) {
        var idx = -1, len = list.length, result = new Array(len);
        while (++idx < len) {
            result[idx] = fn(list[idx]);
        }
        return result;
    }

    R.map = curry2(checkForMethod('map', map));


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
     *      var squareEnds = function(elt, idx, list) {
     *        if (idx === 0 || idx === list.length - 1) {
     *          return elt * elt;
     *        }
     *        return elt;
     *      };
     *
     *      ramda.map.idx(squareEnds, [8, 6, 7, 5, 3, 0, 9];
     *      //=> [64, 6, 7, 5, 3, 0, 81]
     */
    R.map.idx = curry2(checkForMethod('map', function _mapIdx(fn, list) {
        var idx = -1, len = list.length, result = new Array(len);
        while (++idx < len) {
            result[idx] = fn(list[idx], idx, list);
        }
        return result;
    }));


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
     *      var values = { x: 1, y: 2, z: 3 };
     *      var double = function(num) {
     *        return num * 2;
     *      };
     *
     *      ramda.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
     */
    // TODO: consider mapObj.key in parallel with mapObj.idx.  Also consider folding together with `map` implementation.
    R.mapObj = curry2(function _mapObject(fn, obj) {
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
     *        become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var double = function(num, key, obj) {
     *        return key + num;
     *      };
     *
     *      ramda.mapObj(double, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
     */
    R.mapObj.idx = curry2(function mapObjectIdx(fn, obj) {
        return foldl(function (acc, key) {
            acc[key] = fn(obj[key], key, obj);
            return acc;
        }, {}, keys(obj));
    });


    /**
     * ap applies a list of functions to a list of values.
     *
     * @static
     * @memberOf R
     * @category Function
     * @param {Array} fns An array of functions
     * @param {Array} vs An array of values
     * @return the value of applying each the function `fns` to each value in `vs`
     * @example
     *
     *      R.ap([R.multiply(2), R.add(3), [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
     */
    R.ap = curry2(checkForMethod('ap', function _ap(fns, vs) {
        return foldl(function(acc, fn) {
            return concat(acc, map(fn, vs));
        },  [], fns);
    }));


    /**
     *
     * `of` wraps any object in an Array. This implementation is compatible with the
     * Fantasy-land Applicative spec, and will work with types that implement that spec.
     * Note this `of` is different from the ES6 `of`; See
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
     *
     * @static
     * @memberOf R
     * @category Function
     * @param x any value
     * @return [x]
     * @example
     *
     *      R.of(1); // => [1]
     *      R.of([2]); // => [[2]]
     *      R.of({}); // => [{}]
     */
    R.of = function _of(x, container) {
        return (hasMethod('of', container)) ? container.of(x) : [x];
    };


    /**
     * `empty` wraps any object in an array. This implementation is compatible with the
     * Fantasy-land Monoid spec, and will work with types that implement that spec.
     *
     * @static
     * @memberOf R
     * @category Function
     * @return {Array} an empty array
     * @example
     *
     * R.empty([1,2,3,4,5]); // => []
     */
    R.empty = function _empty(x) {
        return (hasMethod('empty', x)) ? x.empty() : [];
    };


    /**
     * `chain` maps a function over a list and concatenates the results.
     * This implementation is compatible with the
     * Fantasy-land Chain spec, and will work with types that implement that spec.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function}
     * @param {Array}
     * @return {Array}
     * @alias flatMap
     * @example
     *
     * var duplicate = function(n) {
     *     return [n, n];
     * };
     * R.chain(duplicate, [1, 2, 3]); // => [1, 1, 2, 2, 3, 3]
     *
     */
    R.chain = curry2(checkForMethod('chain', function _chain(f, list) {
        return unnest(map(f, list));
    }));
    R.flatMap = R.chain;


    /**
     * Returns the number of elements in the array by returning `arr.length`.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} arr The array to inspect.
     * @return {number} The size of the array.
     * @alias length
     * @example
     *
     *      ramda.size([]); //=> 0
     *      ramda.size([1, 2, 3]); //=> 3
     */
    R.size = function _size(arr) {
        return arr.length;
    };

    R.length = R.size;


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
     *      var isEven = function(n) {
     *        return n % 2 === 0;
     *      };
     *      var evens = ramda.filter(isEven, [1, 2, 3, 4]); // => [2, 4]
     */
    var filter = function _filter(fn, list) {
        var idx = -1, len = list.length, result = [];
        while (++idx < len) {
            if (fn(list[idx])) {
                result.push(list[idx]);
            }
        }
        return result;
    };

    R.filter = curry2(checkForMethod('filter', filter));


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
     *      var lastTwo = function(val, idx, list) {
     *        return list.length - idx <= 2;
     *      };
     *      ramda.filter.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
     */
    function filterIdx(fn, list) {
        var idx = -1, len = list.length, result = [];
        while (++idx < len) {
            if (fn(list[idx], idx, list)) {
                result.push(list[idx]);
            }
        }
        return result;
    }

    R.filter.idx = curry2(checkForMethod('filter', filterIdx));


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
     *      var isOdd = function(n) {
     *        return n % 2 === 1;
     *      };
     *      var evens = ramda.reject(isOdd, [1, 2, 3, 4]); // => [2, 4]
     */
    var reject = function _reject(fn, list) {
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
     *      var lastTwo = function(val, idx, list) {
     *        return list.length - idx <= 2;
     *      };
     *
     *      reject.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
     */
    R.reject.idx = curry2(function _rejectIdx(fn, list) {
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
     *      var isNotFour = function(x) {
     *        return !(x === 4);
     *      };
     *
     *      takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
     */
    R.takeWhile = curry2(checkForMethod('takeWhile', function(fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len && fn(list[idx])) {}
        return _slice(list, 0, idx);
    }));


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
    R.take = curry2(checkForMethod('take', function(n, list) {
        return _slice(list, 0, Math.min(n, list.length));
    }));


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
     *      var isNotTwo = function(x) {
     *        return !(x === 2);
     *      };
     *
     *      skipUntil(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
     */
    R.skipUntil = curry2(function _skipUntil(fn, list) {
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
     * @alias drop
     */
    R.skip = curry2(checkForMethod('skip', function _skip(n, list) {
        return _slice(list, n);
    }));

    R.drop = R.skip;


    /**
     * Returns the first element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function used to determine if the element is the
     *        desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      find(propEq('a', 2))(xs); //= {a: 2}
     *      find(propEq('a', 4))(xs); //= undefined
     */
    R.find = curry2(function find(fn, list) {
        var idx = -1;
        var len = list.length;
        while (++idx < len) {
            if (fn(list[idx])) {
                return list[idx];
            }
        }
    });


    /**
     * Returns the index of the first element of the list which matches the predicate, or `-1`
     * if no element matches.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      findIndex(propEq('a', 2))(xs); //= 1
     *      findIndex(propEq('a', 4))(xs); //= -1
     */
    R.findIndex = curry2(function _findIndex(fn, list) {
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
     * Returns the last element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      findLast(propEq('a', 1))(xs); //= {a: 1, b: 1}
     *      findLast(propEq('a', 4))(xs); //= undefined
     */
    R.findLast = curry2(function _findLast(fn, list) {
        var idx = list.length;
        while (--idx) {
            if (fn(list[idx])) {
                return list[idx];
            }
        }
    });


    /**
     * Returns the index of the last element of the list which matches the predicate, or
     * `-1` if no element matches.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      findLastIndex(propEq('a', 1))(xs); //= 1
     *      findLastIndex(propEq('a', 4))(xs); //= -1
     */
    R.findLastIndex = curry2(function _findLastIndex(fn, list) {
        var idx = list.length;
        while (--idx) {
            if (fn(list[idx])) {
                return idx;
            }
        }
        return -1;
    });


    /**
     * Returns `true` if all elements of the list match the predicate, `false` if there are any
     * that don't.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {boolean} `true` if the predicate is satisfied by every element, `false`
     *         otherwise
     * @alias every
     * @example
     *
     *      var lessThan2 = flip(lt)(2);
     *      var lessThan3 = flip(lt)(3);
     *      var xs = range(1, 3); //= [1, 2]
     *      all(lessThan2)(xs); //= false
     *      all(lessThan3)(xs); //= true
     */
    function all(fn, list) {
        var i = -1;
        while (++i < list.length) {
            if (!fn(list[i])) {
                return false;
            }
        }
        return true;
    }

    R.all = curry2(all);
    R.every = R.all;


    /**
     * Returns `true` if at least one of elements of the list match the predicate, `false`
     * otherwise.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {boolean} `true` if the predicate is satisfied by at least one element, `false`
     *         otherwise
     * @alias some
     * @example
     *
     *      var lessThan0 = flip(lt)(0);
     *      var lessThan2 = flip(lt)(2);
     *      var xs = range(1, 3); //= [1, 2]
     *      any(lessThan0)(xs); //= false
     *      any(lessThan2)(xs); //= true
     */
    function any(fn, list) {
        var i = -1;
        while (++i < list.length) {
            if (fn(list[i])) {
                return true;
            }
        }
        return false;
    }
    R.any = curry2(any);
    R.some = R.any;


    /**
     * Internal implementation of `indexOf`.
     * Returns the position of the first occurrence of an item in an array
     * (by strict equality),
     * or -1 if the item is not included in the array.
     *
     * @private
     * @category Internal
     * @param {Array} The array to search
     * @param item the item to find in the Array
     * @param {Number} from (optional) the index to start searching the Array
     * @return {Number} the index of the found item, or -1
     *
     */
    var indexOf = function _indexOf(array, item, from) {
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
     * Internal implementation of `lastIndexOf`.
     * Returns the position of the last occurrence of an item in an array
     * (by strict equality),
     * or -1 if the item is not included in the array.
     *
     * @private
     * @category Internal
     * @param {Array} The array to search
     * @param item the item to find in the Array
     * @param {Number} from (optional) the index to start searching the Array
     * @return {Number} the index of the found item, or -1
     *
     */
    var lastIndexOf = function _lastIndexOf(array, item, from) {
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
     * Returns the position of the first occurrence of an item in an array
     * (by strict equality),
     * or -1 if the item is not included in the array.
     *
     * @static
     * @memberOf R
     * @category List
     * @param target The item to find.
     * @param {Array} list The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     *
     * @example
     *
     *      indexOf(3, [1,2,3,4]) // => 2
     *      indexOf(10, [1,2,3,4]) // => -1
     */
    R.indexOf = curry2(function _indexOf(target, list) {
        return indexOf(list, target);
    });


    /**
     * Returns the position of the first occurrence of an item (by strict equality) in
     * an array, or -1 if the item is not included in the array. However,
     * `indexOf.from` will only search the tail of the array, starting from the
     * `fromIdx` parameter.
     *
     * @static
     * @memberOf R
     * @category List
     * @param target The item to find.
     * @param {Array} list The array to search in.
     * @param {Number} fromIdx the index to start searching from
     * @return {Number} the index of the target, or -1 if the target is not found.
     *
     * @example
     *
     *      indexOf.from(3, 2, [-1,0,1,2,3,4]) // => 4
     *      indexOf.from(10, 2, [1,2,3,4]) // => -1
     */
    R.indexOf.from = curry3(function indexOfFrom(target, fromIdx, list) {
        return indexOf(list, target, fromIdx);
    });


    /**
     * Returns the position of the last occurrence of an item (by strict equality) in
     * an array, or -1 if the item is not included in the array.
     *
     * @static
     * @memberOf R
     * @category List
     * @param target The item to find.
     * @param {Array} list The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     *
     * @example
     *
     *      lastIndexOf(3, [-1,3,3,0,1,2,3,4]) // => 6
     *      lastIndexOf(10, [1,2,3,4]) // => -1
     */
    R.lastIndexOf = curry2(function _lastIndexOf(target, list) {
        return lastIndexOf(list, target);
    });


    /**
     * Returns the position of the last occurrence of an item (by strict equality) in
     * an array, or -1 if the item is not included in the array. However,
     * `lastIndexOf.from` will only search the tail of the array, starting from the
     * `fromIdx` parameter.
     *
     * @static
     * @memberOf R
     * @category List
     * @param target The item to find.
     * @param {Array} list The array to search in.
     * @param {Number} fromIdx the index to start searching from
     * @return {Number} the index of the target, or -1 if the target is not found.
     *
     * @example
     *
     *      lastIndexOf.from(3, 2, [-1,3,3,0,1,2,3,4]) // => 6
     *      lastIndexOf.from(10, 2, [1,2,3,4]) // => -1
     */
    R.lastIndexOf.from = curry3(function lastIndexOfFrom(target, fromIdx, list) {
        return lastIndexOf(list, target, fromIdx);
    });


    /**
     * Returns `true` if the specified item is somewhere in the list, `false` otherwise.
     * Equivalent to `indexOf(a)(list) > -1`. Uses strict (`===`) equality checking.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Object} a The item to compare against.
     * @param {Array} list The array to consider.
     * @return {boolean} `true` if the item is in the list, `false` otherwise.
     * @example
     *
     *      contains(3)([1, 2, 3]); //= true
     *      contains(4)([1, 2, 3]); //= false
     *      contains({})([{}, {}]); //= false
     *      var obj = {};
     *      contains(obj)([{}, obj, {}]); //= true
     */
    function contains(a, list) {
        return indexOf(list, a) > -1;
    }

    R.contains = curry2(contains);


    /**
     * Returns `true` if the `x` is found in the `list`, using `pred` as an
     * equality predicate for `x`.
     *
     * @static
     * @memberOf R
     * @param {Function} pred :: x -> x -> Bool
     * @param x the item to find
     * @param {Array} list the list to iterate over
     * @return {Boolean} `true` if `x` is in `list`, else `false`
     */ //TODO: add an example
    function containsWith(pred, x, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            if (pred(x, list[idx])) {
                return true;
            }
        }
        return false;
    }

    R.containsWith = curry3(containsWith);


    /**
     * Returns a new list containing only one copy of each element in the original list.
     * Equality is strict here, meaning reference equality for objects and non-coercing equality
     * for primitives.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      uniq([1, 1, 2, 1]); //= [1, 2]
     *      uniq([{}, {}]);     //= [{}, {}]
     *      uniq([1, '1']);     //= [1, '1']
     */
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
     * Returns `true` if all elements are unique, otherwise `false`.
     * Uniquness is determined using strict equality (`===`).
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The array to consider.
     * @return {boolean} `true` if all elements are unique, else `false`.
     * @example
     *
     *      isSet(['1', 1]); //= true
     *      isSet([1, 1]);   //= false
     *      isSet([{}, {}]); //= true
     */
    R.isSet = function _isSet(list) {
        var len = list.length;
        var i = -1;
        while (++i < len) {
            if (indexOf(list, list[i], i + 1) >= 0) {
                return false;
            }
        }
        return true;
    };


    /**
     * Returns a new list containing only one copy of each element in the original list, based
     * upon the value returned by applying the supplied predicate to two list elements. Prefers
     * the first item if two items compare equal based on the predicate.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     * var strEq = function(a, b) { return ('' + a) === ('' + b) };
     * uniqWith(strEq)([1, '1', 2, 1]); //= [1, 2]
     * uniqWith(strEq)([{}, {}]);       //= [{}]
     * uniqWith(strEq)([1, '1', 1]);    //= [1]
     * uniqWith(strEq)(['1', 1, 1]);    //= ['1']
     */
    var uniqWith = R.uniqWith = curry2(function _uniqWith(pred, list) {
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
     * Returns a new list by plucking the same named property off all objects in the list supplied.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {string|number} key The key name to pluck off of each object.
     * @param {Array} list The array to consider.
     * @return {Array} The list of values for the given key.
     * @example
     *
     * pluck('a')([{a: 1}, {a: 2}]); //= [1, 2]
     * pluck(0)([[1, 2], [3, 4]]);   //= [1, 3]
     */
    var pluck = R.pluck = curry2(function _pluck(p, list) {
        return map(prop(p), list);
    });


    /**
     * `makeFlat` is a helper function that returns a one-level or fully recursive function
     * based on the flag passed in.
     *
     * @private
     */
    // TODO: document, even for internals...
    var makeFlat = function _makeFlat(recursive) {
        return function __flatt(list) {
            var array, value, result = [], val, i = -1, j, ilen = list.length, jlen;
            while (++i < ilen) {
                array = list[i];
                if (isArrayLike(array)) {
                    value = (recursive) ? __flatt(array) : array;
                    j = -1;
                    jlen = value.length;
                    while (++j < jlen) {
                        result.push(value[j]);
                    }
                } else {
                    result.push(array);
                }
            }
            return result;
        };
    };


    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
     * them in a new array, depth-first.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @alias flattenDeep
     * @example
     *
     * flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
     * //= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     */
    var flatten = R.flatten = makeFlat(true);
    R.flattenDeep = R.flatten;


    /**
     * Returns a new list by pulling every item at the first level of nesting out, and putting
     * them in a new array.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @alias flattenShallow
     * @example
     *
     * flat([1, [2], [[3]]]);
     * //= [1, 2, [3]]
     * flat([[1, 2], [3, 4], [5, 6]]);
     * //= [1, 2, 3, 4, 5, 6]
     */
    var unnest = R.unnest = makeFlat(false);
    R.flattenShallow = R.unnest;


    /**
     * Creates a new list out of the two supplied by applying the function to each
     * equally-positioned pair in the lists.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The function used to combine the two elements into one value.
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
     * using `fn`.
     * @example
     *
     * zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
     * //= [f(1, 'a'), f(2, 'b'), f(3, 'c')]
     */
    R.zipWith = curry3(function _zipWith(fn, a, b) {
        var rv = [], i = -1, len = Math.min(a.length, b.length);
        while (++i < len) {
            rv[i] = fn(a[i], b[i]);
        }
        return rv;
    });


    /**
     * Creates a new list out of the two supplied by pairing up equally-positioned items from
     * both lists. Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
     * @example
     *
     * zip([1, 2, 3], ['a', 'b', 'c']);
     * //= [[1, 'a'], [2, 'b'], [3, 'c']]
     */
    R.zip = curry2(function _zip(a, b) {
        var rv = [];
        var i = -1;
        var len = Math.min(a.length, b.length);
        while (++i < len) {
            rv[i] = [a[i], b[i]];
        }
        return rv;
    });


    /**
     * Creates a new object out of a list of keys and a list of values.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} keys The array that will be properties on the output object.
     * @param {Array} values The list of values on the output object.
     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
     * @example
     *
     *      zipObj(['a', 'b', 'c'], [1, 2, 3]);
     *      //= {a: 1, b: 2, c: 3}
     */
    R.zipObj = curry2(function _zipObj(keys, values) {
        var i = -1, len = keys.length, out = {};
        while (++i < len) {
            out[keys[i]] = values[i];
        }
        return out;
    });


    /**
     * Creates a new object out of a list key-value pairs.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} An array of two-element arrays that will be the keys and values of the ouput object.
     * @return {Object} The object made by pairing up `keys` and `values`.
     * @example
     *
     *      fromPairs([['a', 1], ['b', 2],  ['c', 3]]);
     *      //= {a: 1, b: 2, c: 3}
     */
    R.fromPairs = function _fromPairs(pairs) {
        var i = -1, len = pairs.length, out = {};
        while (++i < len) {
            if (isArray(pairs[i]) && pairs[i].length) {
                out[pairs[i][0]] = pairs[i][1];
            }
        }
        return out;
    };


    /**
     * Creates a new list out of the two supplied by applying the function
     * to each possible pair in the lists.
     *
     * @see xprod
     * @static
     * @memberOf R
     * @category List
     * @param {Function} fn The function to join pairs with.
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The list made by combining each possible pair from
     *         `as` and `bs` using `fn`.
     * @example
     *
     *      xprodWith(f, [1, 2], ['a', 'b'])
     *      //= [f(1, 'a'), f(1, 'b'), f(2, 'a'), f(2, 'b')];
     */
    R.xprodWith = curry3(function _xprodWith(fn, a, b) {
        if (isEmpty(a) || isEmpty(b)) {
            return [];
        }
        // Better to push them all or to do `new Array(ilen * jlen)` and
        // calculate indices?
        var i = -1, ilen = a.length, j, jlen = b.length, result = [];
        while (++i < ilen) {
            j = -1;
            while (++j < jlen) {
                result.push(fn(a[i], b[j]));
            }
        }
        return result;
    });


    /**
     * Creates a new list out of the two supplied by creating each possible
     * pair from the lists.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The list made by combining each possible pair from
     * `as` and `bs` into pairs (`[a, b]`).
     * @example
     *
     *      xprod([1, 2], ['a', 'b']);
     *      //= [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
     */
    R.xprod = curry2(function _xprod(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
        if (isEmpty(a) || isEmpty(b)) {
            return [];
        }
        var i = -1;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        // Better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
        var result = [];
        while (++i < ilen) {
            j = -1;
            while (++j < jlen) {
                result.push([a[i], b[j]]);
            }
        }
        return result;
    });


    /**
     * Returns a new list with the same elements as the original list, just
     * in the reverse order.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {Array} list The list to reverse.
     * @return {Array} A copy of the list in reverse order.
     * @example
     *
     *      reverse([1, 2, 3]);  //= [3, 2, 1]
     *      reverse([1, 2]);     //= [2, 1]
     *      reverse([1]);        //= [1]
     *      reverse([]);         //= []
     */
    R.reverse = function _reverse(list) {
        return clone(list || []).reverse();
    };


    /**
     * Returns a list of numbers from `from` (inclusive) to `to`
     * (exclusive). In mathematical terms, `range(a, b)` is equivalent to
     * the half-open interval `[a, b)`.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {number} from The first number in the list.
     * @param {number} to One more than the last number in the list.
     * @return {Array} The list of numbers in tthe set `[a, b)`.
     * @example
     *
     *      range(1, 5);     //= [1, 2, 3, 4]
     *      range(50, 53);   //= [50, 51, 52]
     */
    R.range = curry2(function _range(from, to) {
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
     * Returns a string made by inserting the `separator` between each
     * element and concatenating all the elements into a single string.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {string|number} separator The string used to separate the elements.
     * @param {Array} xs The elements to join into a string.
     * @return {string} The string made by concatenating `xs` with `separator`.
     * @example
     *
     *      var spacer = join(' ');
     *      spacer(['a', 2, 3.4]);   //= 'a 2 3.4'
     *      join('|', [1, 2, 3]);    //= '1|2|3'
     */
    R.join = invoker('join', Array.prototype);


    /**
     * Returns the elements from `xs` starting at `a` and ending at `b - 1`.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {number} a The starting index.
     * @param {number} b One more than the ending index.
     * @param {Array} xs The list to take elements from.
     * @return {Array} The items from `a` to `b - 1` from `xs`.
     * @example
     *
     *      var xs = range(0, 10);
     *      slice(2, 5)(xs); //= [2, 3, 4]
     */
    R.slice = invoker('slice', Array.prototype);


    /**
     * Returns the elements from `xs` starting at `a` going to the end of `xs`.
     *
     * @static
     * @memberOf R
     * @category List
     * @param {number} a The starting index.
     * @param {Array} xs The list to take elements from.
     * @return {Array} The items from `a` to the end of `xs`.
     * @example
     *
     *      var xs = range(0, 10);
     *      slice.from(2)(xs); //= [2, 3, 4, 5, 6, 7, 8, 9]
     *
     *      var ys = range(4, 8);
     *      var tail = slice.from(1);
     *      tail(xs); //= [5, 6, 7]
     */
    R.slice.from = flip(R.slice)(void 0);


    /**
     * Removes the sub-list of `list` starting at index `start` and containing
     * `count` elements.  _Note that this is not destructive_: it returns a
     * copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @static
     * @memberOf R
     * @param {Number} start The position to start removing elements
     * @param {Number} count The number of elements to remove
     * @param {Array} list The list to remove from
     * @return {Array} a new Array with `count` elements from `start` removed
     * @example
     *
     *      remove(2, 3, [1,2,3,4,5,6,7,8]) // => [1,2,6,7,8]
     */
    R.remove = curry3(function _remove(start, count, list) {
        return concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
    });


    /**
     * Inserts the supplied element into the list, at index `index`.  _Note
     * that this is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @static
     * @memberOf R
     * @param {Number} index The position to insert the element
     * @param elt The element to insert into the Array
     * @param {Array} list The list to insert into
     * @return {Array} a new Array with `elt` inserted at `index`
     * @example
     *
     *      insert(2, 'x', [1,2,3,4]) // => [1,2,'x',3,4]
     */
    R.insert = curry3(function _insert(index, elt, list) {
        index = index < list.length && index >= 0 ? index : list.length;
        return concat(append(elt, _slice(list, 0, index)), _slice(list, index));
    });


    /**
     * Inserts the sub-list into the list, at index `index`.  _Note  that this
     * is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @static
     * @memberOf R
     * @param {Number} index The position to insert the sublist
     * @param {Array} elts The sub-list to insert into the Array
     * @param {Array} list The list to insert the sub-list into
     * @return {Array} a new Array with `elts` inserted starting at `index`
     * @example
     *
     *      insert.all(2, ['x','y','z'], [1,2,3,4]) // => [1,2,'x','y','z',3,4]
     */
    R.insert.all = curry3(function _insertAll(index, elts, list) {
        index = index < list.length && index >= 0 ? index : list.length;
        return concat(concat(_slice(list, 0, index), elts), _slice(list, index));
    });


    /**
     * Makes a comparator function out of a function that reports whether the first element is less than the second.
     *
     * @static
     * @memberOf R
     * @param {Function} pred A predicate function of arity two.
     * @return {Function} a Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
     * @example
     *
     *      var cmp = comparator(function(a, b) {
     *        return a.age < b.age;
     *      };
     *      sort(cmp, people);
     */
    var comparator = R.comparator = function _comparator(pred) {
        return function (a, b) {
            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
    };


    /**
     * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
     * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
     * if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
     *
     * @static
     * @memberOf R
     * @param {Function} comparator A sorting function :: a -> b -> Int
     * @param {Array} list The list to sort
     * @return {Array} a new array with its elements sorted by the comparator function.
     * @example
     *
     *      sort(function(a, b) { return a - b; }, [4,2,7,5]); // => [2, 4, 5, 7];
     */
    var sort = R.sort = curry2(function sort(comparator, list) {
        return clone(list).sort(comparator);
    });


    /**
     * Splits a list into sublists stored in an object, based on the result of calling a String-returning function
     * on each element, and grouping the results according to values returned.
     *
     * @static
     * @memberOf R
     * @param {Function} fn Function :: a -> String
     * @param {Array} list The array to group
     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
     *         that produced that key when passed to `fn`.
     * @example
     *     var byGrade = groupBy(function(student) {
     *       var score = student.score
     *       return (score < 65) ? 'F' : (score < 70) ? 'D' :
     *              (score < 80) ? 'C' : (score < 90) ? 'B' : 'A';
     *     };
     *     var students = [{name: 'Abby', score: 84},
     *                     {name: 'Eddy', score: 58},
     *                     // ...
     *                     {name: 'Jack', score: 69}];
     *     byGrade(students);
     *     //=> {
     *     //   'A': [{name: 'Dianne', score: 99}],
     *     //   'B': [{name: 'Abby', score: 84}]
     *     //   // ...,
     *     //   'F': [{name: 'Eddy', score: 58}]
     *     // }
     */
    R.groupBy = curry2(function _groupBy(fn, list) {
        return foldl(function (acc, elt) {
            var key = fn(elt);
            acc[key] = append(elt, acc[key] || (acc[key] = []));
            return acc;
        }, {}, list);
    });


    /**
     * Takes a predicate and a list and returns the pair of lists of
     * elements which do and do not satisfy the predicate, respectively.
     *
     * @static
     * @memberOf R
     * @param {Function} pred Function :: a -> Boolean
     * @param {Array} list The array to partition
     * @return {Array} A nested array, containing first an array of elements that satisfied the predicate,
     *                 and second an array of elements that did not satisfy.
     * @example
     *
     *      partition(contains('s'), ['sss', 'ttt', 'foo', 'bars'])
     *     // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
     */
    R.partition = curry2(function _partition(pred, list) {
        return foldl(function (acc, elt) {
            acc[pred(elt) ? 0 : 1].push(elt);
            return acc;
        }, [[], []], list);
    });




    // Object Functions
    // ----------------
    //
    // These functions operate on plain Javascript object, adding simple functions to test properties on these
    // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
    // objects.

    // --------

    /**
     * Runs the given function with the supplied object, then returns the object.
     *
     * @static
     * @memberOf R
     * @param {*} x
     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
     * @return {*} x
     * @example
     *
     *      tap(100, function(x) { console.log('x is ' + x); }); // => 100 (and logs: 'x is 100')
     */
    R.tap = curry2(function _tap(x, fn) {
        if (typeof fn === 'function') { fn(x); }
        return x;
    });


    /**
     * Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
     * non-coercing equality for primitives.
     *
     * @static
     * @memberOf R
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      var o = {};
     *      eq(o, o) // => true
     *      eq(o, {}) // => false
     *      eq(1, 1) // => true
     *      eq(1, '1') // => false
     */
    R.eq = function _eq(a, b) {
        return arguments.length < 2 ? function _eq(b) { return a === b; } : a === b;
    };


    /**
     * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {String} p The property name
     * @param {Object} obj The object to query
     * @return {*} The value at obj.p
     * @alias nth
     * @alias get
     * @example
     *
     *      prop('x', {x: 100}) // => 100
     *      prop('x', {}) // => undefined
     *
     *      // or via the `nth` alias:
     *
     *      var fifth = nth(4); // indexed from 0, remember
     *      fifth(['Bashful', 'Doc', 'Dopey', 'Grumpy', 'Happy', 'Sleepy', 'Sneezy']);
     *      //=> 'Happy'
     */
    var prop = R.prop = function prop(p, obj) {
        switch (arguments.length) {
            case 0: throw NO_ARGS_EXCEPTION;
            case 1: return function _prop(obj) { return obj[p]; };
        }
        return obj[p];
    };

    R.nth = R.get = R.prop;


    /**
     * Returns the value at the specified property.
     * The only difference from `prop` is the parameter order.
     *
     * @static
     * @memberOf R
     * @see prop
     * @category Object
     * @param {Object} obj The object to query
     * @param {String} prop The property name
     * @return {*} The value at obj.p
     * @example
     *
     *      prop({x: 100}, 'x'); // => 100
     */
    R.props = flip(R.prop);


    /**
     * An internal reference to `Object.prototype.hasOwnProperty`
     * @private
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty;


    /**
     * If the given object has an own property with the specified name,
     * returns the value of that property.
     * Otherwise returns the provided default value.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {String} p The name of the property to return.
     * @param {*} val The default value.
     * @returns {*} The value of given property or default value.
     * @example
     *
     *      var alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      var favorite = prop('favoriteLibrary');
     *      var favoriteWithDefault = propOrDefault('favoriteLibrary', 'Ramda');
     *
     *      favorite(alice);  //=> undefined
     *      favoriteWithDefault(alice);  //=> 'Ramda'
     */
    R.propOrDefault = curry3(function _propOrDefault(p, val, obj) {
        return hasOwnProperty.call(obj, p) ? obj[p] : val;
    });


    /**
     * Calls the specified function on the supplied object. Any additional arguments
     * after `fn` and `obj` are passed in to `fn`. If no additional arguments are passed to `func`,
     * `fn` is invoked with no arguments.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {String} fn The name of the property mapped to the function to invoke
     * @param {Object} obj The object
     * @return {*} The value of invoking `obj.fn`
     * @example
     *
     *      func('add', R, 1, 2) // => 3
     *
     *      var obj = { f: function() { return 'f called'; } };
     *      func('f', obj); // => 'f called'
     */
    R.func = function func(fn, obj) { // TODO: change param name: reserve `fn` for functions, not names?
        switch (arguments.length) {
            case 0: throw NO_ARGS_EXCEPTION;
            case 1: return function(obj) { return obj[fn].apply(obj, _slice(arguments, 1)); };
            default: return obj[fn].apply(obj, _slice(arguments, 2));
        }
    };


    /**
     * Returns a function that always returns the given value.
     *
     * @static
     * @memberOf R
     * @category Function
     * @param {*} val The value to wrap in a function
     * @return {Function} A Function :: * -> val
     * @alias constant
     * @alias K
     * @example
     *
     *      var t = always('Tee');
     *      t(); // => 'Tee'
     */
    var always = R.always = function _always(val) {
        return function () {
            return val;
        };
    };

    R.constant = R.K = R.always;


    /**
     * Scans a list for a `null` or `undefined` element.
     * Returns true if it finds one, false otherwise.
     *
     * @static
     * @memberOf R
     * @category list
     * @param {Array} list The array to scan
     * @return {Boolean}
     * @example
     *
     *      anyBlanks([1,2,null,3,4]); // => true
     *      anyBlanks([1,2,undefined,3,4]); // => true
     *      anyBlanks([1,2,3,4]); // => false
     *      anyBlanks([]); // => false
     */
    var anyBlanks = R.any(function _any(val) {
        return val == null;
    });


    /**
     * Internal reference to Object.keys
     *
     * @private
     * @param {Object}
     * @return {Array}
     */
    var nativeKeys = Object.keys;


    /**
     * Returns a list containing the names of all the enumerable own
     * properties of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own properties
     * @example
     *
     *      keys({a: 1, b: 2, c: 3}) // => ['a', 'b', 'c']
     */
    var keys = R.keys = function _keys(obj) {
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
     * Returns a list containing the names of all the
     * properties of the supplied object, including prototype properties.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own and prototype properties
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      keys(f) // => ['x', 'y']
     */
    R.keysIn = function _keysIn(obj) {
        var prop, ks = [];
        for (prop in obj) {
            ks.push(prop);
        }
        return ks;
    };


    /**
     * @private
     * @param {Function} fn The strategy for extracting keys from an object
     * @return {Function} A function that takes an object and returns an array of
     *                    key-value arrays.
     */
    var pairWith = function(fn) {
        return function(obj) {
            return R.map(function(key) { return [key, obj[key]]; }, fn(obj));
        };
    };


    /**
     * Converts an object into an array of key, value arrays.
     * Only the object's own properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own properties
     * @example
     *
     *      toPairs({a: 1, b: 2, c: 3}); // [['a', 1], ['b', 2], ['c', 3]]
     */
    R.toPairs = pairWith(R.keys);


    /**
     * Converts an object into an array of key, value arrays.
     * The object's own properties and prototype properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own
     *         and prototype properties
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      toPairsIn(f) // => [['x','X'], ['y','Y']]
     */
    R.toPairsIn = pairWith(R.keysIn);


    /**
     * Returns a list of all the enumerable own properties of the supplied object.
     * Note that the order of the output array is not guaranteed across
     * different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own properties
     * @example
     *
     *      values({a: 1, b: 2, c: 3}) // => [1, 2, 3]
     */
    R.values = function _values(obj) {
        var prop, props = keys(obj),
            length = props.length,
            vals = new Array(length);
        for (var i = 0; i < length; i++) {
            vals[i] = obj[props[i]];
        }
        return vals;
    };


    /**
     * Returns a list of all the properties, including prototype properties,
     * of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own and prototype properties
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      valuesIn(f) // => ['X', 'Y']
     */
    R.valuesIn = function _valuesIn(obj) {
        var prop, vs = [];
        for (prop in obj) {
            vs.push(obj[prop]);
        }
        return vs;
    };


    /**
     * Internal helper function for making a partial copy of an object
     *
     * @private
     *
     */
    // TODO: document, even for internals...
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
     * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
     * property is ignored.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Array} names an array of String propery names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @example
     *
     *      pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) // => {a: 1, d: 4}
     *      pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}) // => {a: 1}
     */
    R.pick = curry2(function pick(names, obj) {
        return pickWith(function(val, key) {
            return contains(key, names);
        }, obj);
    });


    /**
     * Returns a partial copy of an object omitting the keys specified.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Array} names an array of String propery names to omit from the new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with properties from `names` not on it.
     * @example
     *
     *      omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) // => {b: 2, c: 3}
     */
    R.omit = curry2(function omit(names, obj) {
        return pickWith(function(val, key) {
            return !contains(key, names);
        }, obj);
    });


    /**
     * Returns a partial copy of an object containing only the keys that
     * satisfy the supplied predicate.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Function} pred A predicate to determine whether or not a key
     *        should be included on the output object.
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties that satisfy `pred`
     *         on it.
     * @see pick
     * @example
     *
     *      function isUpperCase(x) { return x.toUpperCase() === x; }
     *      pickWith(isUpperCase, {a: 1, b: 2, A: 3, B: 4}) // => {A: 3, B: 4}
     */
    R.pickWith = curry2(pickWith);


    /**
     * Internal implementation of `pickAll`
     *
     * @private
     * @see pickAll
     */
    // TODO: document, even for internals...
    var pickAll = function _pickAll(names, obj) {
        var copy = {};
        each(function (name) {
            copy[name] = obj[name];
        }, names);
        return copy;
    };


    /**
     * Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Array} names an array of String propery names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @see pick
     * @example
     *
     *      pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) // => {a: 1, d: 4}
     *      pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}) // => {a: 1, e: undefined, f: undefined}
     */
    R.pickAll = curry2(pickAll);


    /**
     * Assigns own enumerable properties of the other object to the destination
     * object prefering items in other.
     *
     * @private
     * @memberOf R
     * @category Object
     * @param {Object} object The destination object.
     * @param {Object} other The other object to merge with destination.
     * @returns {Object} Returns the destination object.
     * @example
     *
     *      extend({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
     *      // => { 'name': 'fred', 'age': 40 }
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
     * This function will *not* mutate passed-in objects.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} a source object
     * @param {Object} b object with higher precendence in output
     * @returns {Object} Returns the destination object.
     * @example
     *
     *      mixin({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
     *      // => { 'name': 'fred', 'age': 40 }
     */
    R.mixin = curry2(function _mixin(a, b) {
        return extend(extend({}, a), b);
    });


    /**
     * Reports whether two functions have the same value for the specified property.  Useful as a curried predicate.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {String} prop The name of the property to compare
     * @param {Object} obj1
     * @param {Object} obj2
     * @return {Boolean}
     *
     * @example
     *
     *      o1 = {a: 1, b: 2, c: 3, d: 4};
     *      o2 = { a: 10, b: 20, c: 3, d: 40};
     *      eqProps('a', o1, o2) // => false
     *      eqProps('c', o1, o2) // => true
     */
    R.eqProps = curry3(function eqProps(prop, obj1, obj2) {
        return obj1[prop] === obj2[prop];
    });


    /**
     * internal helper for `where`
     *
     * @private
     * @see where
     */
    function satisfiesSpec(spec, parsedSpec, testObj) {
        if (spec === testObj) { return true; }
        if (testObj == null) { return false; }
        parsedSpec.fn = parsedSpec.fn || [];
        parsedSpec.obj = parsedSpec.obj || [];
        var key, val, i = -1, fnLen = parsedSpec.fn.length, j = -1, objLen = parsedSpec.obj.length;
        while (++i < fnLen) {
            key = parsedSpec.fn[i];
            val = spec[key];
            //     if (!hasOwnProperty.call(testObj, key)) {
            //       return false;
            //     }
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
     * Takes a spec object and a test object and returns true if the test satisfies the spec.
     * Any property on the spec that is not a function is interpreted as an equality
     * relation.
     *
     * If the spec has a property mapped to a function, then `where` evaluates the function, passing in
     * the test object's value for the property in question, as well as the whole test object.
     *
     * `where` is well suited to declarativley expressing constraints for other functions, e.g.,
     * `filter`, `find`, `pickWith`, etc.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} spec
     * @param {Object} testObj
     * @return {Boolean}
     * @example
     *
     *      var spec = {x: 2};
     *      where(spec, {w: 10, x: 2, y: 300}); // => true
     *      where(spec, {x: 1, y: 'moo', z: true}); // => false
     *
     *      var spec2 = {x: function(val, obj) { return  val + obj.y > 10; };
     *      where(spec2, {x: 2, y: 7}); // => false
     *      where(spec2, {x: 3, y: 8}); // => true
     *
     *      var xs = [{x: 2, y: 1}, {x: 10, y: 2}, {x: 8, y: 3}, {x: 10, y: 4}];
     *      filter(where({x: 10}), xs); // ==> [{x: 10, y: 2}, {x: 10, y: 4}]
     */
    R.where = function where(spec, testObj) {
        var parsedSpec = R.groupBy(function(key) {
                return typeof spec[key] === 'function' ? 'fn' : 'obj';
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
     * Expose the functions from ramda as properties of another object.
     * If the provided object is the global object then the ramda
     * functions become global functions.
     * Warning: This function *will* mutate the object provided.
     *
     * @static
     * @memberOf R
     * @category Object
     * @param {Object} obj The object to attach ramda functions
     * @return {Object} a reference to the mutated object
     * @example
     *
     *      var x = {}
     *      R.installTo(x) // => x now contains ramda functions
     *      R.installTo(this) // => add ramda functions to `this` object
     */
    R.installTo = function(obj) {
        return extend(obj, R);
    };


    /**
     * See if an object (`val`) is an instance of the supplied constructor.
     * This function will check up the inheritance chain, if any.
     *
     * @static
     * @memberOf R
     * @category type
     * @param {Object} ctor A constructor
     * @param {*} val The value to test
     * @return {Boolean}
     * @example
     *
     *      is(Object, {}) // => true
     *      is(Number, 1) // => true
     *      is(String, 's') // => true
     *      is(String, new String('')) // => true
     *      is(Object, new String('')) // => true
     *      is(Number, {}) // => false
     */
    R.is = curry2(function is(ctor, val) {
        return val != null && val.constructor === ctor || val instanceof ctor;
    });


    /**
     * A function that always returns `0`. Any passed in parameters are ignored.
     *
     * @static
     * @memberOf R
     * @category function
     * @see always
     * @return {Number} 0. Always zero.
     * @example
     *
     *      alwaysZero() // => 0
     */
    R.alwaysZero = always(0);


    /**
     * A function that always returns `false`. Any passed in parameters are ignored.
     *
     * @static
     * @memberOf R
     * @category function
     * @see always
     * @return {Boolean} false
     * @example
     *
     *      alwaysFalse() // => false
     */
    R.alwaysFalse = always(false);


    /**
     * A function that always returns `true`. Any passed in parameters are ignored.
     *
     * @static
     * @memberOf R
     * @category function
     * @see always
     * @return {Boolean} true
     * @example
     *
     *      alwaysTrue() // => true
     */
    R.alwaysTrue = always(true);



    // Logic Functions
    // ---------------
    //
    // These functions are very simple wrappers around the built-in logical operators, useful in building up
    // more complex functional forms.

    // --------

    /**
     *
     * A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
     * this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
     * value.
     *
     * @static
     * @memberOf R
     * @category logic
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and ANDs their outputs together.
     * @example
     *
     *      gt10 = function(x) { return x > 10; };
     *      even = function(x) { return x % 2 === 0 };
     *      f = and(gt10, even);
     *      f(100) // => true
     *      f(101) // => false
     */
    R.and = curry2(function and(f, g) {
        return function _and() {
            return !!(f.apply(this, arguments) && g.apply(this, arguments));
        };
    });


    /**
     * A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
     * this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
     * value.
     *
     * @static
     * @memberOf R
     * @category logic
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and ORs their outputs together.
     * @example
     *
     *      gt10 = function(x) { return x > 10; };
     *      even = function(x) { return x % 2 === 0 };
     *      f = or(gt10, even);
     *      f(101) // => false
     *      f(8) // => true
     */
    R.or = curry2(function or(f, g) {
        return function _or() {
            return !!(f.apply(this, arguments) || g.apply(this, arguments));
        };
    });


    /**
     * A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
     * underlying function would return a false-y value, and `false` when it would return a truth-y one.
     *
     * @static
     * @memberOf R
     * @category logic
     * @param {Function} f a predicate
     * @return {Function} a function that applies its arguments to `f` and logically inverts its output.
     * @example
     *
     *      gt10 = function(x) { return x > 10; };
     *      f = not(gt10);
     *      f(11) // => false
     *      f(9) // => true
     */
    var not = R.not = function _not(f) {
        return function() {return !f.apply(this, arguments);};
    };


    /**
     * Create a predicate wrapper which will call a pick function (all/any) for each predicate
     *
     * @private
     * @see all, any
     */
    // TODO: document, even for internals...
    var predicateWrap = function _predicateWrap(predPicker) {
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
                    arity(max(pluck('length', preds)), predIterator);
        };
    };


    /**
     * Given a list of predicates returns a new predicate that will be true exactly when all of them are.
     *
     * @static
     * @memberOf R
     * @category logic
     * @param {Array} list An array of predicate functions
     * @param {*} optional Any arguments to pass into the predicates
     * @return {Function} a function that applies its arguments to each of
     *         the predicates, returning `true` if all are satisfied.
     * @example
     *
     *      gt10 = function(x) { return x > 10; };
     *      even = function(x) { return x % 2 === 0};
     *      f = allPredicates([gt10, even]);
     *      f(11) // => false
     *      f(12) // => true
     */
    R.allPredicates = predicateWrap(all);


    /**
     * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
     *
     * @static
     * @memberOf R
     * @category logic
     * @param {Array} list An array of predicate functions
     * @param {*} optional Any arguments to pass into the predicates
     * @return {Function}  a function that applies its arguments to each of the predicates, returning
     *                   `true` if all are satisfied..
     * @example
     *
     *      gt10 = function(x) { return x > 10; };
     *      even = function(x) { return x % 2 === 0};
     *      f = allPredicates([gt10, even]);
     *      f(11) // => true
     *      f(8) // => true
     *      f(9) // => false
     */
    R.anyPredicates = predicateWrap(any);




    // Arithmetic Functions
    // --------------------
    //
    // These functions wrap up the certain core arithmetic operators

    // --------

    /**
     * Adds two numbers (or strings). Equivalent to `a + b` but curried.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number|string} a The first value.
     * @param {number|string} b The second value.
     * @return {number|string} The result of `a + b`.
     * @example
     *
     *      var increment = add(1);
     *      increment(10);   //= 11
     *      add(2, 3);       //=  5
     *      add(7)(10);      //= 17
     */
    var add = R.add = curry2(function _add(a, b) { return a + b; });


    /**
     * Multiplies two numbers. Equivalent to `a * b` but curried.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The first value.
     * @param {number} b The second value.
     * @return {number} The result of `a * b`.
     * @example
     *
     *      var double = multiply(2);
     *      var triple = multiply(3);
     *      double(3);       //=  6
     *      triple(4);       //= 12
     *      multiply(2, 5);  //= 10
     */
    var multiply = R.multiply = curry2(function _multiply(a, b) { return a * b; });


    /**
     * Subtracts two numbers. Equivalent to `a - b` but curried.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The first value.
     * @param {number} b The second value.
     * @return {number} The result of `a - b`.
     * @see subtractN
     * @example
     *
     *      var complementaryAngle = subtract(90);
     *      complementaryAngle(30); //= 60
     *
     *      var theRestOf = subtract(1);
     *      theRestOf(0.25); //= 0.75
     *
     *      subtract(10)(8); //= 2
     */
    var subtract = R.subtract = curry2(function _subtract(a, b) { return a - b; });


    /**
     * Subtracts two numbers in reverse order. Equivalent to `b - a` but
     * curried. Probably more useful when partially applied than
     * `subtract`.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The first value.
     * @param {number} b The second value.
     * @return {number} The result of `a - b`.
     * @example
     *
     *      var complementaryAngle = subtract(90);
     *      complementaryAngle(30); //= 60
     *
     *      var theRestOf = subtract(1);
     *      theRestOf(0.25); //= 0.75
     *
     *      subtract(10)(8); //= 2
     */
    R.subtractN = flip(subtract);


    /**
     * Divides two numbers. Equivalent to `a / b`.
     * While at times the curried version of `divide` might be useful,
     * probably the curried version of `divideBy` will be more useful.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The first value.
     * @param {number} b The second value.
     * @return {number} The result of `a / b`.
     * @see divideBy
     * @example
     *
     *      var reciprocal = divide(1);
     *      reciprocal(4);   //= 0.25
     *      divide(71, 100); //= 0.71
     */
    var divide = R.divide = curry2(function _divide(a, b) { return a / b; });


    /**
     * Divides two numbers in reverse order. Equivalent to `b / a`.
     * `divideBy` is the reversed version of `divide`, where the second parameter is
     * divided by the first.  The curried version of `divideBy` may prove more useful
     * than that of `divide`.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The second value.
     * @param {number} b The first value.
     * @return {number} The result of `b / a`.
     * @see divide
     * @example
     *
     *      var half = divideBy(2);
     *      half(42); // => 21
     */
    R.divideBy = flip(divide);


    /**
     * Divides the second parameter by the first and returns the remainder.
     * The flipped version (`moduloBy`) may be more useful curried.
     * Note that this functions preserves the JavaScript-style behavior for
     * modulo. For mathematical modulo see `mathMod`
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} a The value to the divide.
     * @param {number} b The pseudo-modulus
     * @return {number} The result of `b % a`.
     * @see moduloBy, mathMod
     * @example
     *
     *      modulo(17, 3) // => 2
     *      // JS behavior:
     *      modulo(-17, 3) // => -2
     *      modulo(17, -3) // => 2
     */
    var modulo = R.modulo = curry2(function _modulo(a, b) { return a % b; });


    /**
     * Determine if the passed argument is an integer.
     *
     * @private
     * @param n
     * @category type
     * @return {Boolean}
     */
    // TODO: document, even for internals...
    var isInteger = Number.isInteger || function isInteger(n) {
        return (n << 0) === n;
    };


    /**
     * mathMod behaves like the modulo operator should mathematically, unlike the `%`
     * operator (and by extension, ramda.modulo). So while "-17 % 5" is -2,
     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
     * when the modulus is zero or negative.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} m The dividend.
     * @param {number} p the modulus.
     * @return {number} The result of `b mod a`.
     * @see moduloBy
     * @example
     *
     *      mathMod(-17, 5)  // 3
     *      mathMod(17, 5)   // 2
     *      mathMod(17, -5)  // NaN
     *      mathMod(17, 0)   // NaN
     *      mathMod(17.2, 5) // NaN
     *      mathMod(17, 5.3) // NaN
     */
    R.mathMod = curry2(function _mathMod(m, p) {
        if (!isInteger(m) || m < 1) { return NaN; }
        if (!isInteger(p)) { return NaN; }
        return ((m % p) + p) % p;
    });


    /**
     * Reversed version of `modulo`, where the second parameter is divided by the first.  The curried version of
     * this one might be more useful than that of `modulo`.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {number} m The dividend.
     * @param {number} p the modulus.
     * @return {number} The result of `b mod a`.
     * @see modulo
     * @example
     *
     *      var isOdd = moduloBy(2);
     *      isOdd(42); // => 0
     *      isOdd(21); // => 1
     */
    R.moduloBy = flip(modulo);


    /**
     * Adds together all the elements of a list.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Array} list An array of numbers
     * @return {number} The sum of all the numbers in the list.
     * @see reduce
     * @example
     *
     *      sum([2,4,6,8,100,1]); // => 121
     */
    R.sum = foldl(add, 0);


    /**
     * Multiplies together all the elements of a list.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Array} list An array of numbers
     * @return {number} The product of all the numbers in the list.
     * @see reduce
     * @example
     *
     *      product([2,4,6,8,100,1]); // => 38400
     */
    R.product = foldl(multiply, 1);


    /**
     * Returns true if the first parameter is less than the second.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean} a < b
     * @example
     *
     *      lt(2, 6) // => true
     *      lt(2, 0) // => false
     *      lt(2, 2) // => false
     */
    R.lt = curry2(function _lt(a, b) { return a < b; });


    /**
     * Returns true if the first parameter is less than or equal to the second.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean} a <= b
     * @example
     *
     *      lte(2, 6) // => true
     *      lt(2, 0) // => false
     *      lt(2, 2) // => true
     */
    R.lte = curry2(function _lte(a, b) { return a <= b; });


    /**
     * Returns true if the first parameter is greater than the second.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean} a > b
     * @example
     *
     *      gt(2, 6) // => false
     *      gt(2, 0) // => true
     *      gt(2, 2) // => false
     */
    R.gt = curry2(function _gt(a, b) { return a > b; });


    /**
     * Returns true if the first parameter is greater than or equal to the second.
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean} a >= b
     * @example
     *
     *      gt(2, 6) // => false
     *      gt(2, 0) // => true
     *      gt(2, 2) // => true
     */
    R.gte = curry2(function _gte(a, b) { return a >= b; });


    /**
     * Determines the largest of a list of numbers (or elements that can be cast to numbers)
     *
     * @static
     * @memberOf R
     * @category math
     * @see maxWith
     * @param {Array} list A list of numbers
     * @return {Number} The greatest number in the list
     * @example
     *
     *      max([7, 3, 9, 2, 4, 9, 3]) // => 9
     */
    var max = R.max = function _max(list) {
        return foldl(binary(Math.max), -Infinity, list);
    };


    /**
     * Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Function} keyFn A comparator function for elements in the list
     * @param {Array} list A list of comparable elements
     * @return {*} The greatest element in the list. `undefined` if the list is empty.
     * @see max
     * @example
     *
     *      function cmp(obj) { return obj.x; }
     *      a = {x: 1}, b = {x: 2}, c = {x: 3};
     *      maxWith(cmp, [a, b, c]) // => {x: 3}
     */
    R.maxWith = curry2(function _maxWith(keyFn, list) {
        if (!(list && list.length > 0)) {
           return;
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
     * Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Function} keyFn A comparator function for elements in the list
     * @param {Array} list A list of comparable elements
     * @see min
     * @return {*} The greatest element in the list. `undefined` if the list is empty.
     * @example
     *
     *      function cmp(obj) { return obj.x; }
     *      var a = {x: 1}, b = {x: 2}, c = {x: 3};
     *      minWith(cmp, [a, b, c]) // => {x: 1}
     */
    // TODO: combine this with maxWith?
    R.minWith = curry2(function _minWith(keyFn, list) {
        if (!(list && list.length > 0)) {
            return;
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
     * Determines the smallest of a list of numbers (or elements that can be cast to numbers)
     *
     * @static
     * @memberOf R
     * @category math
     * @param {Array} list A list of numbers
     * @return {Number} The greatest number in the list
     * @see minWith
     * @example
     *
     *      min([7, 3, 9, 2, 4, 9, 3]) // => 2
     */
    R.min = function _min(list) {
        return foldl(binary(Math.min), Infinity, list);
    };



    // String Functions
    // ----------------
    //
    // Much of the String.prototype API exposed as simple functions.

    // --------

    /**
     * returns a subset of a string between one index and another.
     *
     * @static
     * @memberOf R
     * @category string
     * @param {Number} indexA An integer between 0 and the length of the string.
     * @param {Number} indexB An integer between 0 and the length of the string.
     * @param {String} The string to extract from
     * @return {String} the extracted substring
     * @see invoker
     * @example
     *
     *      substring(2, 5, 'abcdefghijklm'); //=> 'cde'
     */
    var substring = R.substring = invoker('substring', String.prototype);


    /**
     * The trailing substring of a String starting with the nth character:
     *
     * @static
     * @memberOf R
     * @category string
     * @param {Number} indexA An integer between 0 and the length of the string.
     * @param {String} The string to extract from
     * @return {String} the extracted substring
     * @see invoker
     * @example
     *
     *      substringFrom(8, 'abcdefghijklm'); //=> 'ijklm'
     */
    R.substringFrom = flip(substring)(void 0);


    /**
     * The leading substring of a String ending before the nth character:
     *
     * @static
     * @memberOf R
     * @category string
     * @param {Number} indexA An integer between 0 and the length of the string.
     * @param {String} The string to extract from
     * @return {String} the extracted substring
     * @see invoker
     * @example
     *
     *      substringTo(8, 'abcdefghijklm'); //=> 'abcdefgh'
     */
    R.substringTo = substring(0);


    /**
     * The character at the nth position in a String:
     *
     * @static
     * @memberOf R
     * @category string
     * @param {Number} index An integer between 0 and the length of the string.
     * @param {String} str The string to extract a char from
     * @return {String} the character at `index` of `str`
     * @see invoker
     * @example
     *
     *      charAt(8, 'abcdefghijklm'); //=> 'i'
     */
    R.charAt = invoker('charAt', String.prototype);


    /**
     * The ascii code of the character at the nth position in a String:
     *
     * @static
     * @memberOf R
     * @category string
     * @param {Number} index An integer between 0 and the length of the string.
     * @param {String} str The string to extract a charCode from
     * @return {Number} the code of the character at `index` of `str`
     * @see invoker
     * @example
     *
     *      charCodeAt(8, 'abcdefghijklm'); //=> 105
     *     // (... 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105)
     */
    R.charCodeAt = invoker('charCodeAt', String.prototype);


    /**
     * Tests a regular expression agains a String
     *
     * @static
     * @memberOf R
     * @category string
     * @param {RegExp} rx A regular expression.
     * @param {String} str The string to match against
     * @return {Array} The list of matches, or null if no matches found
     * @see invoker
     * @example
     *
     *      match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
     */
    R.match = invoker('match', String.prototype);


    /**
     * Finds the first index of a substring in a string, returning -1 if it's not present
     *
     * @static
     * @memberOf R
     * @category string
     * @param {String} c A string to find.
     * @param {String} str The string to search in
     * @return {Number} The first index of `c` or -1 if not found
     * @see invoker
     * @example
     *
     *      strIndexOf('c', 'abcdefg) //=> 2
     */
    R.strIndexOf = invoker('indexOf', String.prototype);


    /**
     *
     * Finds the last index of a substring in a string, returning -1 if it's not present
     *
     * @static
     * @memberOf R
     * @category string
     * @param {String} c A string to find.
     * @param {String} str The string to search in
     * @return {Number} The last index of `c` or -1 if not found
     * @see invoker
     * @example
     *
     *      strLastIndexOf('a', 'banana split') //=> 5
     */
    R.strLastIndexOf = invoker('lastIndexOf', String.prototype);


    /**
     * The upper case version of a string.
     *
     * @static
     * @memberOf R
     * @category string
     * @param {string} str The string to upper case.
     * @return {string} The upper case version of `str`.
     * @example
     *
     *      toUpperCase('abc') //= 'ABC'
     */
    R.toUpperCase = invoker('toUpperCase', String.prototype);


    /**
     * The lower case version of a string.
     *
     * @static
     * @memberOf R
     * @category string
     * @param {string} str The string to lower case.
     * @return {string} The lower case version of `str`.
     * @example
     *
     *      toLowerCase('XYZ') //= 'xyz'
     */
    R.toLowerCase = invoker('toLowerCase', String.prototype);


    /**
     * Splits a string into an array of strings based on the given
     * separator.
     *
     * @static
     * @memberOf R
     * @category string
     * @param {string} sep The separator string.
     * @param {string} str The string to separate into an array.
     * @return {Array} The array of strings from `str` separated by `str`.
     * @example
     *
     *      var pathComponents = split('/');
     *      pathComponents('/usr/local/bin/node');
     *      //= ['usr', 'local', 'bin', 'node']
     *
     *      split('.', 'a.b.c.xyz.d');
     *      //= ['a', 'b', 'c', 'xyz', 'd']
     */
    R.split = invoker('split', String.prototype, 1);


    /**
     * internal path function
     * Takes an array, paths, indicating the deep set of keys
     * to find.
     *
     * @private
     * @memberOf R
     * @category string
     * @param {Array} paths An array of strings to map to object properties
     * @param {Object} obj The object to find the path in
     * @return {Array} The value at the end of the path or `undefined`.
     * @example
     *
     *      path(['a', 'b'], {a: {b: 2}}) // => 2
     */
    function path(paths, obj) {
        var i = -1, length = paths.length, val;
        if (obj == null) { return; }
        val = obj;
        while (val != null && ++i < length) {
            val = val[paths[i]];
        }
        return val;
    }


    /**
     * Retrieve a nested path on an object seperated by the specified
     * separator value.
     *
     * @static
     * @memberOf R
     * @category string
     * @param {string} sep The separator to use in `path`.
     * @param {string} path The path to use.
     * @return {*} The data at `path`.
     * @example
     *
     *      pathOn('/', 'a/b/c', {a: {b: {c: 3}}}) //= 3
     */
    R.pathOn = curry3(function pathOn(sep, str, obj) {
        return path(str.split(sep), obj);
    });


    /**
     * Retrieve a nested path on an object seperated by periods
     *
     * @static
     * @memberOf R
     * @category string
     * @param {string} path The dot path to use.
     * @return {*} The data at `path`.
     * @example
     *
     *      path('a.b', {a: {b: 2}}) //= 2
     */
    R.path = R.pathOn('.');



    // Data Analysis and Grouping Functions
    // ------------------------------------
    //
    // Functions performing SQL-like actions on lists of objects.  These do
    // not have any SQL-like optimizations performed on them, however.

    // --------

    /**
     * Reasonable analog to SQL `select` statement.
     *
     * @static
     * @memberOf R
     * @category object
     * @category relation
     * @param {Array} props The property names to project
     * @param {Array} objs The objects to query
     * @return {Array} An array of objects with just the `props` properties.
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2},
     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7}
     *      var kids = [abby, fred];
     *      project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
     */
    R.project = useWith(map, R.pickAll, identity); // passing `identity` gives correct arity


    /**
     * Determines whether the given property of an object has a specific
     * value according to strict equality (`===`).  Most likely used to
     * filter a list:
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {string|number} name The property name (or index) to use.
     * @param {*} val The value to compare the property with.
     * @return {boolean} `true` if the properties are equal, `false` otherwise.
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
     *      var kids = [abby, fred, rusty, alois];
     *      var hasBrownHair = propEq('hair', 'brown');
     *      filter(hasBrownHair, kids); //= [fred, rusty]
     */
    R.propEq = curry3(function propEq(name, val, obj) {
        return obj[name] === val;
    });


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the
     * elements of each list.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The first and second lists concatenated, with
     * duplicates removed.
     * @example
     *
     *      union([1, 2, 3], [2, 3, 4]); //= [1, 2, 3, 4]
     */
    R.union = compose(uniq, R.concat);


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
     * determined according to the value returned by applying the supplied predicate to two list elements.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} pred
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The first and second lists concatenated, with
     *         duplicates removed.
     * @see union
     * @example
     *
     *      function cmp(x, y) { return x.a === y.a; }
     *      var l1 = [{a: 1}, {a: 2}];
     *      var l2 = [{a: 1}, {a: 4}];
     *      unionWith(cmp, l1, l2); //= [{a: 1}, {a: 2}, {a: 4}]
     */
    R.unionWith = curry3(function _unionWith(pred, list1, list2) {
        return uniqWith(pred, concat(list1, list2));
    });


    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The elements in `list1` that are not in `list2`
     * @see differenceWith
     * @example
     *
     *      difference([1,2,3,4], [7,6,5,4,3]); //= [1,2]
     *      difference([7,6,5,4,3], [1,2,3,4]); //= [7,6,5]
     */
    R.difference = curry2(function _difference(first, second) {
        return uniq(reject(flip(contains)(second), first));
    });


    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     * Duplication is determined according to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} pred
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see difference
     * @return {Array} The first and second lists concatenated, with
     *                 duplicates removed.
     * @example
     *
     *      function cmp(x, y) { return x.a === y.a; }
     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
     *      var l2 = [{a: 3}, {a: 4}];
     *      differenceWith(cmp, l1, l2); //= [{a: 1}, {a: 2}]
     *
     */
    R.differenceWith = curry3(function differenceWith(pred, first, second) {
        return uniqWith(pred)(reject(flip(R.containsWith(pred))(second), first));
    });


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see intersectionWith
     * @return {Array} The list of elements found in both `list1` and `list2`
     * @example
     *
     *      intersection(1,2,3,4], [7,6,5,4,3]); //= [1,2,3,4]
     */
    R.intersection = curry2(function intersection(list1, list2) {
        return uniq(filter(flip(contains)(list1), list2));
    });


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those
     * elements common to both lists.  Duplication is determined according
     * to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} pred A predicate function that determines whether
     *        the two supplied elements are equal.
     *        Signatrue: a -> a -> Boolean
     * @param {Array} list1 One list of items to compare
     * @param {Array} list2 A second list of items to compare
     * @see intersection
     * @return {Array} A new list containing those elements common to both lists.
     * @example
     *
     *      var buffaloSpringfield = [
     *        {id: 824, name: 'Richie Furay'},
     *        {id: 956, name: 'Dewey Martin'},
     *        {id: 313, name: 'Bruce Palmer'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *      var csny = [
     *        {id: 204, name: 'David Crosby'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 539, name: 'Graham Nash'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *
     *      var sameId = function(o1, o2) {return o1.id === o2.id;};
     *
     *      intersectionWith(sameId, buffaloSpringfield, csny); //=>
     *      // [
     *      //   {id: 456, name: 'Stephen Stills'},
     *      //   {id: 177, name: 'Neil Young'}
     *      // ]
     */
    R.intersectionWith = curry3(function intersectionWith(pred, list1, list2) {
        var results = [], idx = -1;
        while (++idx < list1.length) {
            if (containsWith(pred, list1[idx], list2)) {
                results[results.length] = list1[idx];
            }
        }
        return uniqWith(pred, results);
    });


    /**
     * Creates a new list whose elements each have two properties: `val` is
     * the value of the corresponding item in the list supplied, and `key`
     * is the result of applying the supplied function to that item.
     *
     * @private
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} fn An arbitrary unary function returning a potential
     *        object key.  Signature: Any -> String
     * @param {Array} list The list of items to process
     * @return {Array} A new list with the described structure.
     * @example
     *
     *      var people = [
     *         {first: 'Fred', last: 'Flintstone', age: 23},
     *         {first: 'Betty', last: 'Rubble', age: 21},
     *         {first: 'George', last: 'Jetson', age: 29}
     *      ];
     *
     *      var fullName = function(p) {return p.first + ' ' + p.last;};
     *
     *      keyValue(fullName, people); //=>
     *      // [
     *      //     {
     *      //         key: 'Fred Flintstone',
     *      //         val: {first: 'Fred', last: 'Flintstone', age: 23}
     *      //     }, {
     *      //         key: 'Betty Rubble',
     *      //         val: {first: 'Betty', last: 'Rubble', age: 21}
     *      //    }, {
     *      //        key: 'George Jetson',
     *      //        val: {first: 'George', last: 'Jetson', age: 29}
     *      //    }
     *      // ];
     */
    function keyValue(fn, list) { // TODO: Should this be made public?
        return map(function(item) {return {key: fn(item), val: item};}, list);
    }


    /**
     * Sorts the list according to a key generated by the supplied function.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} fn The function mapping `list` items to keys.
     * @param {Array} list The list to sort.
     * @return {Array} A new list sorted by the keys generated by `fn`.
     * @example
     *
     *      var sortByFirstItem = sortBy(nth(0));
     *      var sortByNameCaseInsensitive = sortBy(compose(toLowerCase, prop('name')));
     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
     *      sortByFirstItem(pairs); //= [[-3, 3], [-2, 2], [-1, 1]]
     *      var alice = {
     *         name: 'ALICE',
     *         age: 101
     *      };
     *      var bob = {
     *         name: 'Bob',
     *        age: -10
     *      };
     *      var clara = {
     *        name: 'clara',
     *        age: 314.159
     *      };
     *      var people = [clara, bob, alice];
     *      sortByNameCaseInsensitive(people); //= [alice, bob, clara]
     */
    R.sortBy = curry2(function sortBy(fn, list) {
        return pluck('val', keyValue(fn, list).sort(comparator(function(a, b) {return a.key < b.key;})));
    });


    /**
     * Counts the elements of a list according to how many match each value
     * of a key generated by the supplied function. Returns an object
     * mapping the keys produced by `fn` to the number of occurrences in
     * the list. Note that all keys are coerced to strings because of how
     * JavaScript objects work.
     *
     * @static
     * @memberOf R
     * @category relation
     * @param {Function} fn The function used to map values to keys.
     * @param {Array} list The list to count elements from.
     * @return {Object} An object mapping keys to number of occurrences in the list.
     * @example
     *
     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
     *      var letters = split('', 'abcABCaaaBBc');
     *      countBy(Math.floor)(numbers);    //= {'1': 3, '2': 2, '3': 1}
     *      countBy(toLowerCase)(letters);   //= {'a': 5, 'b': 4, 'c': 3}
     */
    R.countBy = curry2(function countBy(fn, list) {
        return foldl(function(counts, obj) {
            counts[obj.key] = (counts[obj.key] || 0) + 1;
            return counts;
        }, {}, keyValue(fn, list));
    });


    /**
     * @private
     * @param {Function} fn The strategy for extracting function names from an object
     * @return {Function} A function that takes an object and returns an array of function names
     *
     */
    var functionsWith = function(fn) {
        return function(obj) {
            return R.filter(function(key) { return typeof obj[key] === 'function'; }, fn(obj));
        };
    };


    /**
     * Returns a list of function names of object's own functions
     *
     * @static .
     * @memberOf R
     * @category Object
     * @param {Object} obj The objects with functions in it
     * @return {Array} returns list of object's own function names
     * @example .
     *
     *      R.functions(R) // => returns list of ramda's own function names
     *      R.functions(this) // => returns list of function names in global scope's own function names
     */
    R.functions = functionsWith(R.keys);


    /**
     * Returns a list of function names of object's own and prototype functions
     *
     * @static .
     * @memberOf R
     * @category Object
     * @param {Object} obj The objects with functions in it
     * @return {Array} returns list of object's own and prototype function names
     * @example .
     *
     *      R.functionsIn(R) // => returns list of ramda's own and prototype function names
     *      R.functionsIn(this) // => returns list of function names in global scope's own and prototype function names
     */
    R.functionsIn = functionsWith(R.keysIn);


    // All the functional goodness, wrapped in a nice little package, just for you!
    return R;
}));
