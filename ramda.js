//     ramda.js 0.0.1
//     https://github.com/CrossEye/eweda
//     (c) 2013 Scott Sauyet and Michael Hurley
//     Eweda may be freely distributed under the MIT license.

// Ramda
// -----
// A practical functional library for Javascript programmers.  This is a collection of tools to make it easier to
// use Javascript as a functional programming language.  (The name is just a silly play on `lambda`, even though we're
// not actually involved in lambda expressions.)

// Basic Setup
// -----------
// Uses a technique from the [Universal Module Definition][umd] to wrap this up for use in Node.js or in the browser,
// with or without an AMD-style loader.
//
//  [umd]: https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root);} else if (typeof define === 'function' && define.amd) {define(factory);} else {root.ramda = factory(root);}}(this, function (global) {

    return  (function() {

        // This object is what is actually returned, with all the exposed functions attached as properties.

        var E = {};

        // Internal Functions and Properties
        // ---------------------------------

        var undef = (function(){})(), EMPTY;

        // Makes a public alias for one of the public functions:
        var aliasFor = function(oldName) {
            var fn = function(newName) {E[newName] = E[oldName]; return fn;};
            return (fn.is = fn.are = fn.and = fn);
        };
        // Partial replacement for native `bind`.
        var bind = function(fn, context) {
            var args = Array.prototype.slice.call(arguments, 2);
            return function() {
                return fn.apply(context || this, args.concat(Array.prototype.slice.call(arguments)));
            };
        };
        // Standard Array and Object methods implemented as pure functions
        var slice = bind(Function.prototype.call, Array.prototype.slice);
        var toString = bind(Function.prototype.call, Object.prototype.toString);
        var isArray = function(val) {return toString(val) === "[object Array]";};

        // Fills out an array to the specified length
        var expand = function(a, len) {
            var arr = a ? isArray(a) ? a : slice(a) : [];
            while(arr.length < len) {arr[arr.length] = undef;}
            return arr;
        };

        // Local version of partial application.
        var _ = function(fn) {
            var arity = fn.length;
            var f = function(args) {
                return function () {
                    var newArgs = (args || []).concat(slice(arguments, 0));
                    if (newArgs.length >= arity) {
                        return fn.apply(this, newArgs);
                    }
                    else {return f(newArgs);}
                };
            };

            return f([]);
        };

        // Internal version of `forEach`.  Possibly to be exposed later.
        var each = _(function(fn, arr) {
            for (var i = 0, len = arr.length; i < len; i++) {
                fn(arr[i]);
            }
        });

        // Shallow copy of an array.
        var clone = function(list) {
            var length = list.length;
            var c = new Array(length);
            for (var i = 0; i < length; ++i) {
              c[i] = list[i];
            }
            return c;
        };

        // Internal function used to simplify some calculations
        var addOne = function(n) {return n + 1;};


        // Core Functions
        // --------------
        //


        //   Prototypical (or only) empty list
        EMPTY = [];

        // Boolean function which reports whether a list is empty.
        var isEmpty = E.isEmpty = function(arr) {return !arr || !arr.length;};

        // Returns a new list with the new element at the front and the existing elements following
        var prepend = E.prepend = function(el, arr) {return [el].concat(arr);};
        aliasFor("prepend").is("cons"); // TODO: really?

        //  Returns the first element of a list
        var head = E.head = function(arr) {
            arr = arr || EMPTY;
            return (arr.length) ? arr[0] : EMPTY; // TODO: shouldn't head(EMPTY) return null?
        };
        aliasFor("head").is("car");  // TODO: really? sure! positively?

        // Returns the rest of the list after the first element.
        var tail = E.tail = function(arr) {
            arr = arr || EMPTY;
            return (arr.length > 1) ? arr.slice(1) : EMPTY;
        };
        aliasFor("tail").is("cdr");  // TODO: really? absolutely! without doubt?

        //   Boolean function which is `true` for non-list, `false` for a list.
        var isAtom = E.isAtom = function(x) {
            return (x !== null) && (x !== undefined) && Object.prototype.toString.call(x) !== "[object Array]";
        };

        // Returns a new list with the new element at the end of a list following all the existing ones.
        E.append = function(el, list) {
            var newList = clone(list);
            newList.push(el);
            return newList;
        };
        aliasFor("append").is("push");

        // Returns a new list consisting of the elements of the first list followed by the elements of the second.
        var merge = E.merge = _(function(list1, list2) {
            if (isEmpty(list1)) {
                return clone(list2);
            } else {
                return list1.concat(list2);
            }
        });
        aliasFor("merge").is("concat");


        // Function functions :-)
        // ----------------------
        //
        // These functions make new functions out of old ones.

        // Creates a new function that runs each of the functions supplied as parameters in turn, passing the output
        // of each one to the next one, starting with whatever arguments were passed to the initial invocation.
        // Note that if `var h = compose(f, g)`, `h(x)` calls `g(x)` first, passing the result of that to `f()`.
        var compose = E.compose = function() {  // TODO: type check of arguments?
            var fns = slice(arguments);
            return function() {
                return foldr(function(fn, args) {return [fn.apply(this, args)];}, slice(arguments), fns)[0];
            }
        };
        aliasFor("compose").is("fog"); // TODO: really?

        // Similar to `compose`, but processes the functions in the reverse order so that if if `var h = pipe(f, g)`,
        // `h(x)` calls `f(x)` first, passing the result of that to `g()`.
        var pipe = E.pipe = function() { // TODO: type check of arguments?
            return compose.apply(this, slice(arguments).reverse());
        };
        aliasFor("pipe").is("sequence");

        // Returns a new function much like the supplied one except that the first two arguments are inverted.
        var flip = E.flip = function(fn) {
            return _(function(a, b) {
                return fn.apply(this, [b, a].concat(slice(arguments, 2)));
            });
        };

        // Creates a new function that acts like the supplied function except that the left-most parameters are
        // pre-filled.
        var lPartial = E.lPartial = function (fn) {
            var args = slice(arguments, 1);
            return function() {
                return fn.apply(this, args.concat(slice(arguments)));
            };
        };
        aliasFor("lPartial").is("applyLeft");

        // Creates a new function that acts like the supplied function except that the right-most parameters are
        // pre-filled.
        var rPartial = E.rPartial =function (fn) {
            var args = slice(arguments, 1);
            return function() {
                return fn.apply(this, slice(arguments).concat(args));
            };
        };
        aliasFor("rPartial").is("applyRight");

        // Creates a new function that stores the results of running the supplied function and returns those
        // stored value when the same request is made.  **Note**: this really only handles string and number parameters.
        E.memoize = function(fn) {
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
        E.once = function(fn) {
            var called = false, result;
            return function() {
                if (called) {return result;}
                called = true;
                return (result = fn.apply(this, arguments));
            }
        };

        // Wrap a function inside another to allow you to make adjustments to the parameters or do other processing
        // either before the internal function is called or with its results.
        E.wrap = function(fn, wrapper) {
            return function() {
                return wrapper.apply(this, [fn].concat(slice(arguments)));
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



        // Returns a single item, by successively calling the function with the current element and the the next
        // element of the list, passing the result to the next call.  We start with the `acc` parameter to get
        // things going.  The function supplied should accept this running value and the latest element of the list,
        // and return an updated value.
        var foldl = E.foldl = _(function(fn, acc, list) {
            var idx = -1, len = list.length;
            while(++idx < len) {
                acc = fn(acc, list[idx]);
            }
            return acc;
        });
        aliasFor("foldl").is("reduce");

        // Much like `foldl`/`reduce`, except that this takes as its starting value the first element in the list.
        var foldl1 = E.foldl1 = _(function (fn, list) {
            if (isEmpty(list)) {
                throw new Error("foldl1 does not work on empty lists");
            }
            return foldl(fn, head(list), tail(list));
        });

        // Similar to `foldl`/`reduce` except that it moves from right to left on the list.
        var foldr = E.foldr =_(function(fn, acc, list) {
            var idx = list.length;
            while(idx--) {
                acc = fn(list[idx], acc);
            }
            return acc;

        });
        aliasFor("foldr").is("reduceRight");


        // Much like `foldr`/`reduceRight`, except that this takes as its starting value the last element in the list.
        var foldr1 = E.foldr1 = _(function (fn, list) {
            if (isEmpty(list)) {
                throw new Error("foldr1 does not work on empty lists");
            }
            var newList = clone(list), acc = newList.pop();
            return foldr(fn, acc, newList);
        });

        // Builds a list from a seed value, using a function that returns `undefined` to quit and a pair otherwise,
        // consisting of the current value and the seed to be used for the next value.

        var unfoldr = E.unfoldr = _(function(fn, seed) {
            var pair = fn(seed), result = [];
            while (pair && pair.length) {
                result.push(pair[0]);
                pair = fn(pair[1]);
            }
            return result;
        });

        // Returns a new list constructed by applying the function to every element of the list supplied.
        var map = E.map = _(function(fn, list) {
            var idx = -1, len = list.length, result = new Array(len);
            while (++idx < len) {
                result[idx] = fn(list[idx]);
            }
            return result;
        });

        // Reports the number of elements in the list
        var size = E.size = function(arr) {return arr.length;};

        // Returns a new list containing only those items that match a given predicate function.
        var filter = E.filter = _(function(fn, list) {
            //return foldr(function(x, acc) { return (fn(x)) ? prepend(x, acc) : acc; }, EMPTY, list);
            var idx = -1, len = list.length, result = [];
            while (++idx < len) {
                if (fn(list[idx])) {
                    result.push(list[idx]);
                }
            }
            return result;
        });

        // Similar to `filter`, except that it keeps only those that **don't** match the given predicate functions.
        E.reject = _(function(fn, list) {
            return filter(notFn(fn), list);
        });

        // Returns a new list containing the elements of the given list up until the first one where the function
        // supplied returns `false` when passed the element.
        var takeWhile = E.takeWhile = _(function(fn, list) {
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
        var take = E.take = _(function(n, list) {
            return takeWhile((function() {var count = 0; return function(x) {return count++ < n;};}()), list);
        });

        // Returns a new list containing the elements of the given list starting with the first one where the function
        // supplied returns `false` when passed the element.
        var skipUntil = E.skipUntil = _(function(fn, list) {
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
        var skip = E.skip = _(function(n, list) {
            return skipUntil((function() {var count = 0; return function(x) {return count++ >= n;};}()), list);
        });
        aliasFor('skip').is('drop');

        // Returns the first element of the list which matches the predicate, or `false` if no element matches.
        var find = E.find = _(function(fn, list) {
            var idx = -1, len = list.length
            while (++idx < len) {
                if(fn(list[idx])) {
                    return list[idx];
                }
            }
            return false;
        });

        // Returns `true` if all elements of the list match the predicate, `false` if there are any that don't.
        var all = E.all = _(function (fn, list) {
            return (isEmpty(list)) ? true : fn(head(list)) && all(fn, tail(list));
        });
        aliasFor("all").is("every");


        // Returns `true` if any elements of the list match the predicate, `false` if none do.
        var any = E.any = _(function(fn, list) {
            return (isEmpty(list)) ? false : fn(head(list)) || any(fn, tail(list));
        });
        aliasFor("any").is("some");

        // Returns `true` if the list contains the sought element, `false` if it does not.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var contains = E.contains = _(function(a, list) {
            return (isEmpty(list)) ? false : head(list) === a || contains(a, tail(list));
        });

        // Returns a new list containing only one copy of each element in the original list.  Equality is strict here,
        // meaning reference equality for objects and non-coercing equality for primitives.
        var uniq = E.uniq = function(list) {
            return foldr(function(x, acc) { return (contains(x, acc)) ? acc : prepend(x, acc); }, EMPTY, list);
        };

        // Returns a new list by plucking the same named property off all objects in the list supplied.
        E.pluck = function(p) {return map(prop(p));};

        // Returns a list that contains a flattened version of the supplied list.  For example:
        //
        //     flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
        //     // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var flatten = E.flatten = function(list) {
            var h = head(list), t = tail(list);
            return isEmpty(list) ? EMPTY : (isAtom(h)) ? prepend(h, flatten(t)) : merge(flatten(h), flatten(t));
        };

        // Creates a new list out of the two supplied by applying the function to each equally-positioned pair in the
        // lists.  For example,
        //
        //     zipWith(f, [1, 2, 3], ['a', 'b', 'c'])
        //     //    => [f(1, 'a'), f(2, 'b'), f(3, 'c')];
        var zipWith = E.zipWith = _(function(fn, a, b) {
            return (isEmpty(a) || isEmpty(b)) ? EMPTY : prepend(fn(head(a), head(b)), zipWith(fn, tail(a), tail(b)));
        });

        // Creates a new list out of the two supplied by yielding the pair of each equally-positioned pair in the
        // lists.  For example,
        //
        //     zip([1, 2, 3], ['a', 'b', 'c'])
        //     //    => [[1, 'a'], [2, 'b'], [3, 'c']];
        var zip = E.zip = zipWith(prepend);


        // Creates a new list out of the two supplied by applying the function to each possible pair in the lists.
        //  For example,
        //
        //     xProdWith(f, [1, 2], ['a', 'b'])
        //     //    => [f(1, 'a'), f(1, 'b'), f(2, 'a'), f(2, 'b')];
        var xprodWith = E.xprodWith = _(function(fn, a, b) {
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
        E.xprod = _(function(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
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
        var reverse = E.reverse = function(list) {
            return clone(list || []).reverse();
        };

        // // Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
        // For example, 
        //
        //     range(1, 5) // => [1, 2, 3, 4]
        //     range(50, 53) // => [50, 51, 52]
        var range = E.range = _(function(from, to) {
            if (from >= to) {return EMPTY;}
            var idx, result = new Array(to - from);
            for (idx = 0; from < to; idx++, from++) {
                result[idx] = from;
            }
            return result;
        });


        // Returns the first zero-indexed position of an object in a flat list
        E.indexOf = _(function(obj, list) {
            return list.indexOf(obj);
        });

        // Returns the last zero-indexed position of an object in a flat list
        E.lastIndexOf = _(function(obj, list) {
            return list.lastIndexOf(obj);
        });

        // Returns the elements of the list as a string joined by a separator.
        E.join = _(function(sep, list) {
            return list.join(sep);
        });

        // ramda.splice has a different contract than Array.splice. Array.splice mutates its array
        // and returns the removed elements. ramda.splice does not mutate the passed in list (well,
        // it makes a shallow copy), and returns a new list with the specified elements removed. 
        E.splice = _(function(start, len, list) {
            var ls = list.slice(0);
            ls.splice(start, len);
            return ls;
        });
        
       
        
        // Object Functions
        // ----------------
        //
        // These functions operate on plain Javascript object, adding simple functions to test properties on these
        // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
        // objects.

        // Runs the given function with the supplied object, then returns the object.
        var tap = E.tap = _(function(x, fn) {
            if (typeof fn === "function") {
                fn(x);
            }
            return x;
        });
        aliasFor("tap").is("K"); // TODO: are we sure? Not necessary, but convenient, IMHO.

        // Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
        // non-coercing equality for primitives.
        E.eq = _(function(a, b) {
            return a === b;
        });

        // Returns a function that when supplied an object returns the indicated property of that object, if it exists.
        var prop = E.prop = function(p) {return function(obj) {return obj[p];};};

        // Returns a function that when supplied an object returns the result of running the indicated function on
        // that object, if it has such a function.
        E.func = function(n) {return function(obj) {return obj[n].apply(obj, slice(arguments, 1));};};

        // Returns a function that when supplied a property name returns that property on the indicated object, if it
        // exists.
        var props = E.props = function(obj) {
            return function(prop) {return obj && obj[prop];};
        };

        // Returns a function that always returns the given value.
        var identity = E.identity = function(val) {
            return function() {return val;};
        };

        var anyBlanks = any(function(val) {return val === null || val === undef;});

        // Returns a function that will only call the indicated function if the correct number of (defined, non-null)
        // arguments are supplied, returning `undefined` otherwise.
        E.maybe = function (fn) {
            return function () {
                return (arguments.length === 0 || anyBlanks(expand(arguments, fn.length))) ? undef : fn.apply(this, arguments);
            };
        };

        // Returns a list containing the names of all the enumerable own
        // properties of the supplied object.
        var keys = E.keys = function(obj) {
          var prop, ks = [];
          for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              ks.push(prop);
            }
          }
          return ks;
        };

        // Returns a list of all the enumerable own properties of the supplied object.
        E.values = function(obj) {
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

        // Returns a partial copy of an object containing only the keys specified.
        E.pick = _(function(names, obj) {
            return partialCopy(function(key) {return contains(key, names);}, obj);
        });

        // Returns a partial copy of an object omitting the keys specified.
        E.omit = _(function(names, obj) {
            return partialCopy(function(key) {return !contains(key, names);}, obj);
        });


        // Logic Functions
        // ---------------
        //
        // These functions are very simple wrappers around the built-in logical operators, useful in building up
        // more complex functional forms.

        // A function wrapping the boolean `&&` operator.  Note that unlike the underlying operator, though, it
        // aways returns `true` or `false`.
        var and = E.and = _(function (a, b) {
            return !!(a && b);
        });

        // A function wrapping the boolean `||` operator.  Note that unlike the underlying operator, though, it
        // aways returns `true` or `false`.
        var or = E.or = _(function (a, b) {
            return !!(a || b);
        });

        // A function wrapping the boolean `!` operator.  It returns `true` if the parameter is false-y and `false` if
        // the parameter is truth-y
        E.not = function (a) {
            return !a;
        };

        // A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
        // value.
        E.andFn = _(function(f, g) { // TODO: arity?
           return function() {return !!(f.apply(this, arguments) && g.apply(this, arguments));};
        });

        // A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
        // this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
        // value. (Note also that at least Oliver Twist can pronounce this one...)
        E.orFn = _(function(f, g) { // TODO: arity?
           return function() {return !!(f.apply(this, arguments) || g.apply(this, arguments));};
        });

        // A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
        // underlying function would return a false-y value, and `false` when it would return a truth-y one.
        var notFn = E.notFn = function (f) {
            return function() {return !f.apply(this, arguments);};
        };


        // Arithmetic Functions
        // --------------------
        //
        // These functions wrap up the certain core arithmetic operators

        // Adds two numbers.  Automatic curried:
        //
        //     var add7 = add(7);
        //     add7(10); // => 17
        var add = E.add = _(function(a, b) {return a + b;});

        // Multiplies two numbers.  Automatically curried:
        //
        //     var mult3 = multiply(3);
        //     mult3(7); // => 21
        var multiply = E.multiply = _(function(a, b) {return a * b;});

        // Subtracts the second parameter from the first.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `subtractN` might be what's wanted.
        //
        //     var hundredMinus = subtract(100);
        //     hundredMinus(20) ; // => 80
        var subtract = E.subtract = _(function(a, b) {return a - b;});

        // Reversed version of `subtract`, where first parameter is subtracted from the second.  The curried version of
        // this one might me more useful than that of `subtract`.  For instance:
        //
        //     var decrement = subtractN(1);
        //     decrement(10); // => 9;
        E.subtractN = flip(subtract);

        // Divides the first parameter by the second.  This is automatically curried, and while at times the curried
        // version might be useful, often the curried version of `divideBy` might be what's wanted.
        var divide = E.divide = _(function(a, b) {return a / b;});

        // Reversed version of `divide`, where the second parameter is divided by the first.  The curried version of
        // this one might be more useful than that of `divide`.  For instance:
        //
        //     var half = divideBy(2);
        //     half(42); // => 21
        E.divideBy = flip(divide);

        // Adds together all the elements of a list.
        E.sum = foldl(add, 0);

        // Multiplies together all the elements of a list.
        E.product = foldl(multiply, 1);


        // Miscellaneous Functions
        // -----------------------
        //
        // A few functions in need of a good home.

        // Expose the functions from eweda as properties on another object.  If this object is the global object, then
        // it will be as though the eweda functions are global functions.
        E.installTo = function(obj) {
            each(function(key) {
                (obj || global)[key] = E[key];
            })(keys(E));
        };

        // A function that always returns `0`.
        E.alwaysZero = identity(0);

        // A function that always returns `false`.
        E.alwaysFalse = identity(false);

        // A function that always returns `true`.
        E.alwaysTrue = identity(true);

        return E;
    }());
}));


