//  Ramda v0.8.0
//  https://github.com/ramda/ramda
//  (c) 2013-2014 Scott Sauyet and Michael Hurley
//  Ramda may be freely distributed under the MIT license.

;(function() {

    'use strict';

    var __ = void 0;

    var _add = function _add(a, b) {
        return a + b;
    };

    var _all = function _all(fn, list) {
        var idx = -1;
        while (++idx < list.length) {
            if (!fn(list[idx])) {
                return false;
            }
        }
        return true;
    };

    var _any = function _any(fn, list) {
        var idx = -1;
        while (++idx < list.length) {
            if (fn(list[idx])) {
                return true;
            }
        }
        return false;
    };

    var _compose = function _compose(f, g) {
        return function () {
            return f.call(this, g.apply(this, arguments));
        };
    };

    var _concat = function _concat(set1, set2) {
        set1 = set1 || [];
        set2 = set2 || [];
        var idx;
        var len1 = set1.length;
        var len2 = set2.length;
        var result = new Array(len1 + len2);
        idx = -1;
        while (++idx < len1) {
            result[idx] = set1[idx];
        }
        idx = -1;
        while (++idx < len2) {
            result[len1 + idx] = set2[idx];
        }
        return result;
    };

    var _containsWith = function _containsWith(pred, x, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            if (pred(x, list[idx])) {
                return true;
            }
        }
        return false;
    };

    var _createMaxMinBy = function _createMaxMinBy(comparator) {
        return function (valueComputer, list) {
            if (!(list && list.length > 0)) {
                return;
            }
            var idx = 0, winner = list[idx], computedWinner = valueComputer(winner), computedCurrent;
            while (++idx < list.length) {
                computedCurrent = valueComputer(list[idx]);
                if (comparator(computedCurrent, computedWinner)) {
                    computedWinner = computedCurrent;
                    winner = list[idx];
                }
            }
            return winner;
        };
    };

    var _filter = function _filter(fn, list) {
        var idx = -1, len = list.length, result = [];
        while (++idx < len) {
            if (fn(list[idx])) {
                result[result.length] = list[idx];
            }
        }
        return result;
    };

    var _filterIndexed = function _filterIndexed(fn, list) {
        var idx = -1, len = list.length, result = [];
        while (++idx < len) {
            if (fn(list[idx], idx, list)) {
                result[result.length] = list[idx];
            }
        }
        return result;
    };

    var _foldl = function _foldl(fn, acc, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            acc = fn(acc, list[idx]);
        }
        return acc;
    };

    var _forEach = function _forEach(fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            fn(list[idx]);
        }
        return list;
    };

    var _functionsWith = function _functionsWith(fn) {
        return function (obj) {
            return _filter(function (key) {
                return typeof obj[key] === 'function';
            }, fn(obj));
        };
    };

    var _gt = function _gt(a, b) {
        return a > b;
    };

    var _indexOf = function _indexOf(list, item, from) {
        var idx = 0, len = list.length;
        if (typeof from == 'number') {
            idx = from < 0 ? Math.max(0, len + from) : from;
        }
        while (idx < len) {
            if (list[idx] === item) {
                return idx;
            }
            ++idx;
        }
        return -1;
    };

    var _isArray = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
    };

    var _isInteger = Number.isInteger || function _isInteger(n) {
        return n << 0 === n;
    };

    var _isThenable = function _isThenable(value) {
        return value != null && value === Object(value) && typeof value.then === 'function';
    };

    var _lastIndexOf = function _lastIndexOf(list, item, from) {
        var idx = list.length;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        while (--idx >= 0) {
            if (list[idx] === item) {
                return idx;
            }
        }
        return -1;
    };

    var _lt = function _lt(a, b) {
        return a < b;
    };

    var _map = function _map(fn, list) {
        var idx = -1, len = list.length, result = new Array(len);
        while (++idx < len) {
            result[idx] = fn(list[idx]);
        }
        return result;
    };

    var _multiply = function _multiply(a, b) {
        return a * b;
    };

    var _noArgsException = function _noArgsException() {
        return new TypeError('Function called with no arguments');
    };

    var _nth = function _nth(n, list) {
        return n < 0 ? list[list.length + n] : list[n];
    };

    var _pCompose = function _pCompose(f, g) {
        return function () {
            var context = this;
            var value = g.apply(this, arguments);
            if (_isThenable(value)) {
                return value.then(function (result) {
                    return f.call(context, result);
                });
            } else {
                return f.call(this, value);
            }
        };
    };

    var _pairWith = function _pairWith(fn) {
        return function (obj) {
            return _map(function (key) {
                return [
                    key,
                    obj[key]
                ];
            }, fn(obj));
        };
    };

    var _path = function _path(paths, obj) {
        var idx = -1, length = paths.length, val;
        if (obj == null) {
            return;
        }
        val = obj;
        while (val != null && ++idx < length) {
            val = val[paths[idx]];
        }
        return val;
    };

    var _pickAll = function _pickAll(names, obj) {
        var copy = {};
        _forEach(function (name) {
            copy[name] = obj[name];
        }, names);
        return copy;
    };

    var _prepend = function _prepend(el, list) {
        return _concat([el], list);
    };

    var _satisfiesSpec = function _satisfiesSpec(spec, parsedSpec, testObj) {
        if (spec === testObj) {
            return true;
        }
        if (testObj == null) {
            return false;
        }
        parsedSpec.fn = parsedSpec.fn || [];
        parsedSpec.obj = parsedSpec.obj || [];
        var key, val, idx = -1, fnLen = parsedSpec.fn.length, j = -1, objLen = parsedSpec.obj.length;
        while (++idx < fnLen) {
            key = parsedSpec.fn[idx];
            val = spec[key];
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
    };

    var _slice = function _slice(args, from, to) {
        switch (arguments.length) {
        case 0:
            throw _noArgsException();
        case 1:
            return _slice(args, 0, args.length);
        case 2:
            return _slice(args, from, args.length);
        default:
            var length = Math.max(0, to - from), list = new Array(length), idx = -1;
            while (++idx < length) {
                list[idx] = args[from + idx];
            }
            return list;
        }
    };

    var always = function always(val) {
        return function () {
            return val;
        };
    };

    var arity = function (n, fn) {
        switch (n) {
        case 0:
            return function () {
                return fn.apply(this, arguments);
            };
        case 1:
            return function (a0) {
                void a0;
                return fn.apply(this, arguments);
            };
        case 2:
            return function (a0, a1) {
                void a1;
                return fn.apply(this, arguments);
            };
        case 3:
            return function (a0, a1, a2) {
                void a2;
                return fn.apply(this, arguments);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                void a3;
                return fn.apply(this, arguments);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                void a4;
                return fn.apply(this, arguments);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                void a5;
                return fn.apply(this, arguments);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                void a6;
                return fn.apply(this, arguments);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                void a7;
                return fn.apply(this, arguments);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                void a8;
                return fn.apply(this, arguments);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                void a9;
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to arity must be a non-negative integer no greater than ten');
        }
    };

    var call = function call(fn) {
        return fn.apply(this, _slice(arguments, 1));
    };

    var comparator = function comparator(pred) {
        return function (a, b) {
            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
    };

    var cond = function cond() {
        var pairs = arguments;
        return function () {
            var idx = -1;
            while (++idx < pairs.length) {
                if (pairs[idx][0].apply(this, arguments)) {
                    return pairs[idx][1].apply(this, arguments);
                }
            }
        };
    };

    var converge = function (after) {
        var fns = _slice(arguments, 1);
        return function () {
            var args = arguments;
            return after.apply(this, _map(function (fn) {
                return fn.apply(this, args);
            }, fns));
        };
    };

    var flip = function flip(fn) {
        return function (a, b) {
            switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return function (b) {
                    return fn.apply(this, [
                        b,
                        a
                    ].concat(_slice(arguments, 1)));
                };
            default:
                return fn.apply(this, _concat([
                    b,
                    a
                ], _slice(arguments, 2)));
            }
        };
    };

    var fromPairs = function fromPairs(pairs) {
        var idx = -1, len = pairs.length, out = {};
        while (++idx < len) {
            if (_isArray(pairs[idx]) && pairs[idx].length) {
                out[pairs[idx][0]] = pairs[idx][1];
            }
        }
        return out;
    };

    var func = function func(funcName, obj) {
        switch (arguments.length) {
        case 0:
            throw _noArgsException();
        case 1:
            return function (obj) {
                return obj[funcName].apply(obj, _slice(arguments, 1));
            };
        default:
            return obj[funcName].apply(obj, _slice(arguments, 2));
        }
    };

    var identity = function identity(x) {
        return x;
    };

    var isArrayLike = function isArrayLike(x) {
        if (_isArray(x)) {
            return true;
        }
        if (!x) {
            return false;
        }
        if (typeof x !== 'object') {
            return false;
        }
        if (x instanceof String) {
            return false;
        }
        if (x.nodeType === 1) {
            return !!x.length;
        }
        if (x.length === 0) {
            return true;
        }
        if (x.length > 0) {
            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
    };

    var isEmpty = function isEmpty(list) {
        return Object(list).length === 0;
    };

    var isNil = function isNil(x) {
        return x == null;
    };

    var isSet = function isSet(list) {
        var len = list.length;
        var idx = -1;
        while (++idx < len) {
            if (_indexOf(list, list[idx], idx + 1) >= 0) {
                return false;
            }
        }
        return true;
    };

    var keysIn = function keysIn(obj) {
        var prop, ks = [];
        for (prop in obj) {
            ks[ks.length] = prop;
        }
        return ks;
    };

    var memoize = function memoize(fn) {
        var cache = {};
        return function () {
            if (!arguments.length) {
                return;
            }
            var position = _foldl(function (cache, arg) {
                return cache[arg] || (cache[arg] = {});
            }, cache, _slice(arguments, 0, arguments.length - 1));
            var arg = arguments[arguments.length - 1];
            return position[arg] || (position[arg] = fn.apply(this, arguments));
        };
    };

    var nAry = function (n, fn) {
        switch (n) {
        case 0:
            return function () {
                return fn.call(this);
            };
        case 1:
            return function (a0) {
                return fn.call(this, a0);
            };
        case 2:
            return function (a0, a1) {
                return fn.call(this, a0, a1);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.call(this, a0, a1, a2);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.call(this, a0, a1, a2, a3);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.call(this, a0, a1, a2, a3, a4);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.call(this, a0, a1, a2, a3, a4, a5);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            };
        default:
            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
        }
    };

    var not = function not(f) {
        return function () {
            return !f.apply(this, arguments);
        };
    };

    var nthArg = function nthArg(n) {
        return function () {
            return _nth(n, arguments);
        };
    };

    var once = function once(fn) {
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

    var prependTo = flip(_prepend);

    var prop = function prop(p, obj) {
        switch (arguments.length) {
        case 0:
            throw _noArgsException();
        case 1:
            return function _prop(obj) {
                return obj[p];
            };
        }
        return obj[p];
    };

    var propOf = flip(prop);

    var reverse = function reverse(list) {
        return _slice(list).reverse();
    };

    var toPairsIn = _pairWith(keysIn);

    var trim = function () {
        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
        var zeroWidth = '\u200B';
        var hasProtoTrim = typeof String.prototype.trim === 'function';
        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
            return function trim(str) {
                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
                return str.replace(beginRx, '').replace(endRx, '');
            };
        } else {
            return function trim(str) {
                return str.trim();
            };
        }
    }();

    var type = function type(val) {
        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
    };

    var unapply = function unapply(fn) {
        if (arguments.length === 0) {
            throw _noArgsException();
        }
        return function () {
            return fn(_slice(arguments));
        };
    };

    var unary = function unary(fn) {
        return nAry(1, fn);
    };

    var valuesIn = function valuesIn(obj) {
        var prop, vs = [];
        for (prop in obj) {
            vs[vs.length] = obj[prop];
        }
        return vs;
    };

    var wrap = function wrap(fn, wrapper) {
        return arity(fn.length, function () {
            return wrapper.apply(this, _concat([fn], arguments));
        });
    };

    var F = always(false);

    var I = identity;

    var T = always(true);

    var _append = function _append(el, list) {
        return _concat(list, [el]);
    };

    var _baseCopy = function _baseCopy(value, refFrom, refTo) {
        var copy = function copy(copiedValue) {
            var len = refFrom.length;
            var idx = -1;
            while (++idx < len) {
                if (value === refFrom[idx]) {
                    return refTo[idx];
                }
            }
            refFrom[refFrom.length] = value;
            refTo[refTo.length] = copiedValue;
            for (var key in value) {
                copiedValue[key] = _baseCopy(value[key], refFrom, refTo);
            }
            return copiedValue;
        };
        switch (type(value)) {
        case 'Object':
            return copy({});
        case 'Array':
            return copy([]);
        case 'Date':
            return new Date(value);
        default:
            return value;
        }
    };

    var _checkForMethod = function _checkForMethod(methodname, fn) {
        return function (a, b, c) {
            var length = arguments.length;
            var obj = arguments[length - 1], callBound = obj && !_isArray(obj) && typeof obj[methodname] === 'function';
            switch (arguments.length) {
            case 0:
                return fn();
            case 1:
                return callBound ? obj[methodname]() : fn(a);
            case 2:
                return callBound ? obj[methodname](a) : fn(a, b);
            case 3:
                return callBound ? obj[methodname](a, b) : fn(a, b, c);
            }
        };
    };

    var _compareKeys = comparator(function (a, b) {
        return a.key < b.key;
    });

    var _contains = function _contains(a, list) {
        return _indexOf(list, a) >= 0;
    };

    var _createComposer = function _createComposer(composeFunction) {
        return function () {
            switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return arguments[0];
            default:
                var idx = arguments.length - 1, fn = arguments[idx], length = fn.length;
                while (idx--) {
                    fn = composeFunction(arguments[idx], fn);
                }
                return arity(length, fn);
            }
        };
    };

    var _createMaxMin = function _createMaxMin(comparator, initialVal) {
        return function (list) {
            if (arguments.length === 0) {
                throw _noArgsException();
            }
            var idx = -1, winner = initialVal, computed;
            while (++idx < list.length) {
                computed = +list[idx];
                if (comparator(computed, winner)) {
                    winner = computed;
                }
            }
            return winner;
        };
    };

    var _createPartialApplicator = function _createPartialApplicator(concat) {
        return function (fn) {
            var args = _slice(arguments, 1);
            return arity(Math.max(0, fn.length - args.length), function () {
                return fn.apply(this, concat(args, arguments));
            });
        };
    };

    var _curry2 = function _curry2(fn) {
        return function (a, b) {
            switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return function (b) {
                    return fn(a, b);
                };
            default:
                return fn(a, b);
            }
        };
    };

    var _curry3 = function _curry3(fn) {
        return function (a, b, c) {
            switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            case 2:
                return function (c) {
                    return fn(a, b, c);
                };
            default:
                return fn(a, b, c);
            }
        };
    };

    var _hasMethod = function _hasMethod(methodName, obj) {
        return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
    };

    var _keyValue = function _keyValue(fn, list) {
        return _map(function (item) {
            return {
                key: fn(item),
                val: item
            };
        }, list);
    };

    var _makeFlat = function _makeFlat(recursive) {
        return function flatt(list) {
            var value, result = [], idx = -1, j, ilen = list.length, jlen;
            while (++idx < ilen) {
                if (isArrayLike(list[idx])) {
                    value = recursive ? flatt(list[idx]) : list[idx];
                    j = -1;
                    jlen = value.length;
                    while (++j < jlen) {
                        result[result.length] = value[j];
                    }
                } else {
                    result[result.length] = list[idx];
                }
            }
            return result;
        };
    };

    var _pickBy = function _pickBy(test, obj) {
        var copy = {};
        var prop;
        var props = keysIn(obj);
        var len = props.length;
        var idx = -1;
        while (++idx < len) {
            prop = props[idx];
            if (test(obj[prop], prop, obj)) {
                copy[prop] = obj[prop];
            }
        }
        return copy;
    };

    var _pluck = function _pluck(p, list) {
        return _map(prop(p), list);
    };

    var add = _curry2(_add);

    var all = _curry2(_all);

    var and = _curry2(function and(f, g) {
        return function _and() {
            return f.apply(this, arguments) && g.apply(this, arguments);
        };
    });

    var any = _curry2(_any);

    var append = _curry2(_append);

    var appendTo = flip(_append);

    var apply = _curry2(function apply(fn, args) {
        return fn.apply(this, args);
    });

    var binary = function binary(fn) {
        return nAry(2, fn);
    };

    var bind = _curry2(function bind(fn, thisObj) {
        return function () {
            return fn.apply(thisObj, arguments);
        };
    });

    var clone = function clone(value) {
        return _baseCopy(value, [], []);
    };

    var compose = _createComposer(_compose);

    var containsWith = _curry3(_containsWith);

    var countBy = _curry2(function countBy(fn, list) {
        return _foldl(function (counts, obj) {
            counts[obj.key] = (counts[obj.key] || 0) + 1;
            return counts;
        }, {}, _keyValue(fn, list));
    });

    var createMapEntry = _curry2(function (key, val) {
        var obj = {};
        obj[key] = val;
        return obj;
    });

    var curryN = _curry2(function curryN(length, fn) {
        return function recurry(args) {
            return arity(Math.max(length - (args && args.length || 0), 0), function () {
                if (arguments.length === 0) {
                    throw _noArgsException();
                }
                var newArgs = _concat(args, arguments);
                if (newArgs.length >= length) {
                    return fn.apply(this, newArgs);
                } else {
                    return recurry(newArgs);
                }
            });
        }([]);
    });

    var dec = add(-1);

    var difference = _curry2(function difference(first, second) {
        var out = [];
        var idx = -1;
        var firstLen = first.length;
        while (++idx < firstLen) {
            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
                out[out.length] = first[idx];
            }
        }
        return out;
    });

    var differenceWith = _curry3(function differenceWith(pred, first, second) {
        var out = [];
        var idx = -1;
        var firstLen = first.length;
        var containsPred = containsWith(pred);
        while (++idx < firstLen) {
            if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
                out[out.length] = first[idx];
            }
        }
        return out;
    });

    var drop = _curry2(_checkForMethod('drop', function drop(n, list) {
        return n < list.length ? _slice(list, n) : [];
    }));

    var dropWhile = _curry2(function dropWhile(pred, list) {
        var idx = -1, len = list.length;
        while (++idx < len && pred(list[idx])) {
        }
        return _slice(list, idx);
    });

    var empty = function empty(x) {
        return _hasMethod('empty', x) ? x.empty() : [];
    };

    var eq = _curry2(function eq(a, b) {
        return a === b;
    });

    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
        return obj1[prop] === obj2[prop];
    });

    var filter = _curry2(_checkForMethod('filter', _filter));

    var filterIndexed = _curry2(_filterIndexed);

    var find = _curry2(function find(fn, list) {
        var idx = -1;
        var len = list.length;
        while (++idx < len) {
            if (fn(list[idx])) {
                return list[idx];
            }
        }
    });

    var findIndex = _curry2(function findIndex(fn, list) {
        var idx = -1;
        var len = list.length;
        while (++idx < len) {
            if (fn(list[idx])) {
                return idx;
            }
        }
        return -1;
    });

    var findLast = _curry2(function findLast(fn, list) {
        var idx = list.length;
        while (idx--) {
            if (fn(list[idx])) {
                return list[idx];
            }
        }
    });

    var findLastIndex = _curry2(function findLastIndex(fn, list) {
        var idx = list.length;
        while (idx--) {
            if (fn(list[idx])) {
                return idx;
            }
        }
        return -1;
    });

    var flatten = _makeFlat(true);

    var foldl = _curry3(_foldl);

    var foldlIndexed = _curry3(function foldlIndexed(fn, acc, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            acc = fn(acc, list[idx], idx, list);
        }
        return acc;
    });

    var foldr = _curry3(function foldr(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
            acc = fn(acc, list[idx]);
        }
        return acc;
    });

    var foldrIndexed = _curry3(function foldrIndexed(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
            acc = fn(acc, list[idx], idx, list);
        }
        return acc;
    });

    var forEach = _curry2(_forEach);

    var forEachIndexed = _curry2(function forEachIndexed(fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            fn(list[idx], idx, list);
        }
        return list;
    });

    var functionsIn = _functionsWith(keysIn);

    var get = prop;

    var groupBy = _curry2(function groupBy(fn, list) {
        return _foldl(function (acc, elt) {
            var key = fn(elt);
            acc[key] = _append(elt, acc[key] || (acc[key] = []));
            return acc;
        }, {}, list);
    });

    var has = _curry2(function (prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    });

    var hasIn = _curry2(function (prop, obj) {
        return prop in obj;
    });

    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
        return function _ifElse() {
            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
        };
    });

    var inc = add(1);

    var indexOf = _curry2(function indexOf(target, list) {
        return _indexOf(list, target);
    });

    var insert = _curry3(function insert(idx, elt, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_append(elt, _slice(list, 0, idx)), _slice(list, idx));
    });

    var insertAll = _curry3(function insertAll(idx, elts, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
    });

    var invoker = function invoker(arity, method) {
        var initialArgs = _slice(arguments, 2);
        var len = arity - initialArgs.length;
        return curryN(len + 1, function () {
            var target = arguments[len];
            var args = initialArgs.concat(_slice(arguments, 0, len));
            return target[method].apply(target, args);
        });
    };

    var is = _curry2(function is(Ctor, val) {
        return val != null && val.constructor === Ctor || val instanceof Ctor;
    });

    var join = invoker(1, 'join');

    var keys = function () {
        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
        var nonEnumerableProps = [
            'constructor',
            'valueOf',
            'isPrototypeOf',
            'toString',
            'propertyIsEnumerable',
            'hasOwnProperty',
            'toLocaleString'
        ];
        return function keys(obj) {
            if (Object(obj) !== obj) {
                return [];
            }
            if (Object.keys) {
                return Object.keys(obj);
            }
            var prop, ks = [], nIdx;
            for (prop in obj) {
                if (has(prop, obj)) {
                    ks[ks.length] = prop;
                }
            }
            if (hasEnumBug) {
                nIdx = nonEnumerableProps.length;
                while (nIdx--) {
                    prop = nonEnumerableProps[nIdx];
                    if (has(prop, obj) && !_contains(prop, ks)) {
                        ks[ks.length] = prop;
                    }
                }
            }
            return ks;
        };
    }();

    var lPartial = _createPartialApplicator(_concat);

    var lastIndexOf = _curry2(function lastIndexOf(target, list) {
        return _lastIndexOf(list, target);
    });

    var length = function length(list) {
        return list != null && is(Number, list.length) ? list.length : NaN;
    };

    var lens = _curry2(function lens(get, set) {
        var lns = function (a) {
            return get(a);
        };
        lns.set = set;
        lns.map = function (fn, a) {
            return set(fn(get(a)), a);
        };
        return lns;
    });

    var map = _curry2(_checkForMethod('map', _map));

    var mapAccumL = _curry3(function mapAccumL(fn, acc, list) {
        var idx = -1, len = list.length, result = new Array(len), tuple = [acc];
        while (++idx < len) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
        }
        return [
            tuple[0],
            result
        ];
    });

    var mapAccumR = _curry3(function mapAccumR(fn, acc, list) {
        var idx = list.length, len = list.length, result = new Array(len), tuple = [acc];
        while (idx--) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
        }
        return [
            tuple[0],
            result
        ];
    });

    var mapIndexed = _curry2(function mapIndexed(fn, list) {
        var idx = -1, len = list.length, result = new Array(len);
        while (++idx < len) {
            result[idx] = fn(list[idx], idx, list);
        }
        return result;
    });

    var mapObj = _curry2(function mapObject(fn, obj) {
        return _foldl(function (acc, key) {
            acc[key] = fn(obj[key]);
            return acc;
        }, {}, keys(obj));
    });

    var mapObjIndexed = _curry2(function mapObjectIndexed(fn, obj) {
        return _foldl(function (acc, key) {
            acc[key] = fn(obj[key], key, obj);
            return acc;
        }, {}, keys(obj));
    });

    var match = invoker(1, 'match');

    var max = _createMaxMin(_gt, -Infinity);

    var maxBy = _curry2(_createMaxMinBy(_gt));

    var min = _createMaxMin(_lt, Infinity);

    var minBy = _curry2(_createMaxMinBy(_lt));

    var multiply = _curry2(_multiply);

    var negate = multiply(-1);

    var nth = _curry2(_nth);

    var of = function of(x, container) {
        return _hasMethod('of', container) ? container.of(x) : [x];
    };

    var omit = _curry2(function omit(names, obj) {
        return _pickBy(function (val, key) {
            return !_contains(key, names);
        }, obj);
    });

    var or = _curry2(function or(f, g) {
        return function _or() {
            return f.apply(this, arguments) || g.apply(this, arguments);
        };
    });

    var pCompose = _createComposer(_pCompose);

    var pPipe = function pPipe() {
        return pCompose.apply(this, reverse(arguments));
    };

    var partition = _curry2(function partition(pred, list) {
        return _foldl(function (acc, elt) {
            acc[pred(elt) ? 0 : 1].push(elt);
            return acc;
        }, [
            [],
            []
        ], list);
    });

    var pathEq = _curry3(function (path, val, obj) {
        return _path(path.split('.'), obj) === val;
    });

    var pathOn = _curry3(function pathOn(sep, str, obj) {
        return _path(str.split(sep), obj);
    });

    var pick = _curry2(function pick(names, obj) {
        return _pickBy(function (val, key) {
            return _contains(key, names);
        }, obj);
    });

    var pickAll = _curry2(_pickAll);

    var pickBy = _curry2(_pickBy);

    var pipe = function pipe() {
        return compose.apply(this, reverse(arguments));
    };

    var pluck = _curry2(_pluck);

    var prepend = _curry2(_prepend);

    var product = foldl(_multiply, 1);

    var propEq = _curry3(function propEq(name, val, obj) {
        return obj[name] === val;
    });

    var propOr = _curry3(function propOr(val, p, obj) {
        return has(p, obj) ? obj[p] : val;
    });

    var props = _curry2(function props(ps, obj) {
        var len = ps.length, out = new Array(len), idx = -1;
        while (++idx < len) {
            out[idx] = obj[ps[idx]];
        }
        return out;
    });

    var rPartial = _createPartialApplicator(flip(_concat));

    var range = _curry2(function range(from, to) {
        if (from >= to) {
            return [];
        }
        var idx = 0, result = new Array(Math.floor(to) - Math.ceil(from));
        while (from < to) {
            result[idx++] = from++;
        }
        return result;
    });

    var reject = _curry2(function reject(fn, list) {
        return _filter(not(fn), list);
    });

    var rejectIndexed = _curry2(function rejectIndexed(fn, list) {
        return _filterIndexed(not(fn), list);
    });

    var remove = _curry3(function remove(start, count, list) {
        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
    });

    var replace = _curry3(function replace(regex, replacement, str) {
        return str.replace(regex, replacement);
    });

    var scanl = _curry3(function scanl(fn, acc, list) {
        var idx = 0, len = list.length + 1, result = new Array(len);
        result[idx] = acc;
        while (++idx < len) {
            acc = fn(acc, list[idx - 1]);
            result[idx] = acc;
        }
        return result;
    });

    var slice = invoker(2, 'slice');

    var sort = _curry2(function sort(comparator, list) {
        return clone(list).sort(comparator);
    });

    var sortBy = _curry2(function sortBy(fn, list) {
        return _pluck('val', _keyValue(fn, list).sort(_compareKeys));
    });

    var split = invoker(1, 'split');

    var strIndexOf = _curry2(function strIndexOf(c, str) {
        return str.indexOf(c);
    });

    var strLastIndexOf = _curry2(function (c, str) {
        return str.lastIndexOf(c);
    });

    var substring = invoker(2, 'substring');

    var substringFrom = flip(substring)(void 0);

    var substringTo = substring(0);

    var sum = foldl(_add, 0);

    var tail = _checkForMethod('tail', function (list) {
        return _slice(list, 1);
    });

    var take = _curry2(_checkForMethod('take', function (n, list) {
        return _slice(list, 0, Math.min(n, list.length));
    }));

    var takeWhile = _curry2(_checkForMethod('takeWhile', function (fn, list) {
        var idx = -1, len = list.length;
        while (++idx < len && fn(list[idx])) {
        }
        return _slice(list, 0, idx);
    }));

    var tap = _curry2(function tap(fn, x) {
        fn(x);
        return x;
    });

    var times = _curry2(function times(fn, n) {
        var list = new Array(Number(n));
        var len = list.length;
        var idx = -1;
        while (++idx < len) {
            list[idx] = fn(idx);
        }
        return list;
    });

    var toLower = invoker(0, 'toLowerCase');

    var toPairs = _pairWith(keys);

    var toUpper = invoker(0, 'toUpperCase');

    var unfoldr = _curry2(function unfoldr(fn, seed) {
        var pair = fn(seed);
        var result = [];
        while (pair && pair.length) {
            result[result.length] = pair[0];
            pair = fn(pair[1]);
        }
        return result;
    });

    var uniq = function uniq(list) {
        var idx = -1, len = list.length;
        var result = [], item;
        while (++idx < len) {
            item = list[idx];
            if (!_contains(item, result)) {
                result[result.length] = item;
            }
        }
        return result;
    };

    var uniqWith = _curry2(function uniqWith(pred, list) {
        var idx = -1, len = list.length;
        var result = [], item;
        while (++idx < len) {
            item = list[idx];
            if (!_containsWith(pred, item, result)) {
                result[result.length] = item;
            }
        }
        return result;
    });

    var unnest = _makeFlat(false);

    var values = function values(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = new Array(len);
        var idx = -1;
        while (++idx < len) {
            vals[idx] = obj[props[idx]];
        }
        return vals;
    };

    var where = function where(spec, testObj) {
        var parsedSpec = groupBy(function (key) {
            return typeof spec[key] === 'function' ? 'fn' : 'obj';
        }, keys(spec));
        switch (arguments.length) {
        case 0:
            throw _noArgsException();
        case 1:
            return function (testObj) {
                return _satisfiesSpec(spec, parsedSpec, testObj);
            };
        }
        return _satisfiesSpec(spec, parsedSpec, testObj);
    };

    var xprod = _curry2(function xprod(a, b) {
        var idx = -1;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        var result = [];
        while (++idx < ilen) {
            j = -1;
            while (++j < jlen) {
                result[result.length] = [
                    a[idx],
                    b[j]
                ];
            }
        }
        return result;
    });

    var zip = _curry2(function zip(a, b) {
        var rv = [];
        var idx = -1;
        var len = Math.min(a.length, b.length);
        while (++idx < len) {
            rv[idx] = [
                a[idx],
                b[idx]
            ];
        }
        return rv;
    });

    var zipObj = _curry2(function zipObj(keys, values) {
        var idx = -1, len = keys.length, out = {};
        while (++idx < len) {
            out[keys[idx]] = values[idx];
        }
        return out;
    });

    var zipWith = _curry3(function zipWith(fn, a, b) {
        var rv = [], idx = -1, len = Math.min(a.length, b.length);
        while (++idx < len) {
            rv[idx] = fn(a[idx], b[idx]);
        }
        return rv;
    });

    var _ap = function _ap(fns, vs) {
        return _hasMethod('ap', fns) ? fns.ap(vs) : _foldl(function (acc, fn) {
            return _concat(acc, _map(fn, vs));
        }, [], fns);
    };

    var _extend = function _extend(destination, other) {
        var props = keys(other), idx = -1, length = props.length;
        while (++idx < length) {
            destination[props[idx]] = other[props[idx]];
        }
        return destination;
    };

    var _predicateWrap = function _predicateWrap(predPicker) {
        return function (preds) {
            var predIterator = function () {
                var args = arguments;
                return predPicker(function (predicate) {
                    return predicate.apply(null, args);
                }, preds);
            };
            return arguments.length > 1 ? predIterator.apply(null, _slice(arguments, 1)) : arity(max(_pluck('length', preds)), predIterator);
        };
    };

    var allPass = _predicateWrap(_all);

    var anyPass = _predicateWrap(_any);

    var ap = _curry2(_ap);

    var assoc = _curry3(function (prop, val, obj) {
        return _extend(fromPairs(_map(function (key) {
            return [
                key,
                obj[key]
            ];
        }, keysIn(obj))), createMapEntry(prop, val));
    });

    var assocPath = function () {
        var setParts = function (parts, val, obj) {
            if (parts.length === 1) {
                return assoc(parts[0], val, obj);
            }
            var current = obj[parts[0]];
            return assoc(parts[0], setParts(_slice(parts, 1), val, is(Object, current) ? current : {}), obj);
        };
        return function (path, val, obj) {
            var length = arguments.length;
            if (length === 0) {
                throw _noArgsException();
            }
            var parts = split('.', path);
            var fn = _curry2(function (val, obj) {
                return setParts(parts, val, obj);
            });
            switch (length) {
            case 1:
                return fn;
            case 2:
                return fn(val);
            default:
                return fn(val, obj);
            }
        };
    }();

    var chain = _curry2(_checkForMethod('chain', function chain(f, list) {
        return unnest(_map(f, list));
    }));

    var charAt = invoker(1, 'charAt');

    var charCodeAt = invoker(1, 'charCodeAt');

    var commuteMap = _curry3(function commuteMap(fn, of, list) {
        function consF(acc, ftor) {
            return _ap(_map(append, fn(ftor)), acc);
        }
        return _foldl(consF, of([]), list);
    });

    var curry = function curry(fn) {
        return curryN(fn.length, fn);
    };

    var evolve = _curry2(function evolve(transformations, object) {
        return _extend(_extend({}, object), mapObjIndexed(function (fn, key) {
            return fn(object[key]);
        }, transformations));
    });

    var functions = _functionsWith(keys);

    var head = nth(0);

    var init = slice(0, -1);

    var installTo = function (obj) {
        return _extend(obj, R);
    };

    var intersection = _curry2(function intersection(list1, list2) {
        return uniq(_filter(flip(_contains)(list1), list2));
    });

    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
        var results = [], idx = -1;
        while (++idx < list1.length) {
            if (_containsWith(pred, list1[idx], list2)) {
                results[results.length] = list1[idx];
            }
        }
        return uniqWith(pred, results);
    });

    var invert = function invert(obj) {
        var props = keys(obj), len = props.length, idx = -1, out = {};
        while (++idx < len) {
            var key = props[idx], val = obj[key];
            out[val] = out[val] || [];
            out[val].push(key);
        }
        return out;
    };

    var invertObj = function invertObj(obj) {
        var props = keys(obj), len = props.length, idx = -1, out = {};
        while (++idx < len) {
            var key = props[idx];
            out[obj[key]] = key;
        }
        return out;
    };

    var last = nth(-1);

    var liftN = _curry2(function liftN(arity, fn) {
        var lifted = curryN(arity, fn);
        if (arguments.length === 0) {
            throw _noArgsException();
        }
        return curryN(arity, function () {
            return _foldl(_ap, _map(lifted, arguments[0]), _slice(arguments, 1));
        });
    });

    var mixin = _curry2(function mixin(a, b) {
        return _extend(_extend({}, a), b);
    });

    var op = function op(fn) {
        var length = fn.length;
        if (length !== 2) {
            throw new Error('Expected binary function.');
        }
        return function _op(a, b) {
            switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return a === __ ? binary(flip(_op)) : unary(lPartial(fn, a));
            default:
                return a === __ ? unary(rPartial(fn, b)) : fn(a, b);
            }
        };
    };

    var path = pathOn('.');

    var repeat = _curry2(function repeat(value, n) {
        return times(always(value), n);
    });

    var subtract = op(function subtract(a, b) {
        return a - b;
    });

    var union = _curry2(compose(uniq, _concat));

    var unionWith = _curry3(function unionWith(pred, list1, list2) {
        return uniqWith(pred, _concat(list1, list2));
    });

    var useWith = function useWith(fn) {
        var transformers = _slice(arguments, 1);
        var tlen = transformers.length;
        return curry(arity(tlen, function () {
            var args = [], idx = -1;
            while (++idx < tlen) {
                args[args.length] = transformers[idx](arguments[idx]);
            }
            return fn.apply(this, args.concat(_slice(arguments, tlen)));
        }));
    };

    var commute = commuteMap(map(identity));

    var concat = op(function (set1, set2) {
        if (_isArray(set2)) {
            return _concat(set1, set2);
        } else if (_hasMethod('concat', set1)) {
            return set1.concat(set2);
        } else {
            throw new TypeError('can\'t concat ' + typeof set1);
        }
    });

    var constructN = _curry2(function constructN(n, Fn) {
        var f = function () {
            var Temp = function () {
                }, inst, ret;
            Temp.prototype = Fn.prototype;
            inst = new Temp();
            ret = Fn.apply(inst, arguments);
            return Object(ret) === ret ? ret : inst;
        };
        return n > 1 ? curry(nAry(n, f)) : f;
    });

    var contains = op(_contains);

    var divide = op(function divide(a, b) {
        return a / b;
    });

    var gt = op(_gt);

    var gte = op(function gte(a, b) {
        return a >= b;
    });

    var lift = function lift(fn) {
        if (arguments.length === 0) {
            throw _noArgsException();
        }
        return liftN(fn.length, fn);
    };

    var lt = op(_lt);

    var lte = op(function lte(a, b) {
        return a <= b;
    });

    var mathMod = op(function mathMod(m, p) {
        if (!_isInteger(m)) {
            return NaN;
        }
        if (!_isInteger(p) || p < 1) {
            return NaN;
        }
        return (m % p + p) % p;
    });

    var modulo = op(function modulo(a, b) {
        return a % b;
    });

    var project = useWith(_map, pickAll, identity);

    var construct = function construct(Fn) {
        return constructN(Fn.length, Fn);
    };

    var R = {
        F: F,
        I: I,
        T: T,
        __: __,
        add: add,
        all: all,
        allPass: allPass,
        always: always,
        and: and,
        any: any,
        anyPass: anyPass,
        ap: ap,
        append: append,
        appendTo: appendTo,
        apply: apply,
        arity: arity,
        assoc: assoc,
        assocPath: assocPath,
        binary: binary,
        bind: bind,
        call: call,
        chain: chain,
        charAt: charAt,
        charCodeAt: charCodeAt,
        clone: clone,
        commute: commute,
        commuteMap: commuteMap,
        comparator: comparator,
        compose: compose,
        concat: concat,
        cond: cond,
        construct: construct,
        constructN: constructN,
        contains: contains,
        containsWith: containsWith,
        converge: converge,
        countBy: countBy,
        createMapEntry: createMapEntry,
        curry: curry,
        curryN: curryN,
        dec: dec,
        difference: difference,
        differenceWith: differenceWith,
        divide: divide,
        drop: drop,
        dropWhile: dropWhile,
        empty: empty,
        eq: eq,
        eqProps: eqProps,
        evolve: evolve,
        filter: filter,
        filterIndexed: filterIndexed,
        find: find,
        findIndex: findIndex,
        findLast: findLast,
        findLastIndex: findLastIndex,
        flatten: flatten,
        flip: flip,
        foldl: foldl,
        foldlIndexed: foldlIndexed,
        foldr: foldr,
        foldrIndexed: foldrIndexed,
        forEach: forEach,
        forEachIndexed: forEachIndexed,
        fromPairs: fromPairs,
        func: func,
        functions: functions,
        functionsIn: functionsIn,
        get: get,
        groupBy: groupBy,
        gt: gt,
        gte: gte,
        has: has,
        hasIn: hasIn,
        head: head,
        identity: identity,
        ifElse: ifElse,
        inc: inc,
        indexOf: indexOf,
        init: init,
        insert: insert,
        insertAll: insertAll,
        installTo: installTo,
        intersection: intersection,
        intersectionWith: intersectionWith,
        invert: invert,
        invertObj: invertObj,
        invoker: invoker,
        is: is,
        isArrayLike: isArrayLike,
        isEmpty: isEmpty,
        isNil: isNil,
        isSet: isSet,
        join: join,
        keys: keys,
        keysIn: keysIn,
        lPartial: lPartial,
        last: last,
        lastIndexOf: lastIndexOf,
        length: length,
        lens: lens,
        lift: lift,
        liftN: liftN,
        lt: lt,
        lte: lte,
        map: map,
        mapAccumL: mapAccumL,
        mapAccumR: mapAccumR,
        mapIndexed: mapIndexed,
        mapObj: mapObj,
        mapObjIndexed: mapObjIndexed,
        match: match,
        mathMod: mathMod,
        max: max,
        maxBy: maxBy,
        memoize: memoize,
        min: min,
        minBy: minBy,
        mixin: mixin,
        modulo: modulo,
        multiply: multiply,
        nAry: nAry,
        negate: negate,
        not: not,
        nth: nth,
        nthArg: nthArg,
        of: of,
        omit: omit,
        once: once,
        op: op,
        or: or,
        pCompose: pCompose,
        pPipe: pPipe,
        partition: partition,
        path: path,
        pathEq: pathEq,
        pathOn: pathOn,
        pick: pick,
        pickAll: pickAll,
        pickBy: pickBy,
        pipe: pipe,
        pluck: pluck,
        prepend: prepend,
        prependTo: prependTo,
        product: product,
        project: project,
        prop: prop,
        propEq: propEq,
        propOf: propOf,
        propOr: propOr,
        props: props,
        rPartial: rPartial,
        range: range,
        reject: reject,
        rejectIndexed: rejectIndexed,
        remove: remove,
        repeat: repeat,
        replace: replace,
        reverse: reverse,
        scanl: scanl,
        slice: slice,
        sort: sort,
        sortBy: sortBy,
        split: split,
        strIndexOf: strIndexOf,
        strLastIndexOf: strLastIndexOf,
        substring: substring,
        substringFrom: substringFrom,
        substringTo: substringTo,
        subtract: subtract,
        sum: sum,
        tail: tail,
        take: take,
        takeWhile: takeWhile,
        tap: tap,
        times: times,
        toLower: toLower,
        toPairs: toPairs,
        toPairsIn: toPairsIn,
        toUpper: toUpper,
        trim: trim,
        type: type,
        unapply: unapply,
        unary: unary,
        unfoldr: unfoldr,
        union: union,
        unionWith: unionWith,
        uniq: uniq,
        uniqWith: uniqWith,
        unnest: unnest,
        useWith: useWith,
        values: values,
        valuesIn: valuesIn,
        where: where,
        wrap: wrap,
        xprod: xprod,
        zip: zip,
        zipObj: zipObj,
        zipWith: zipWith
    };

    if (typeof exports === 'object') {
        module.exports = R;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return R; });
    } else {
        this.R = R;
    }

}.call(this));
