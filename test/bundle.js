(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    var clone = function clone(list) {
        return _slice(list);
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

    var cloneDeep = function cloneDeep(value) {
        return _baseCopy(value, [], []);
    };

    var compose = _createComposer(_compose);

    var concat = _curry2(function (set1, set2) {
        if (_isArray(set2)) {
            return _concat(set1, set2);
        } else if (_hasMethod('concat', set1)) {
            return set1.concat(set2);
        } else {
            throw new TypeError('can\'t concat ' + typeof set1);
        }
    });

    var contains = _curry2(_contains);

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

    var invokerN = function invokerN(arity, method) {
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

    var join = invokerN(1, 'join');

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

    var match = invokerN(1, 'match');

    var max = _createMaxMin(_gt, -Infinity);

    var maxBy = _curry2(_createMaxMinBy(_gt));

    var min = _createMaxMin(_lt, Infinity);

    var minBy = _curry2(_createMaxMinBy(_lt));

    var multiply = _curry2(_multiply);

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

    var propOr = _curry3(function propOr(p, val, obj) {
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

    var slice = invokerN(2, 'slice');

    var sort = _curry2(function sort(comparator, list) {
        return clone(list).sort(comparator);
    });

    var sortBy = _curry2(function sortBy(fn, list) {
        return _pluck('val', _keyValue(fn, list).sort(_compareKeys));
    });

    var split = invokerN(1, 'split');

    var strIndexOf = _curry2(function strIndexOf(c, str) {
        return str.indexOf(c);
    });

    var strLastIndexOf = _curry2(function (c, str) {
        return str.lastIndexOf(c);
    });

    var substring = invokerN(2, 'substring');

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

    var toLowerCase = invokerN(0, 'toLowerCase');

    var toPairs = _pairWith(keys);

    var toUpperCase = invokerN(0, 'toUpperCase');

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

    var charAt = invokerN(1, 'charAt');

    var charCodeAt = invokerN(1, 'charCodeAt');

    var cloneObj = function (obj) {
        return _extend({}, obj);
    };

    var commuteMap = _curry3(function commuteMap(fn, of, list) {
        function consF(acc, ftor) {
            return _ap(_map(append, fn(ftor)), acc);
        }
        return _foldl(consF, of([]), list);
    });

    var curry = function curry(fn) {
        return curryN(fn.length, fn);
    };

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
        cloneDeep: cloneDeep,
        cloneObj: cloneObj,
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
        difference: difference,
        differenceWith: differenceWith,
        divide: divide,
        drop: drop,
        dropWhile: dropWhile,
        empty: empty,
        eq: eq,
        eqProps: eqProps,
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
        indexOf: indexOf,
        init: init,
        insert: insert,
        insertAll: insertAll,
        installTo: installTo,
        intersection: intersection,
        intersectionWith: intersectionWith,
        invert: invert,
        invertObj: invertObj,
        invokerN: invokerN,
        is: is,
        isArrayLike: isArrayLike,
        isEmpty: isEmpty,
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
        toLowerCase: toLowerCase,
        toPairs: toPairs,
        toPairsIn: toPairsIn,
        toUpperCase: toUpperCase,
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

},{}],2:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":6}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],6:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":5,"_process":4,"inherits":3}],7:[function(require,module,exports){
(function (process){
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof self !== "undefined") {
        self.Q = definition();

    } else {
        throw new Error("This environment was not anticiapted by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

}).call(this,require('_process'))
},{"_process":4}],8:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('F', function() {
    it('always returns false', function() {
        assert.strictEqual(R.F(), false);
        assert.strictEqual(R.F(10), false);
        assert.strictEqual(R.F(true), false);
    });
});

},{"..":1,"assert":2}],9:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('T', function() {
    it('always returns true', function() {
        assert.strictEqual(R.T(), true);
        assert.strictEqual(R.T(10), true);
        assert.strictEqual(R.T(true), true);
    });
});

},{"..":1,"assert":2}],10:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('add', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.add(3, 7), 10);
    });

    it('is automatically curried', function() {
        var incr = R.add(1);
        assert.strictEqual(incr(42), 43);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.add, TypeError);
    });
});

},{"..":1,"assert":2}],11:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('all', function() {
    var even = function(n) {return n % 2 === 0;};
    var T = function() {return true;};

    it('returns true if all elements satisfy the predicate', function() {
        assert.strictEqual(R.all(even, [2, 4, 6, 8, 10, 12]), true);
    });

    it('returns false if any element fails to satisfy the predicate', function() {
        assert.strictEqual(R.all(even, [2, 4, 6, 8, 9, 10]), false);
    });

    it('returns true for an empty list', function() {
        assert.strictEqual(R.all(T, []), true);
    });

    it('short-circuits on first false value', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        var result = R.all(test, [2, 4, 6, 7, 8, 10]);
        assert(!result);
        assert.strictEqual(count, 4);
    });

    it('works with more complex objects', function() {
        var xs = [{x: 'abc'}, {x: 'ade'}, {x: 'fghiajk'}];
        function len3(o) { return o.x.length === 3; }
        function hasA(o) { return o.x.indexOf('a') > -1; }
        assert.strictEqual(R.all(len3, xs), false);
        assert.strictEqual(R.all(hasA, xs), true);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        assert(R.all(test)([2, 4, 6, 7, 8, 10]) === false);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.all, TypeError);
    });
});

},{"..":1,"assert":2}],12:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('allPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var lt20 = function(n) {return n < 20;};
    var gt5 = function(n) {return n > 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether all predicates are satisfied by a given value', function() {
        var ok = R.allPass([odd, lt20, gt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(3), false);
        assert.strictEqual(ok(21), false);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.allPass([odd, gt5], 3), false);
        assert.strictEqual(R.allPass([odd, gt5], 7), true);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.allPass([odd, gt5, plusEq]).length, 4);
    });
});

},{"..":1,"assert":2}],13:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('always', function() {
    it('returns a function that returns the object initially supplied', function() {
        var theMeaning = R.always(42);
        assert.strictEqual(theMeaning(), 42);
        assert.strictEqual(theMeaning(10), 42);
        assert.strictEqual(theMeaning(false), 42);
    });

    it('works with various types', function() {
        assert.strictEqual(R.always(false)(), false);
        assert.strictEqual(R.always('abc')(), 'abc');
        assert.deepEqual(R.always({a: 1, b: 2})(), {a: 1, b: 2});
        var obj = {a: 1, b: 2};
        assert.strictEqual(R.always(obj)(), obj);
        var now = new Date(1776, 6, 4);
        assert.deepEqual(R.always(now)(), new Date(1776, 6, 4));
        assert.strictEqual(R.always()(), undefined);
    });
});

},{"..":1,"assert":2}],14:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('and', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.and(even, gt10);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), false);
        assert.strictEqual(f(14), true);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.and(between, total20);
        assert.strictEqual(f(4, 5, 11), true);
        assert.strictEqual(f(12, 2, 6), false);
        assert.strictEqual(f(5, 6, 15), false);
    });

    it('does not evaluate the second expression if the first one is false', function() {
        var F = function() { return false; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.and(F, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenAnd = R.and(even);
        assert.strictEqual(typeof evenAnd(gt10), 'function');
        assert.strictEqual(evenAnd(gt10)(11), false);
        assert.strictEqual(evenAnd(gt10)(12), true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.and, TypeError);
    });
});

},{"..":1,"assert":2}],15:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('any', function() {
    var odd = function(n) {return n % 2 === 1;};
    var T = function() {return true;};

    it('returns true if any element satisfies the predicate', function() {
        assert.strictEqual(R.any(odd, [2, 4, 6, 8, 10, 11, 12]), true);
    });

    it('returns false if all elements fails to satisfy the predicate', function() {
        assert.strictEqual(R.any(odd, [2, 4, 6, 8, 10, 12]), false);
    });

    it('works with more complex objects', function() {
        var people = [{first: 'Paul', last: 'Grenier'}, {first:'Mike', last: 'Hurley'}, {first: 'Will', last: 'Klein'}];
        var alliterative = function(person) {return person.first.charAt(0) === person.last.charAt(0);};
        assert.strictEqual(R.any(alliterative, people), false);
        people.push({first: 'Scott', last: 'Sauyet'});
        assert.strictEqual(R.any(alliterative, people), true);
    });

    it('can use a configurable function', function() {
        var teens = [{name: 'Alice', age: 14}, {name: 'Betty', age: 18}, {name: 'Cindy', age: 17}];
        var atLeast = function(age) {return function(person) {return person.age >= age;};};
        assert.strictEqual(R.any(atLeast(16), teens), true, 'Some can legally drive');
        assert.strictEqual(R.any(atLeast(21), teens), false, 'None can legally drink');
    });

    it('returns false for an empty list', function() {
        assert.strictEqual(R.any(T, []), false);
    });

    it('short-circuits on first true value', function() {
        var count = 0;
        var test = function(n) {count++; return odd(n);};
        var result = R.any(test, [2, 4, 6, 7, 8, 10]);
        assert(result);
        assert.strictEqual(count, 4);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return odd(n);};
        assert(R.any(test)([2, 4, 6, 7, 8, 10]) === true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.any, TypeError);
    });
});

},{"..":1,"assert":2}],16:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('anyPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var gt20 = function(n) {return n > 20;};
    var lt5 = function(n) {return n < 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether any predicates are satisfied by a given value', function() {
        var ok = R.anyPass([odd, gt20, lt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(18), false);
        assert.strictEqual(ok(3), true);
        assert.strictEqual(ok(22), true);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.anyPass([odd, lt5], 3), true);
        assert.strictEqual(R.anyPass([odd, lt5], 22), false);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.anyPass([odd, lt5, plusEq]).length, 4);
    });
});

},{"..":1,"assert":2}],17:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('ap', function() {
    function mult2(x) { return x * 2; }
    function plus3(x) { return x + 3; }

    it('applies a list of functions to a list of values', function() {
        assert.deepEqual(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });

    it('dispatches to the passed object\'s ap method when values is a non-Array object', function() {
        var obj = {ap: function(n) { return 'called ap with ' + n; }};
        assert.deepEqual(R.ap(obj, 10), obj.ap(10));
    });

    it('is curried', function() {
        var val = R.ap([mult2, plus3]);
        assert.strictEqual(typeof val, 'function');
        assert.deepEqual(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });
});

},{"..":1,"assert":2}],18:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('append', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
        assert.deepEqual(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.append(1, []), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.append(4), 'function');
        assert.deepEqual(R.append(1)([4, 3, 2]), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.append, TypeError);
    });
});

},{"..":1,"assert":2}],19:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('appendTo', function() {
    it('adds the element to the end of the list', function() {
        assert.deepEqual(R.appendTo([1, 2, 3], 4), [1, 2, 3, 4]);
        assert.deepEqual(R.appendTo([1, 2, 3], [4, 5, 6]), [1, 2, 3, [4, 5, 6]]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.appendTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.appendTo([]), 'function');
        assert.deepEqual(R.appendTo([4, 3, 2])(1), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.appendTo, TypeError);
    });
});

},{"..":1,"assert":2}],20:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('apply', function() {
    it('applies function to argument list', function() {
        assert.strictEqual(R.apply(Math.max, [1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('is automatically curried', function() {
        assert.strictEqual(R.apply(Math.max)([1, 2, 3, -99, 42, 6, 7]), 42);
    });

    it('provides no way to specify context', function() {
        var obj = {method: function() { return this === obj; }};
        assert.strictEqual(R.apply(obj.method, []), false);
        assert.strictEqual(R.apply(R.bind(obj.method, obj), []), true);
    });
});

},{"..":1,"assert":2}],21:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('arity', function() {

    it('throws if n is greater than ten', function() {
        assert.throws(function() {
            R.arity(11, function() {});
        }, function(err) {
            return (err instanceof Error &&
                    err.message === 'First argument to arity must be a non-negative integer no greater than ten');
        });
    });

});

},{"..":1,"assert":2}],22:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('assoc', function() {
    it('makes a shallow clone of an object, overriding only the specified property', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assoc('e', {x: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.b, obj1.b);
        assert.strictEqual(obj2.f, obj1.f);
    });

    it('is the equivalent of clone and set if the property is not on the original', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assoc('z', {x: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.b, obj1.b);
        assert.strictEqual(obj2.f, obj1.f);
    });

    it('is properly curried', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var expected = {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5};
        var f = R.assoc('e');
        var g = f({x: 42});
        assert.deepEqual(f({x: 42}, obj1), expected);
        assert.deepEqual(g(obj1), expected);
    });
});

},{"..":1,"assert":2}],23:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('assocPath', function() {
    it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var obj2 = R.assocPath('f.g.i', {x: 42}, obj1);
        assert.deepEqual(obj2,
            {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8}
        );
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.m, obj1.m);
        assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
        assert.strictEqual(obj2.f.g.j, obj1.f.g.j);
    });

    it('is the equivalent of clone and setPath if the property is not on the original', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assocPath('x.y.z', {w: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: {y: {z: {w: 42}}}});
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.b, obj1.b);
        assert.strictEqual(obj2.f, obj1.f);
    });

    it('is properly curried', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var expected = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8};
        var f = R.assocPath('f.g.i');
        var g = f({x: 42});
        assert.deepEqual(f({x: 42}, obj1), expected);
        assert.deepEqual(g(obj1), expected);
    });
});

},{"..":1,"assert":2}],24:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('binary', function() {
    it('turns multiple-argument function into binary one', function() {
        R.binary(function(x, y, z) {
            assert.strictEqual(arguments.length, 2);
            assert.strictEqual(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial arguments are passed through normally', function() {
        R.binary(function(x, y, z) {
            assert.strictEqual(x, 10);
            assert.strictEqual(y, 20);
            void z;
        })(10, 20, 30);
    });
});

},{"..":1,"assert":2}],25:[function(require,module,exports){
/* jshint -W053 */

var assert = require('assert');

var R = require('..');


describe('bind', function() {

    function Foo(x) {
        this.x = x;
    }
    function add(x) {
        return this.x + x;
    }
    function Bar(x, y) {
        this.x = x;
        this.y = y;
    }
    Bar.prototype = new Foo();
    Bar.prototype.getX = function() {
        return 'prototype getX';
    };

    it('returns a function', function() {
        assert(typeof R.bind(add, Foo) === 'function');
    });

    it('returns a function bound to the specified context object', function() {
        var f = new Foo(12);
        function isFoo() {
            return this instanceof Foo;
        }
        var isFooBound = R.bind(isFoo, f);
        assert.strictEqual(isFoo(), false);
        assert.strictEqual(isFooBound(), true);
    });

    it('works with built-in types', function() {
        var abc = R.bind(String.prototype.toLowerCase, 'ABCDEFG');
        assert(typeof abc === 'function');
        assert(abc() === 'abcdefg');
    });

    it('works with user-defined types', function() {
        var f = new Foo(12);
        function getX() {
            return this.x;
        }
        var getXFooBound = R.bind(getX, f);
        assert.strictEqual(getXFooBound(), 12);
    });

    it('works with plain objects', function() {
        var pojso = {
            x: 100
        };
        function incThis() {
            return this.x + 1;
        }
        var incPojso = R.bind(incThis, pojso);
        assert(typeof incPojso === 'function');
        assert(incPojso() === 101);
    });

    it('does not interefere with existing object methods', function() {
        var b = new Bar('a', 'b');
        function getX() {
            return this.x;
        }
        var getXBarBound = R.bind(getX, b);
        assert.strictEqual(b.getX(), 'prototype getX');
        assert.strictEqual(getXBarBound(), 'a');
    });

    it('is curried', function() {
        var f = new Foo(1);
        assert(R.bind(add)(f)(10) === 11);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.bind, TypeError);
    });
});

},{"..":1,"assert":2}],26:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('call', function() {
    it('returns the result of calling its first argument with the remaining arguments', function() {
        assert.strictEqual(R.call(Math.max, 1, 2, 3, -99, 42, 6, 7), 42);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.call, TypeError);
    });

    it('accepts one or more arguments', function() {
        var fn = function() { return arguments.length; };
        assert.strictEqual(R.call(fn), 0);
        assert.strictEqual(R.call(fn, 'x'), 1);
        assert.strictEqual(R.call(fn, 'x', 'y'), 2);
        assert.strictEqual(R.call(fn, 'x', 'y', 'z'), 3);
    });

    it('provides no way to specify context', function() {
        var obj = {method: function() { return this === obj; }};
        assert.strictEqual(R.call(obj.method), false);
        assert.strictEqual(R.call(R.bind(obj.method, obj)), true);
    });
});

},{"..":1,"assert":2}],27:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('chain', function() {
    it('maps a function over a nested list and returns the (shallow) flattened result', function() {
        var dbl = R.map(R.multiply(2));
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], [1], [0, 10, -3, 5, 7]]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
        assert.deepEqual(R.chain(dbl, [[1, 2, 3], []]), [2, 4, 6]);
    });
});

},{"..":1,"assert":2}],28:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('charAt', function() {
    it('returns the character at the nth position of a string', function() {
        assert.strictEqual(R.charAt(8, 'abcdefghijklm'), 'i');
    });

    it('is automatically curried', function() {
        var at8 = R.charAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 'i');
    });
});

},{"..":1,"assert":2}],29:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('charCodeAt', function() {
    it('returns the ascii character at the nth position of a string', function() {
        assert.strictEqual(R.charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('is automatically curried', function() {
        var at8 = R.charCodeAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 105);
    });
});

},{"..":1,"assert":2}],30:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('clone', function() {
    it('returns a copy of an array', function() {
        var input = [1, 2, 3, 4, 5];
        var output = R.clone(input);
        assert.deepEqual(output, input);
        assert.notStrictEqual(output, input);
    });

    it('copies objects in the array by reference', function() {
        var o1 = {x: 1};
        var o2 = {x: 2};
        var o3 = {x: 3};
        var c = R.clone([o1, o2, o3]);
        assert.strictEqual(c[0], o1);
    });
});

},{"..":1,"assert":2}],31:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('deep clone integers, strings and booleans', function() {
    it('clone integers', function() {
        assert.strictEqual(R.cloneDeep(-4), -4);
        assert.strictEqual(R.cloneDeep(9007199254740991), 9007199254740991);
    });

    it('clone floats', function() {
        assert.strictEqual(R.cloneDeep(-4.5), -4.5);
        assert.strictEqual(R.cloneDeep(0.0), 0.0);
    });

    it('clone strings', function() {
        assert.strictEqual(R.cloneDeep('ramda'), 'ramda');
    });

    it('clone booleans', function() {
        assert.strictEqual(R.cloneDeep(true), true);
    });
});

describe('deep clone objects', function() {
    it('clone shallow object', function() {
        var obj = {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)};
        var clone = R.cloneDeep(obj);
        obj.c = false;
        obj.d.setDate(31);
        assert.deepEqual(clone, {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)});
    });

    it('clone deep object', function() {
        var obj = {a: {b: {c: 'ramda'}}};
        var clone = R.cloneDeep(obj);
        obj.a.b.c = null;
        assert.deepEqual(clone, {a: {b: {c: 'ramda'}}});
    });

    it('clone objects with circular references', function() {
        var x = {c: null};
        var y = {a: x};
        var z = {b: y};
        x.c = z;
        var clone = R.cloneDeep(x);
        assert.ok(x !== clone);
        assert.ok(x.c !== clone.c);
        assert.ok(x.c.b !== clone.c.b);
        assert.ok(x.c.b.a !== clone.c.b.a);
        assert.ok(x.c.b.a.c !== clone.c.b.a.c);
        assert.deepEqual(R.keys(clone), R.keys(x));
        assert.deepEqual(R.keys(clone.c), R.keys(x.c));
        assert.deepEqual(R.keys(clone.c.b), R.keys(x.c.b));
        assert.deepEqual(R.keys(clone.c.b.a), R.keys(x.c.b.a));
        assert.deepEqual(R.keys(clone.c.b.a.c), R.keys(x.c.b.a.c));

        x.c.b = 1;
        assert.notDeepEqual(R.keys(clone.c.b), R.keys(x.c.b));
    });

    it('clone instances', function() {
        var Obj = function(x) {
            this.x = x;
        };
        Obj.prototype.get = function() {
            return this.x;
        };
        Obj.prototype.set = function(x) {
            this.x = x;
        };

        var obj = new Obj(10);
        assert.strictEqual(obj.get(), 10);

        var clone = R.cloneDeep(obj);
        assert.strictEqual(clone.get(), 10);

        assert.ok(obj !== clone);

        obj.set(11);
        assert.strictEqual(obj.get(), 11);
        assert.strictEqual(clone.get(), 10);
    });
});

describe('deep clone arrays', function() {
    it('clone shallow arrays', function() {
        var list = [1, 2, 3];
        var clone = R.cloneDeep(list);
        list.pop();
        assert.deepEqual(clone, [1, 2, 3]);
    });

    it('clone deep arrays', function() {
        var list = [1, [1, 2, 3], [[[5]]]];
        var clone = R.cloneDeep(list);

        assert.ok(list !== clone);
        assert.ok(list[2] !== clone[2]);
        assert.ok(list[2][0] !== clone[2][0]);

        assert.deepEqual(clone, [1, [1, 2, 3], [[[5]]]]);
    });
});

describe('deep `clone` functions', function() {
    it('keep reference to function', function() {
        var fn = function(x) { return x + x;};
        var list = [{a: fn}];

        var clone = R.cloneDeep(list);

        assert.strictEqual(clone[0].a(10), 20);
        assert.ok(list[0].a === clone[0].a);
    });
});

describe('deep clone Dates', function() {
    it('clone date', function() {
        var date = new Date(2014, 10, 14, 23, 59, 59, 999);

        var clone = R.cloneDeep(date);

        assert.ok(date !== clone);
        assert.deepEqual(clone.toString(), new Date(2014, 10, 14, 23, 59, 59, 999).toString());

        assert.strictEqual(clone.getDay(), 5); // friday
    });
});

describe('deep clone deep nested mixed objects', function() {
    it('clone array with objects', function() {
        var list = [{a: {b: 1}}, [{c: {d: 1}}]];
        var clone = R.cloneDeep(list);
        list[1][0] = null;
        assert.deepEqual(clone, [{a: {b: 1}}, [{c: {d: 1}}]]);
    });

    it('clone array with arrays', function() {
        var list = [[1], [[3]]];
        var clone = R.cloneDeep(list);
        list[1][0] = null;
        assert.deepEqual(clone, [[1], [[3]]]);
    });

    it('clone array with mutual ref object', function() {
        var obj = {a: 1};
        var list = [{b: obj}, {b: obj}];
        var clone = R.cloneDeep(list);

        assert.ok(list[0].b === list[1].b);
        assert.ok(clone[0].b === clone[1].b);
        assert.ok(clone[0].b !== list[0].b);
        assert.ok(clone[1].b !== list[1].b);

        assert.deepEqual(clone[0].b, {a:1});
        assert.deepEqual(clone[1].b, {a:1});

        obj.a = 2;
        assert.deepEqual(clone[0].b, {a:1});
        assert.deepEqual(clone[1].b, {a:1});
    });
});

describe('deep clone edge cases', function() {
    it('nulls, undefineds and empty objects and arrays', function() {
        assert.strictEqual(R.cloneDeep(null), null);
        assert.strictEqual(R.cloneDeep(undefined), undefined);
        assert.strictEqual(R.cloneDeep(), undefined);
        assert.notStrictEqual(R.cloneDeep(undefined), null);

        var obj = {};
        assert.notStrictEqual(R.cloneDeep(obj), obj);

        var list = [];
        assert.notStrictEqual(R.cloneDeep(list), list);
    });
});

},{"..":1,"assert":2}],32:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('cloneObj', function() {
    it('returns a copy of an object', function() {
        var input = {a: 1, b: 2, c: 3, z: 100};
        var output = R.cloneObj(input);
        assert.deepEqual(output, input);
        assert.notStrictEqual(output, input);
    });

    it('copies objects in the array by reference', function() {
        var o1 = {x: 1};
        var o2 = {x: 2};
        var o3 = {x: 3};
        var c = R.cloneObj({a: o1, b: o2, c: o3});
        assert.strictEqual(c.a, o1);
    });
});

},{"..":1,"assert":2}],33:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commute', function() {
    it('"pivots" a list (list of functors => functor of a list)', function() {
        assert.deepEqual(R.commute(R.of, as), [[1, 3], [1, 4]]);
        assert.deepEqual(R.commute(R.of, bs), [[1, 3], [2, 3]]);
        assert.deepEqual(R.commute(R.of, cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);
    });

    it('is curried', function() {
        var cmtArr = R.commute(R.of);
        assert(typeof cmtArr === 'function');
        assert.deepEqual(cmtArr(as), [[1, 3], [1, 4]]);
        assert.deepEqual(cmtArr(bs), [[1, 3], [2, 3]]);
        assert.deepEqual(cmtArr(cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);

    });
});

},{"..":1,"assert":2}],34:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commuteMap', function() {
    var plus10map = R.map(function(x) { return x + 10; });
    it('"pivots" a list (list of functors => functor of a list) and applies a transformation', function() {
        assert.deepEqual(R.commuteMap(plus10map, R.of, as), [[11, 13], [11, 14]]);
        assert.deepEqual(R.commuteMap(plus10map, R.of, bs), [[11, 13], [12, 13]]);
        assert.deepEqual(R.commuteMap(plus10map, R.of, cs), [[11, 13], [12, 13], [11, 14], [12, 14]]);
    });

    it('is curried', function() {
        var cmtPlus10 = R.commuteMap(plus10map);
        assert(typeof cmtPlus10 === 'function');

        var cmtmArr = cmtPlus10(R.of);
        assert(typeof cmtmArr === 'function');
        assert.deepEqual(cmtmArr(as), [[11, 13], [11, 14]]);
        assert.deepEqual(cmtmArr(bs), [[11, 13], [12, 13]]);
        assert.deepEqual(cmtmArr(cs), [[11, 13], [12, 13], [11, 14], [12, 14]]);
    });
});

},{"..":1,"assert":2}],35:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('comparator', function() {
    it('builds a comparator function for sorting out of a simple predicate that reports whether the first param is smaller', function() {
        assert.deepEqual([3, 1, 8, 1, 2, 5].sort(R.comparator(function(a, b) {return a < b;})), [1, 1, 2, 3, 5, 8]);
    });
});

},{"..":1,"assert":2}],36:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('compose', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}
    function c(x) {return x + 'C';}
    function d(x) {return x + 'D';}

    it('executes its passed in functions in order from right to left', function() {
        assert.strictEqual(R.compose(a, b, c, d)(''), 'DCBA');
    });

    it('first function is passed multiple args', function() {
        function e(a, b, c) {
            return c + 'E';
        }
        assert.strictEqual(R.compose(a, b, c, e)(1, 2, 3), '3ECBA');
    });

    it('passes context to functions', function() {
        function x(val) {
            return this.x * val;
        }
        function y(val) {
            return this.y * val;
        }
        function z(val) {
            return this.z * val;
        }
        var context = {
            a: R.compose(x, y, z),
            x: 4,
            y: 2,
            z: 1
        };
        assert.strictEqual(context.a(5), 40);
    });

    it('returns a function with arity == rightmost argument', function() {
        function a2(x, y) { void y; return 'A2'; }
        function a3(x, y) { void y; return 'A2'; }
        function a4(x, y) { void y; return 'A2'; }

        var f1 = R.compose(b, a);
        assert.strictEqual(f1.length, a.length);
        var f2 = R.compose(b, a2);
        assert.strictEqual(f2.length, a2.length);
        var f3 = R.compose(b, a3);
        assert.strictEqual(f3.length, a3.length);
        var f4 = R.compose(b, a4);
        assert.strictEqual(f4.length, a4.length);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.compose(); });
    });

    it('returns argument if given exactly one argument', function() {
        function f() {}
        assert.strictEqual(R.compose(f), f);
    });

});

},{"..":1,"assert":2}],37:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('concat', function() {
    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });

    var z1 = {
        x: 'z1',
        concat: function(that) { return this.x + ' ' + that.x; }
    };
    var z2 = {
        x: 'z2'
    };

    it('adds combines the elements of the two lists', function() {
        assert.deepEqual(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
        assert.deepEqual(R.concat([], ['c', 'd']), ['c', 'd']);
    });
    it('works on strings', function() {
        assert.strictEqual(R.concat('foo', 'bar'), 'foobar');
        assert.strictEqual(R.concat('x', ''), 'x');
        assert.strictEqual(R.concat('', 'x'), 'x');
        assert.strictEqual(R.concat('', ''), '');
    });
    it('delegates to non-String object with a concat method, as second param', function() {
        assert.strictEqual(R.concat(z1, z2), 'z1 z2');
    });
    it('is curried', function() {
        var conc123 = R.concat([1, 2, 3]);
        assert.deepEqual(conc123([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
        assert.deepEqual(conc123(['a', 'b', 'c']), [1, 2, 3, 'a', 'b', 'c']);
    });
    it('throws if not an array, String, or object with a concat method', function() {
        assert.throws(function() { return R.concat({}, {}); }, TypeError);
    });
});

},{"..":1,"assert":2}],38:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('cond', function() {
    it('returns a function', function() {
        assert.strictEqual(typeof R.cond(), 'function');
    });

    it('returns a conditional function', function() {
        var fn = R.cond(
            [R.eq(0),   R.always('water freezes at 0°C')],
            [R.eq(100), R.always('water boils at 100°C')],
            [R.T,       function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
        );
        assert.strictEqual(fn(0), 'water freezes at 0°C');
        assert.strictEqual(fn(50), 'nothing special happens at 50°C');
        assert.strictEqual(fn(100), 'water boils at 100°C');
    });

    it('returns a function which returns undefined if none of the predicates matches', function() {
        var fn = R.cond(
            [R.eq('foo'), R.always(1)],
            [R.eq('bar'), R.always(2)]
        );
        assert.strictEqual(fn('quux'), undefined);
    });

    it('predicates are tested in order', function() {
        var fn = R.cond(
            [R.T, R.always('foo')],
            [R.T, R.always('bar')],
            [R.T, R.always('baz')]
        );
        assert.strictEqual(fn(), 'foo');
    });

    it('forwards all arguments to predicates and to transformers', function() {
        var fn = R.cond(
            [function(_, x) { return x == 42; }, function() { return arguments.length; }]
        );
        assert.strictEqual(fn(21, 42, 84), 3);
    });
});

},{"..":1,"assert":2}],39:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('construct', function() {
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('turns a constructor function into one that can be called without `new`', function() {
        var rect = R.construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word', 'gi');
        assert(word instanceof RegExp);
        assert.strictEqual(word.source, 'word');
        assert.strictEqual(word.global, true);
    });

    it('returns a curried function', function() {
        var rect = R.construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.height, 4);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word');
        var complete = word('gi');
        assert(complete instanceof RegExp);
        assert.strictEqual(complete.source, 'word');
        assert.strictEqual(complete.global, true);
    });
});

},{"..":1,"assert":2}],40:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('constructN', function() {
    var Circle = function(r) {
        this.r = r;
        this.colors = Array.prototype.slice.call(arguments, 1);
    };
    Circle.prototype.area = function() {return Math.PI * Math.pow(this.r, 2);};

    it('turns a constructor function into a function with n arguments', function() {
        var circle = R.constructN(2, Circle);
        var c1 = circle(1, 'red');
        assert(c1 instanceof Circle);
        assert.strictEqual(c1.r, 1);
        assert.strictEqual(c1.area(), Math.PI);
        assert.deepEqual(c1.colors, ['red']);

        var regex = R.constructN(1, RegExp);
        var pattern = regex('[a-z]');
        assert(pattern instanceof RegExp);
        assert.strictEqual(pattern.source, '[a-z]');
    });

    it('is curried', function() {
        function G(a, b, c) { this.a = a; this.b = b; this.c = c; }
        var construct2 = R.constructN(2);
        assert(typeof construct2 === 'function');
        var g2 = construct2(G);
        assert(typeof g2 === 'function');
        assert(g2('a', 'b') instanceof G);
        assert(g2('a')('b') instanceof G);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.constructN, TypeError);
    });
});

},{"..":1,"assert":2}],41:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('contains', function() {
    it('returns true if an element is in a list', function() {
        assert.strictEqual(R.contains(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
    });

    it('returns false if an element is not in a list', function() {
        assert.strictEqual(R.contains(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
    });

    it('returns false for the empty list', function() {
        assert.strictEqual(R.contains(1, []), false);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.contains(7), 'function');
        assert.strictEqual(R.contains(7)([1, 2, 3]), false);
        assert.strictEqual(R.contains(7)([1, 2, 7, 3]), true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.contains, TypeError);
    });
});

},{"..":1,"assert":2}],42:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('containsWith', function() {
    assert.strictEqual(R, R);
});

},{"..":1,"assert":2}],43:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('converge', function() {
    var mult = function(a, b) {return a * b;};

    it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
        assert.strictEqual(R.converge(mult, R.add(1), R.add(3))(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
    });
});

},{"..":1,"assert":2}],44:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


var albums = [
    {title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'},
    {title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'},
    {title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'},
    {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'},
    {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'},
    {title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'},
    {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'},
    {title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'},
    {title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'},
    {title: 'Evita', artist: 'Various', genre: 'Broadway'},
    {title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'},
    {title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}
];
var derivedGenre = (function() {
    var remap = {
        Baroque: 'Classical',
        Modern: 'Classical',
        Romantic: 'Classical',
        Metal: 'Rock'  /*, etc */
    };
    return function(album) {
        var genre = R.prop('genre', album);
        return remap[genre] || genre;
    };
}());


describe('countBy', function() {
    it('counts by a simple property of the objects', function() {
        assert.deepEqual(R.countBy(R.prop('genre'), albums), {
            Baroque: 2, Rock: 2, Jazz: 2, Romantic: 1, Metal: 1, Modern: 1, Broadway: 1, Folk: 1, Classical: 1
        });
    });

    it('counts by a more complex function on the objects', function() {
        assert.deepEqual(R.countBy(derivedGenre, albums), {
            Classical: 5, Rock: 3, Jazz: 2, Broadway: 1, Folk: 1
        });
    });

    it('is automatically curried', function() {
        var counter = R.countBy(R.prop('genre'));
        assert.deepEqual(counter(albums), {
            Baroque: 2, Rock: 2, Jazz: 2, Romantic: 1, Metal: 1, Modern: 1, Broadway: 1, Folk: 1, Classical: 1
        });
    });
});

},{"..":1,"assert":2}],45:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('createMapEntry', function() {
    it('creates an object containing a single key:value pair', function() {
        assert.deepEqual(R.createMapEntry('foo', 42), {foo: 42});
    });

    it('is automatically curried', function() {
        assert.deepEqual(R.createMapEntry('foo')(42), {foo: 42});
    });
});

},{"..":1,"assert":2}],46:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('curry', function() {
    it('curries a single value', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.strictEqual(g(3, 6, 2), 15);
    });

    it('curries multiple values', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12, 3);
        assert.strictEqual(g(6, 2), 15);
        var h = f(12, 3, 6);
        assert.strictEqual(h(2), 15);
    });

    it('allows further currying of a curried function', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
        var g = f(12);
        assert.strictEqual(g(3, 6, 2), 15);
        var h = g(3);
        assert.strictEqual(h(6, 2), 15);
        assert.strictEqual(g(3, 6)(2), 15);
    });

    it('properly reports the length of the curried function', function() {
        var f = R.curry(function(a, b, c, d) {return (a + b * c) / d;});
        assert.strictEqual(f.length, 4);
        var g = f(12);
        assert.strictEqual(g.length, 3);
        var h = g(3);
        assert.strictEqual(h.length, 2);
        assert.strictEqual(g(3, 6).length, 1);
    });
});

},{"..":1,"assert":2}],47:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('curryN', function() {
    function source(a, b, c, d) {
        void d;
        return a * b * c;
    }
    it('accepts an arity', function() {
        var curried = R.curryN(3, source);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });

    it('can be partially applied', function() {
        var curry3 = R.curryN(3);
        var curried = curry3(source);
        assert.strictEqual(curried.length, 3);
        assert.strictEqual(curried(1)(2)(3), 6);
        assert.strictEqual(curried(1, 2)(3), 6);
        assert.strictEqual(curried(1)(2, 3), 6);
        assert.strictEqual(curried(1, 2, 3), 6);
    });
});

},{"..":1,"assert":2}],48:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('difference', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Z = [3, 4, 5, 6, 10];
    var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('finds the set of all elements in the first list not contained in the second', function() {
        assert.deepEqual(R.difference(M, N), [1, 2]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.difference(M2, N2), [1, 2]);
    });

    it('does not work for non-primitives (use `differenceWith`)', function() {
        assert.strictEqual(R.difference(Mo, No).length, 4);
    });

    it('works for arrays of different lengths', function() {
        assert.deepEqual(R.difference(Z, Z2), [10]);
        assert.deepEqual(R.difference(Z2, Z), [1, 2, 7, 8]);
    });

    it('returns an empty array if there are no different elements', function() {
        assert.deepEqual(R.difference(M2, M), []);
        assert.deepEqual(R.difference(M, M2), []);
        assert.deepEqual(R.difference([], M2), []);
    });

    it('is curried', function() {
        assert(typeof R.difference([1, 2, 3]) === 'function');
        assert.deepEqual(R.difference([1, 2, 3])([1, 3]), [2]);
    });
});

},{"..":1,"assert":2}],49:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('differenceWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var Ro2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var So2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.differenceWith(eqA, Ro, So), [{a: 1}, {a: 2}]);
    });
    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.differenceWith(eqA, Ro2, So2), [{a: 1}, {a: 2}]);
    });
});

},{"..":1,"assert":2}],50:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('divide', function() {
    it('divides two numbers', function() {
        assert.strictEqual(R.divide(28, 7), 4);
    });

    it('is curried', function() {
        var into28 = R.divide(28);
        assert.strictEqual(into28(7), 4);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var half = R.divide(void 0, 2);
        assert.strictEqual(half(40), 20);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.divide, TypeError);
    });
});

},{"..":1,"assert":2}],51:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('drop', function() {
    it('skips the first `n` elements from a list, returning the remainder', function() {
        assert.deepEqual(R.drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['d', 'e', 'f', 'g']);
    });

    it('returns an empty array if `n` is too large', function() {
        assert.deepEqual(R.drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
    });

    it('is automatically curried', function() {
        var drop2 = R.drop(2);
        assert.deepEqual(drop2(['a', 'b', 'c', 'd', 'e']), ['c', 'd', 'e']);
        assert.deepEqual(drop2(['x', 'y', 'z']), ['z']);
    });
});

},{"..":1,"assert":2}],52:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('dropWhile', function() {
    it('skips elements while the function reports `true`', function() {
        assert.deepEqual(R.dropWhile(function(x) {return x < 5;}, [1, 3, 5, 7, 9]), [5, 7, 9]);
    });

    it('returns an empty list for an ampty list', function() {
        assert.deepEqual(R.dropWhile(function() { return false; }, []), []);
        assert.deepEqual(R.dropWhile(function() { return true; }, []), []);
    });

    it('starts at the right arg and acknowledges undefined', function() {
        var sublist = R.dropWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]);
        assert.strictEqual(sublist.length, 3);
        assert.strictEqual(sublist[0], void 0);
        assert.strictEqual(sublist[1], 5);
        assert.strictEqual(sublist[2], 7);
    });

    it('is automatically curried', function() {
        var dropLt7 = R.dropWhile(function(x) {return x < 7;});
        assert.deepEqual(dropLt7([1, 3, 5, 7, 9]), [7, 9]);
        assert.deepEqual(dropLt7([2, 4, 6, 8, 10]), [8, 10]);
    });
});

},{"..":1,"assert":2}],53:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('empty', function() {
    it('returns an empty list', function() {
        assert.deepEqual(R.empty([1, 2, 3]), []);
    });

});

},{"..":1,"assert":2}],54:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('eq', function() {
    var a = [];
    var b = a;
    it('tests for strict equality of its operands', function() {
        assert.strictEqual(R.eq(100, 100), true);
        assert.strictEqual(R.eq(100, '100'), false);
        assert.strictEqual(R.eq([], []), false);
        assert.strictEqual(R.eq(a, b), true);
    });

    it('is curried', function() {
        var isA = R.eq(a);
        assert.strictEqual(isA([]), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.eq, TypeError);
    });
});

},{"..":1,"assert":2}],55:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('eqProps', function() {
    it('reports whether two objects have the same value for a given property', function() {
        assert.strictEqual(R.eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
        assert.strictEqual(R.eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
    });

    it('is automatically curried', function() {
        var sameName = R.eqProps('name');
        assert.strictEqual(sameName({name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    });
});

},{"..":1,"assert":2}],56:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('filter', function() {
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those matching a filter', function() {
        assert.deepEqual(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.filter(function(x) { return x > 100; }, []), []);
    });

    it('dispatches to passed-in non-Array object with a `filter` method', function() {
        var f = {filter: function(f) { return f('called f.filter'); }};
        assert.strictEqual(R.filter(function(s) { return s; }, f), 'called f.filter');
    });

    it('is automatically curried', function() {
        var onlyEven = R.filter(even);
        assert.deepEqual(onlyEven([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.filter, TypeError);
    });
});

},{"..":1,"assert":2}],57:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('filterIndexed', function() {
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal filter', function() {
        assert.deepEqual(R.filterIndexed(even, [1, 2, 3, 4, 5]), [2, 4]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(R.filterIndexed(everyOther, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(R.filterIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [0, 9]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.filterIndexed(function(x) { return x > 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.filterIndexed(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var everyOtherPosition = R.filterIndexed(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [8, 7, 3, 9]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.filterIndexed, TypeError);
    });
});

},{"..":1,"assert":2}],58:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('find', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the first element that satisfies the predicate', function() {
        assert.strictEqual(R.find(even, a), 10);
        assert.strictEqual(R.find(gt100, a), 200);
        assert.strictEqual(R.find(isStr, a), 'cow');
        assert.strictEqual(R.find(xGt100, a), obj2);
    });

    it('returns `undefined` when no element satisfies the predicate', function() {
        assert.strictEqual(R.find(even, ['zing']), undefined);
    });

    it('returns `undefined` when given an empty list', function() {
        assert.strictEqual(R.find(even, []), undefined);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.find(even), 'function');
        assert.strictEqual(R.find(even)(a), 10);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.find, TypeError);
    });
});

},{"..":1,"assert":2}],59:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('findIndex', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the first element that satisfies the predicate', function() {
        assert.strictEqual(R.findIndex(even, a), 1);
        assert.strictEqual(R.findIndex(gt100, a), 8);
        assert.strictEqual(R.findIndex(isStr, a), 3);
        assert.strictEqual(R.findIndex(xGt100, a), 10);
    });

    it('returns -1 when no element satisfies the predicate', function() {
        assert.strictEqual(R.findIndex(even, ['zing']), -1);
        assert.strictEqual(R.findIndex(even, []), -1);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findIndex(even), 'function');
        assert.strictEqual(R.findIndex(even)(a), 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.findIndex, TypeError);
    });
});

},{"..":1,"assert":2}],60:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('findLast', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the last element that satisfies the predicate', function() {
        assert.strictEqual(R.findLast(even, a), 0);
        assert.strictEqual(R.findLast(gt100, a), 300);
        assert.strictEqual(R.findLast(isStr, a), 'cow');
        assert.strictEqual(R.findLast(xGt100, a), obj2);
    });

    it('returns `undefined` when no element satisfies the predicate', function() {
        assert.strictEqual(R.findLast(even, 'zing'), undefined);
    });

    it('works when the first element matches', function() {
        assert.strictEqual(R.findLast(even, [2, 3, 5]), 2);
    });

    it('does not go into an infinite loop on an empty array', function() {
        assert.strictEqual(R.findLast(even, []), undefined);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findLast(even), 'function');
        assert.strictEqual(R.findLast(even)(a), 0);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.findLast, TypeError);
    });
});

},{"..":1,"assert":2}],61:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('findLastIndex', function() {
    var obj1 = {x: 100};
    var obj2 = {x: 200};
    var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
    var even = function(x) { return x % 2 === 0; };
    var gt100 = function(x) { return x > 100; };
    var isStr = function(x) { return typeof x === 'string'; };
    var xGt100 = function(o) { return o && o.x > 100; };

    it('returns the index of the last element that satisfies the predicate', function() {
        assert.strictEqual(R.findLastIndex(even, a), 15);
        assert.strictEqual(R.findLastIndex(gt100, a), 9);
        assert.strictEqual(R.findLastIndex(isStr, a), 3);
        assert.strictEqual(R.findLastIndex(xGt100, a), 10);
    });

    it('returns -1 when no element satisfies the predicate', function() {
        assert.strictEqual(R.findLastIndex(even, 'zing'), -1);
    });

    it('works when the first element matches', function() {
        assert.strictEqual(R.findLastIndex(even, [2, 3, 5]), 0);
    });

    it('does not go into an infinite loop on an empty array', function() {
        assert.strictEqual(R.findLastIndex(even, []), -1);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.findLastIndex(even), 'function');
        assert.strictEqual(R.findLastIndex(even)(a), 15);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.findLastIndex, TypeError);
    });
});

},{"..":1,"assert":2}],62:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('flatten', function() {
    it('turns a nested list into one flat list', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(R.flatten(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(R.flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
        assert.deepEqual(R.flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it('is not destructive', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.notStrictEqual(R.flatten(nest), nest);
    });

    it('handles ridiculously large inputs', function() {
        assert.strictEqual(R.flatten([new Array(1000000), R.range(0, 56000), 5, 1, 3]).length, 1056003);
    });

    it('handles array-like objects', function() {
        var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
        assert.deepEqual(R.flatten(o), [1, 2, 3, 'a', 'b', 'c', 'd', 'e']);
    });

    it('flattens an array of empty arrays', function() {
        assert.deepEqual(R.flatten([[], [], []]), []);
        assert.deepEqual(R.flatten([]), []);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.flatten, TypeError);
    });
});

},{"..":1,"assert":2}],63:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('flip', function() {
    it('returns a function which inverts the first two arguments to the supplied function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f);
        assert.strictEqual(f('a', 'b', 'c'), 'a b c');
        assert.strictEqual(g('a', 'b', 'c'), 'b a c');
    });

    it('returns a curried function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f)('a');
        assert.strictEqual(g('b', 'c'), 'b a c');
    });

    it('produces a function that throws if given no arguments', function() {
        var f = function(x, y) { return x + ' then ' + y; };
        var g = R.flip(f);
        assert.throws(g, TypeError);
    });
});

},{"..":1,"assert":2}],64:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('foldl', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.foldl(add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.foldl(mult, 1, [1, 2, 3, 4]), 24);
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.foldl(add, 0, []), 0);
        assert.strictEqual(R.foldl(mult, 1, []), 1);
        assert.deepEqual(R.foldl(R.concat, [], []), []);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldl(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.foldl(add, 0);
        assert.strictEqual(sum.length, 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldl, TypeError);
        assert.throws(R.foldl(R.add), TypeError);
    });
});

},{"..":1,"assert":2}],65:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('foldlIndexed', function() {
    var timesIndexed = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('works just like normal foldl', function() {
        assert.strictEqual(R.foldlIndexed(R.add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.foldlIndexed(R.multiply, 1, [1, 2, 3, 4]), 24);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.foldlIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.foldlIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.foldlIndexed(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldlIndexed(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldlIndexed, TypeError);
        assert.throws(R.foldlIndexed(R.add), TypeError);
    });
});

},{"..":1,"assert":2}],66:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('foldr', function() {
    var avg = function(a, b) {return (a + b) / 2;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.foldr(function(a, b) {return a + b;}, '', ['a', 'b', 'c', 'd']), 'dcba');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.foldr(avg, 54, [12, 4, 10, 6]), 12);
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.foldr(avg, 0, []), 0);
    });

    it('is automatically curried', function() {
        var something = R.foldr(avg, 54);
        var rcat = R.foldr(R.add, '');
        assert.strictEqual(something([12, 4, 10, 6]), 12);
        assert.strictEqual(rcat(['1', '2', '3', '4']), '4321');
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.foldr(avg, 0);
        assert.strictEqual(something.length, 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldr, TypeError);
        assert.throws(R.foldr(R.add), TypeError);
    });
});

},{"..":1,"assert":2}],67:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('foldrIndexed', function() {
    var timesIndexed = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.foldrIndexed(function(a, b, idx) {return a + idx + b;}, '', ['a', 'b', 'c', 'd']), '3d2c1b0a');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.foldrIndexed(function(acc, n, idx) { return acc.concat([idx, n]); }, [], [12, 4, 10, 6]), [3, 6, 2, 10, 1, 4, 0, 12]);
    });

    it('returns the accumulator for an empty array', function() {
        var memo = [];
        assert.strictEqual(R.foldrIndexed(function(a, n, idx) { return a.concat(idx); }, memo, []), memo);
    });

    it('is automatically curried', function() {
        var something = R.foldrIndexed(function(acc, b, idx) { return acc += idx + b; }, 54);
        assert.strictEqual(something([12, 4, 10, 6]), 92);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.foldrIndexed(function(acc, b, idx) { return acc += idx + b; }, 0);
        assert.strictEqual(something.length, 1);
    });

    it('passes the index as a third parameter to the predicate', function() {
        assert.strictEqual(R.foldrIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
        assert.deepEqual(R.foldrIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
        var list = [1, 2, 3];
        R.foldrIndexed(function(acc, x, idx, ls) {
            assert.strictEqual(ls, list);
            return acc;
        }, 0, list);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.foldrIndexed(R.add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '4321');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldrIndexed, TypeError);
        assert.throws(R.foldrIndexed(R.add), TypeError);
    });
});

},{"..":1,"assert":2}],68:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('forEach', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list', function() {
        var sideEffect = {};
        R.forEach(function(elem) { sideEffect[elem.x] = elem.y; }, list);
        assert.deepEqual(sideEffect, {1: 2, 100: 200, 300: 400, 234: 345});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(R.forEach(function(obj) { s += obj.x; }, list), list);
        assert.strictEqual('1100300234', s);
    });

    it('handles empty list', function() {
        assert.deepEqual(R.forEach(function(x) { return x * x; }, []), []);
    });

    it('is curried', function() {
        var xStr = '';
        var xe = R.forEach(function(x) { xStr += (x + ' '); });
        assert.strictEqual(typeof xe, 'function');
        xe([1, 2, 4]);
        assert.strictEqual(xStr, '1 2 4 ');
    });

    it('throws on zero arguments', function() {
        assert.throws(R.forEach, TypeError);
    });
});

},{"..":1,"assert":2}],69:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('forEachIndexed', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list and passes in the index and list as well', function() {
        var sideEffect = {};
        R.forEachIndexed(function(elem, idx) { sideEffect[elem.x] = idx; }, list);
        assert.deepEqual(sideEffect, {1: 0, 100: 1, 300: 2, 234: 3});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(R.forEachIndexed(function(obj) { s += obj.x; }, list), list);
        assert.strictEqual('1100300234', s);
    });

    it('handles empty list', function() {
        assert.deepEqual(R.forEachIndexed(function(x, idx) { return x + idx; }, []), []);
    });

    it('is curried', function() {
        var sum = 0;
        var xe = R.forEachIndexed(function(x, idx) { sum += (x + idx); });
        assert.strictEqual(typeof xe, 'function');
        xe([1, 2, 4]);
        assert.strictEqual(sum, 10);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.forEachIndexed, TypeError);
    });
});

},{"..":1,"assert":2}],70:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('fromPairs', function() {
    it('combines an array of two-element arrays into an object', function() {
        assert.deepEqual(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]), {a: 1, b: 2, c: 3});
    });
    it('skips empty Arrays and non-Array elements', function() {
        assert.deepEqual(R.fromPairs([['a', 1], 'x', [], ['b', 2], {}, ['c', 3]]), {a: 1, b: 2, c: 3});
    });
});

},{"..":1,"assert":2}],71:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('func', function() {
    it('returns a function that applies the appropriate function to the supplied object', function() {
        var fred = {first: 'Fred', last: 'Flintstone', getName: function() {
            return this.first + ' ' + this.last;
        }};
        var barney = {first: 'Barney', last: 'Rubble', getName: function() {
            return this.first + ' ' + this.last;
        }};
        var gName = R.func('getName');
        assert.strictEqual(typeof gName, 'function');
        assert.strictEqual(gName(fred), 'Fred Flintstone');
        assert.strictEqual(gName(barney), 'Barney Rubble');
    });

    it('passes arguments appropriately when not curried', function() {
        assert.strictEqual(R.func('add', R, 3, 6), 9);
    });

    it('invokes the function with no arguments when no extra params are supplied', function() {
        var obj = {f: function() { return 'called f'; }};
        assert.strictEqual(R.func('f', obj), 'called f');
    });

    it('applies additional arguments to the function', function() {
        var Point = function(x, y) {
            this.x = x;
            this.y = y;
        };
        Point.prototype.moveBy = function(dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        var p1 = new Point(10, 20);


        var moveBy = R.func('moveBy');
        moveBy(p1, 5, 7);
        assert.strictEqual(p1.x, 15);
        assert.strictEqual(p1.y, 27);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.func(); });
    });
});

},{"..":1,"assert":2}],72:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('functions', function() {

    function F() {
        this.sort = function() {};
        this.map = function() {};
        this.obj = {};
        this.num = 4;
    }

    F.prototype.x = function() {};
    F.prototype.y = function() {};
    F.prototype.z = {};

    var f = new F();

    it('returns list of functions without prototype functions', function() {
        assert.deepEqual(R.functions(f).sort(), ['map', 'sort']);
        assert.strictEqual(R.functions(f).length, 2);
        assert.deepEqual(R.functions({add: R.add, foldl: R.foldl}).sort(), ['add', 'foldl']);
    });

    it('returns an empty array if there are no functions on the object or its prototype chain', function() {
        function G() {}
        assert.deepEqual(R.functions(new G()), []);
    });
});

},{"..":1,"assert":2}],73:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('functionsIn', function() {

    function F() {
        this.sort = function() {};
        this.map = function() {};
        this.obj = {};
        this.num = 4;
    }

    F.prototype.x = function() {};
    F.prototype.y = function() {};
    F.prototype.z = {};

    var f = new F();

    it('returns list of functions with prototype functions', function() {
        assert.deepEqual(R.functionsIn(f).sort(), ['map', 'sort', 'x', 'y']);
        assert.strictEqual(R.functionsIn(f).length, 4);
    });

    it('returns an empty array if there are no functions on the object or its prototype chain', function() {
        function G() {}
        assert.deepEqual(R.functionsIn(new G()), []);
    });
});

},{"..":1,"assert":2}],74:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('groupBy', function() {
    it('splits the list into groups according to the grouping function', function() {
        var grade = function(score) {
            return (score < 65) ? 'F' : (score < 70) ? 'D' : (score < 80) ? 'C' : (score < 90) ? 'B' : 'A';
        };
        var students = [
            {name: 'Abby', score: 84},
            {name: 'Brad', score: 73},
            {name: 'Chris', score: 89},
            {name: 'Dianne', score: 99},
            {name: 'Eddy', score: 58},
            {name: 'Fred', score: 67},
            {name: 'Gillian', score: 91},
            {name: 'Hannah', score: 78},
            {name: 'Irene', score: 85},
            {name: 'Jack', score: 69}
        ];
        var byGrade = function(student) {return grade(student.score || 0);};
        assert.deepEqual(R.groupBy(byGrade, students), {
            A: [{name: 'Dianne', score: 99}, {name: 'Gillian', score: 91}],
            B: [{name: 'Abby', score: 84}, {name: 'Chris', score: 89}, {name: 'Irene', score: 85}],
            C: [{name: 'Brad', score: 73}, {name: 'Hannah', score: 78}],
            D: [{name: 'Fred', score: 67}, {name: 'Jack', score: 69}],
            F: [{name: 'Eddy', score: 58}]
        });
    });

    it('is automatically curried', function() {
        var splitByType = R.groupBy(R.prop('type'));
        assert.deepEqual(splitByType([
            {type: 'A', val: 10},
            {type: 'B', val: 20},
            {type: 'A', val: 30},
            {type: 'A', val: 40},
            {type: 'C', val: 50},
            {type: 'B', val: 60}
        ]), {
            A: [{type: 'A', val: 10}, {type: 'A', val: 30}, {type: 'A', val: 40}],
            B: [{type: 'B', val: 20}, {type: 'B', val: 60}],
            C: [{type: 'C', val: 50}]
        });
    });

    it('returns an empty object if given an empty array', function() {
        assert.deepEqual(R.groupBy(R.prop('x'), []), {});
    });

    it('throws on zero arguments', function() {
        assert.throws(R.groupBy, TypeError);
    });
});

},{"..":1,"assert":2}],75:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('gt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(!R.gt(3, 5));
        assert(R.gt(6, 4));
        assert(!R.gt(7.0, 7.0));
        assert(!R.gt('abc', 'xyz'));
        assert(R.gt('abcd', 'abc'));
    });

    it('is curried', function() {
        var lt20 = R.gt(20);
        assert(lt20(10));
        assert(!lt20(20));
        assert(!lt20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var gt20 = R.gt(__, 20);
        assert(!gt20(10));
        assert(!gt20(20));
        assert(gt20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gt, TypeError);
    });
});

},{"..":1,"assert":2}],76:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('gte', function() {
    it('reports whether one item is less than another', function() {
        assert(!R.gte(3, 5));
        assert(R.gte(6, 4));
        assert(R.gte(7.0, 7.0));
        assert(!R.gte('abc', 'xyz'));
        assert(R.gte('abcd', 'abc'));
    });

    it('is curried', function() {
        var lte20 = R.gte(20);
        assert(lte20(10));
        assert(lte20(20));
        assert(!lte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var __ = void 0;
        var gte20 = R.gte(__, 20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gte, TypeError);
    });
});

},{"..":1,"assert":2}],77:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('has', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    it('returns a function that checks the appropriate property', function() {
        var nm = R.has('name');
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), true);
        assert.strictEqual(nm(anon), false);
    });

    it('does not check properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.strictEqual(R.has('age', bob), false);
    });

    it('works properly when called with two arguments', function() {
        assert.strictEqual(R.has('name', fred), true);
        assert.strictEqual(R.has('name', anon), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.has, TypeError);
    });
});

},{"..":1,"assert":2}],78:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('hasIn', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    it('returns a function that checks the appropriate property', function() {
        var nm = R.hasIn('name');
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), true);
        assert.strictEqual(nm(anon), false);
    });

    it('checks properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.strictEqual(R.hasIn('age', bob), true);
    });

    it('works properly when called with two arguments', function() {
        assert.strictEqual(R.hasIn('name', fred), true);
        assert.strictEqual(R.hasIn('name', anon), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.hasIn, TypeError);
    });
});

},{"..":1,"assert":2}],79:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('head', function() {
    it('returns undefined for an empty list', function() {
        assert.strictEqual(typeof(R.head([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.strictEqual(R.head(['a', 'b', 'c', 'd']), 'a');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.head(null); }, TypeError);
        assert.throws(function() { R.head(undefined); }, TypeError);
        assert.throws(function() { R.head(); }, TypeError);
    });
});

},{"..":1,"assert":2}],80:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('identity', function() {
    it('returns its first argument', function() {
        assert.strictEqual(R.identity(), undefined);
        assert.strictEqual(R.identity('foo'), 'foo');
        assert.strictEqual(R.identity('foo', 'bar'), 'foo');
    });

    it('has length 1', function() {
        assert.strictEqual(R.identity.length, 1);
    });

    it('is aliased by `I`', function() {
        assert.strictEqual(R.I, R.identity);
    });
});

},{"..":1,"assert":2}],81:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('ifElse', function() {
    var t = function(a) { return a + 1; };
    var identity = function(a) { return a; };
    var isArray = function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

    it('calls the truth case function if the validator returns a truthy value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.strictEqual(R.ifElse(v, t, identity)(10), 11);
    });

    it('calls the false case function if the validator returns a falsey value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.strictEqual(R.ifElse(v, t, identity)('hello'), 'hello');
    });

    it('calls the true case on array items and the false case on non array items', function() {
        var list = [[1, 2, 3, 4, 5], 10, [0, 1], 15];
        var arrayToLength = R.map(R.ifElse(isArray, R.prop('length'), identity));
        assert.deepEqual(arrayToLength(list), [5, 10, 2, 15]);
    });

    it('passes the arguments to the true case function', function() {
        var v = function() { return true; };
        var onTrue = function(a, b) {
            assert.strictEqual(a, 123);
            assert.strictEqual(b, 'abc');
        };
        R.ifElse(v, onTrue, identity)(123, 'abc');
    });

    it('passes the arguments to the false case function', function() {
        var v = function() { return false; };
        var onFalse = function(a, b) {
            assert.strictEqual(a, 123);
            assert.strictEqual(b, 'abc');
        };
        R.ifElse(v, identity, onFalse)(123, 'abc');
    });

    it('returns a curried function', function() {
        var v = function(a) { return typeof a === 'number'; };
        var ifIsNumber = R.ifElse(v);
        assert.strictEqual(ifIsNumber(t, identity)(15), 16);
        assert.strictEqual(ifIsNumber(t, identity)('hello'), 'hello');
    });
});

},{"..":1,"assert":2}],82:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('indexOf', function() {
    it("returns a number indicating an object's position in a list", function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.indexOf(30, list), 3);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.indexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5];
    it('returns the index of the first item', function() {
        assert.strictEqual(R.indexOf(1, input), 0);
    });
    it('returns the index of the last item', function() {
        assert.strictEqual(R.indexOf(5, input), 4);
    });

    var list = [1, 2, 3];
    list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds 1', function() {
        assert.strictEqual(R.indexOf(1, list), 0);
    });
    it('finds 1 and is result strictly it', function() {
        assert.strictEqual(R.indexOf(1, list), 0);
    });
    it('does not find 4', function() {
        assert.strictEqual(R.indexOf(4, list), -1);
    });
    it('Uses strict equality', function() {
        assert.strictEqual(R.indexOf('1', list), -1);
    });

    it('returns -1 for an empty array', function() {
        assert.strictEqual(R.indexOf('x', []), -1);
    });

    it('is curried', function() {
        var curried = R.indexOf(3);
        assert.strictEqual(curried(list), 2);
    });
});

},{"..":1,"assert":2}],83:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('init', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.init([]), []);
    });
    it('returns a new list containing all the elements except the last element of a list', function() {
        assert.deepEqual(R.init(['a', 'b', 'c', 'd']), ['a', 'b', 'c']);
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.init(null); }, TypeError);
        assert.throws(function() { R.init(undefined); }, TypeError);
        assert.throws(function() { R.init(); }, TypeError);
    });
});

},{"..":1,"assert":2}],84:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('insert', function() {
    it('inserts an element into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e']);
    });

    it('inserts another list as an element', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(2, ['s', 't'], list), ['a', 'b', ['s', 't'], 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insert(8)('z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
        assert.deepEqual(R.insert(8, 'z')(list), ['a', 'b', 'c', 'd', 'e', 'z']);
    });
});

},{"..":1,"assert":2}],85:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('insertAll', function() {
    it('inserts a list of elements into the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(2, ['x', 'y', 'z'], list), ['a', 'b', 'x', 'y', 'z', 'c', 'd', 'e']);
    });

    it('appends to the end of the list if the index is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(8, ['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e'];
        assert.deepEqual(R.insertAll(8)(['p', 'q', 'r'], list), ['a', 'b', 'c', 'd', 'e', 'p', 'q', 'r']);
    });
});

},{"..":1,"assert":2}],86:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('installTo', function() {
    it('can be exposed on arbitrary object', function() {
        var sheepda = {};
        R.installTo(sheepda);
        var times2 = function(x) {return x * 2;};
        assert.deepEqual(sheepda.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });
});

},{"..":1,"assert":2}],87:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('intersection', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('combines two lists into the set of common elements', function() {
        assert.deepEqual(R.intersection(M, N), [3, 4]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.intersection(M2, N2), [3, 4]);
    });

    it('does not work for non-primitives (use `intersectionWith`)', function() {
        assert.strictEqual(R.intersection(Mo, No).length, 0);
    });
});

},{"..":1,"assert":2}],88:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('intersectionWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.intersectionWith(eqA, Ro, So), [{a: 3}, {a: 4}]);
    });
});

},{"..":1,"assert":2}],89:[function(require,module,exports){
var assert = require('assert');
var R = require('..');

describe('invert', function() {

    it('takes a list or object and returns an object of lists', function() {
        assert.equal(typeof R.invert([]), 'object');
        assert.equal(typeof R.invert({}), 'object');
        assert.throws(R.invert(1));
        assert.throws(R.invert('1'));
        assert.throws(R.invert(null));
        assert.throws(R.invert(undefined));

        var inverted = R.invert([0]);
        var keys = Object.keys(inverted);
        assert(Array.isArray(inverted[keys.pop()]));
    });

    it('returns the input\'s values as keys, and keys as values of an array', function() {
        assert.deepEqual(R.invert(['a', 'b', 'c']),       {a:['0'], b:['1'], c:['2']});
        assert.deepEqual(R.invert({x:'a', y:'b', z:'c'}), {a:['x'], b:['y'], c:['z']});
    });

    it('puts keys that have the same value into the appropriate an array', function() {
        assert.deepEqual(R.invert(['a', 'b', 'a']), {a:['0', '2'], b:['1']});

        var inverted = R.invert({x:'a', y:'b', z:'a', _id:'a'});
        assert(inverted.a.indexOf('x')   > -1);
        assert(inverted.a.indexOf('z')   > -1);
        assert(inverted.a.indexOf('_id') > -1);
        assert.deepEqual(inverted.b, ['y']);
    });

    // this one is more of a sanity check
    it('is not destructive', function() {
        var input = {x:'a', y:'b', z:'a', _id:'a'};
        R.invert(input);
        assert.deepEqual(input, {x:'a', y:'b', z:'a', _id:'a'});
    });
});

},{"..":1,"assert":2}],90:[function(require,module,exports){
var assert = require('assert');
var R = require('..');

describe('invertObj', function() {

    it('takes a list or object and returns an object', function() {
        assert.equal(typeof R.invertObj([]), 'object');
        assert.equal(typeof R.invertObj({}), 'object');
        assert.throws(R.invertObj(1));
        assert.throws(R.invertObj('1'));
        assert.throws(R.invertObj(null));
        assert.throws(R.invertObj(undefined));
    });

    it('returns the input\'s values as keys, and keys as values', function() {
        assert.deepEqual(R.invertObj(['a', 'b', 'c']),       {a:'0', b:'1', c:'2'});
        assert.deepEqual(R.invertObj({x:'a', y:'b', z:'c'}), {a:'x', b:'y', c:'z'});
    });

    it('prefers the last key found when handling keys with the same value', function() {
        assert.deepEqual(R.invertObj(['a', 'b', 'a']), {a:'2', b:'1'});
        assert.deepEqual(R.invertObj({x:'a', y:'b', z:'a', _id:'a'}), {a: '_id', b: 'y'});
    });

    // this one is more of a sanity check
    it('is not destructive', function() {
        var input = {x:'a', y:'b', z:'a', _id:'a'};
        R.invertObj(input);
        assert.deepEqual(input, {x:'a', y:'b', z:'a', _id:'a'});
    });
});

},{"..":1,"assert":2}],91:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('invokerN', function() {
    var concat2 = R.invokerN(2, 'concat');

    it('returns a function with correct arity', function() {
        assert.strictEqual(concat2.length, 3);
    });

    it('calls the method on the object', function() {
        assert.deepEqual(concat2(3, 4, [1, 2]), [1, 2, 3, 4]);
    });

    it('curries the method call', function() {
        assert.deepEqual(concat2(3)(4)([1, 2]), [1, 2, 3, 4]);
        assert.deepEqual(concat2(3, 4)([1, 2]), [1, 2, 3, 4]);
        assert.deepEqual(concat2(3)(4, [1, 2]), [1, 2, 3, 4]);
    });

    it('returns a function with correct arity when additional parameters are given', function() {
        assert.strictEqual(R.invokerN(2, 'concat', 'foo').length, 2);
    });

    it('applies additional parameters to the method', function() {
        assert.deepEqual(R.invokerN(2, 'concat', 2)(3, [1]), [1, 2, 3]);
    });
});

},{"..":1,"assert":2}],92:[function(require,module,exports){
/* jshint -W053 */

var assert = require('assert');

var R = require('..');


describe('is', function() {
    it('works with built-in types', function() {
        assert.strictEqual(R.is(Array, []), true);
        assert.strictEqual(R.is(Boolean, new Boolean(false)), true);
        assert.strictEqual(R.is(Date, new Date()), true);
        assert.strictEqual(R.is(Function, function() {}), true);
        assert.strictEqual(R.is(Number, new Number(0)), true);
        assert.strictEqual(R.is(Object, {}), true);
        assert.strictEqual(R.is(RegExp, /(?:)/), true);
        assert.strictEqual(R.is(String, new String('')), true);
    });

    it('works with user-defined types', function() {
        function Foo() {}
        function Bar() {}
        Bar.prototype = new Foo();

        var foo = new Foo();
        var bar = new Bar();

        assert.strictEqual(R.is(Foo, foo), true);
        assert.strictEqual(R.is(Bar, bar), true);
        assert.strictEqual(R.is(Foo, bar), true);
        assert.strictEqual(R.is(Bar, foo), false);
    });

    it('is curried', function() {
        var isArray = R.is(Array);
        assert.strictEqual(isArray([]), true);
        assert.strictEqual(isArray({}), false);
    });

    it('considers almost everything an object', function() {
        function Foo() {}
        var foo = new Foo();
        var isObject = R.is(Object);

        assert.strictEqual(isObject(foo), true);
        assert.strictEqual(isObject(function() { return arguments; }()), true);
        assert.strictEqual(isObject([]), true);
        assert.strictEqual(isObject(new Boolean(false)), true);
        assert.strictEqual(isObject(new Date()), true);
        assert.strictEqual(isObject(function() {}), true);
        assert.strictEqual(isObject(new Number(0)), true);
        assert.strictEqual(isObject(/(?:)/), true);
        assert.strictEqual(isObject(new String('')), true);

        assert.strictEqual(isObject(null), false);
        assert.strictEqual(isObject(undefined), false);
    });

    it('does not coerce', function() {
        assert.strictEqual(R.is(Boolean, 1), false);
        assert.strictEqual(R.is(Number, '1'), false);
        assert.strictEqual(R.is(Number, false), false);
    });

    it('recognizes primitives as their object equivalents', function() {
        assert.strictEqual(R.is(Boolean, false), true);
        assert.strictEqual(R.is(Number, 0), true);
        assert.strictEqual(R.is(String, ''), true);
    });

    it('does not consider primitives to be instances of Object', function() {
        assert.strictEqual(R.is(Object, false), false);
        assert.strictEqual(R.is(Object, 0), false);
        assert.strictEqual(R.is(Object, ''), false);
    });

    it('is curried', function() {
        assert(typeof R.is(String) === 'function');
        assert(R.is(String)('s'));
    });

    it('throws on zero arguments', function() {
        assert.throws(R.is, TypeError);
    });
});

},{"..":1,"assert":2}],93:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('isArrayLike', function() {
    it('is true for Arrays', function() {
        assert(R.isArrayLike([]));
        assert(R.isArrayLike([1, 2, 3, 4]));
        assert(R.isArrayLike([null]));
    });

    it('is true for arguments', function() {
        function test() {
            return R.isArrayLike(arguments);
        }
        assert(test());
        assert(test(1, 2, 3));
        assert(test(null));
    });

    it('is false for Strings', function() {
        assert.strictEqual(R.isArrayLike(''), false);
        assert.strictEqual(R.isArrayLike('abcdefg'), false);
    });

    it('is true for arbitrary objects with numeric length, if extreme indices are defined', function() {
        var obj1 = {length: 0};
        var obj2 = {0: 'something', length: 0};
        var obj3 = {0: void 0, length: 0};
        var obj4 = {0: 'zero', 1: 'one', length: 2};
        var obj5 = {0: 'zero', length: 2};
        var obj6 = {1: 'one', length: 2};
        assert(R.isArrayLike(obj1));
        assert(R.isArrayLike(obj2));
        assert(R.isArrayLike(obj3));
        assert(R.isArrayLike(obj4));
        assert(!R.isArrayLike(obj5));
        assert(!R.isArrayLike(obj6));
    });

    it('is false for everything else', function() {
        assert.strictEqual(R.isArrayLike(), false);
        assert.strictEqual(R.isArrayLike(1), false);
        assert.strictEqual(R.isArrayLike({}), false);
        assert.strictEqual(R.isArrayLike(false), false);
        assert.strictEqual(R.isArrayLike(function() {}), false);
    });
});

},{"..":1,"assert":2}],94:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('isEmpty', function() {
    it('returns false for null', function() {
        assert.strictEqual(R.isEmpty(null), false);
    });

    it('returns false for undefined', function() {
        assert.strictEqual(R.isEmpty(undefined), false);
        assert.strictEqual(R.isEmpty(), false);
    });

    it('returns true for empty string', function() {
        assert.strictEqual(R.isEmpty(''), true);
    });

    it('returns true for empty array', function() {
        assert.strictEqual(R.isEmpty([]), true);
    });

    it('returns true for empty arguments object', function() {
        assert.strictEqual(R.isEmpty((function() { return arguments; }())), true);
    });

    it('returns true for object with own length property whose value is 0', function() {
        assert.strictEqual(R.isEmpty({length: 0, x: 1, y: 2}), true);
    });

    it('returns true for object with inherited length property whose value is 0', function() {
        function Empty() {}
        Empty.prototype.length = 0;
        assert.strictEqual(R.isEmpty(new Empty()), true);
    });

    it('returns false for every other value', function() {
        assert.strictEqual(R.isEmpty(0), false);
        assert.strictEqual(R.isEmpty(NaN), false);
        assert.strictEqual(R.isEmpty(['']), false);
        assert.strictEqual(R.isEmpty({}), false);

        function Nonempty() {}
        Nonempty.prototype.length = 1;
        assert.strictEqual(R.isEmpty(new Nonempty()), false);
    });
});

},{"..":1,"assert":2}],95:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('isSet', function() {
    it('returns true if a list is composed of unique elements', function() {
        var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
        assert.strictEqual(R.isSet(list), false);
        assert.strictEqual(R.isSet([3, 1, 4, 2, 5, 7, 9]), true);
    });

    it('returns true for an empty array', function() {
        assert.strictEqual(R.isSet([]), true);
    });

});

},{"..":1,"assert":2}],96:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('join', function() {
    it("concatenates a list's elements to a string, with an seperator string between elements", function() {
        var list = [1, 2, 3, 4];
        assert.strictEqual(R.join('~', list), '1~2~3~4');
    });
});

},{"..":1,"assert":2}],97:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('keys', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's own keys", function() {
        assert.deepEqual(R.keys(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('works with hasOwnProperty override', function() {
        assert.deepEqual(R.keys({
            /* jshint -W001 */
            hasOwnProperty: false
            /* jshint +W001 */
        }), ['hasOwnProperty']);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.keys(cobj).sort(), ['a', 'b']);
    });
});

},{"..":1,"assert":2}],98:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('keysIn', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's keys", function() {
        assert.deepEqual(R.keysIn(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it("includes the given object's prototype properties", function() {
        assert.deepEqual(R.keysIn(cobj).sort(), ['a', 'b', 'x', 'y']);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });
});

},{"..":1,"assert":2}],99:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('lPartial', function() {
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('caches the initially supplied left-most parameters in the generated function', function() {
        var f = R.lPartial(disc, 3);
        assert.strictEqual(f(7, 4), 1);
        var g = R.lPartial(disc, 3, 7);
        assert.strictEqual(g(4), 1);
    });

    it('correctly reports the arity of the new function', function() {
        var f = R.lPartial(disc, 3);
        assert.strictEqual(f.length, 2);
        var g = R.lPartial(disc, 3, 7);
        assert.strictEqual(g.length, 1);
    });
});

},{"..":1,"assert":2}],100:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('last', function() {
    it('returns undefined for an empty list', function() {
        assert.strictEqual(typeof(R.last([])),  'undefined');
    });
    it('returns the first element of a list', function() {
        assert.strictEqual(R.last(['a', 'b', 'c', 'd']), 'd');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.last(null); }, TypeError);
        assert.throws(function() { R.last(undefined); }, TypeError);
        assert.throws(function() { R.last(); }, TypeError);
    });
});

},{"..":1,"assert":2}],101:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('lastIndexOf', function() {
    it("returns a number indicating an object's last position in a list", function() {
        var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
        assert.strictEqual(R.lastIndexOf(30, list), 7);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.lastIndexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5, 1];
    it('returns the last index of the first item', function() {
        assert.strictEqual(R.lastIndexOf(1, input), 5);
    });
    it('returns the index of the last item', function() {
        assert.strictEqual(R.lastIndexOf(5, input), 4);
    });

    var list = ['a', 1, 'a'];
    list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds a', function() {
        assert.strictEqual(R.lastIndexOf('a', list), 2);
    });
    it('does not find c', function() {
        assert.strictEqual(R.lastIndexOf('c', list), -1);
    });
    it('Uses strict equality', function() {
        assert.strictEqual(R.lastIndexOf('1', list), -1);
    });
    it('returns -1 for an empty array', function() {
        assert.strictEqual(R.lastIndexOf('x', 2, []), -1);
        assert.strictEqual(R.lastIndexOf('x', -5, []), -1);
    });

    it('is curried', function() {
        var curried = R.lastIndexOf('a');
        assert.strictEqual(curried(list), 2);
    });
});

},{"..":1,"assert":2}],102:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('length', function() {
    it('returns the length of a list', function() {
        assert.strictEqual(R.length([]), 0);
        assert.strictEqual(R.length(['a', 'b', 'c', 'd']), 4);
    });

    it('returns the length of a string', function() {
        assert.strictEqual(R.length(''), 0);
        assert.strictEqual(R.length('xyz'), 3);
    });

    it('returns the length of a function', function() {
        assert.strictEqual(R.length(function() {}), 0);
        assert.strictEqual(R.length(function(x, y, z) { return z; }), 3);
    });

    it('returns the length of an arguments object', function() {
        assert.strictEqual(R.length((function() { return arguments; }())), 0);
        assert.strictEqual(R.length((function() { return arguments; }('x', 'y', 'z'))), 3);
    });

    it('returns NaN for value of unexpected type', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.length(0)));
        assert(isNaN_(R.length({})));
        assert(isNaN_(R.length(null)));
        assert(isNaN_(R.length(undefined)));
        assert(isNaN_(R.length()));
    });

    it('returns NaN for length property of unexpected type', function() {
        function isNaN_(x) { return x !== x; }
        assert(isNaN_(R.length({length: ''})));
        assert(isNaN_(R.length({length: '1.23'})));
        assert(isNaN_(R.length({length: null})));
        assert(isNaN_(R.length({length: undefined})));
        assert(isNaN_(R.length({})));
    });
});

},{"..":1,"assert":2}],103:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('lens', function() {

    function getHead(obj) {
        return obj[0];
    }

    function setHead(val, obj) {
        return [val].concat(obj.slice(1));
    }

    function getPhrase(obj) {
        return obj.catchphrase;
    }

    function setPhrase(val, obj) {
        var out = R.cloneObj(obj);
        out.catchphrase = val;
        return out;
    }

    var headOf = R.lens(getHead, setHead);
    var phraseLens = R.lens(getPhrase, setPhrase);

    it('returns a function with `set` and `map` properties', function() {
        assert(typeof phraseLens === 'function');
        assert(typeof phraseLens.set === 'function');
        assert(typeof phraseLens.map === 'function');
    });

    it('retrieves values from inside an object as defined by the `getter` function', function() {
        assert.strictEqual(headOf([10, 20, 30, 40]), 10);
        assert.strictEqual(headOf(['a', 'b', 'c', 'd']), 'a');
    });

    it('"sets" properties on an object and return the new object', function() {
        assert.deepEqual(headOf.set('cow', [1, 2, 3, 4]), ['cow', 2, 3, 4]);
    });

    it('the setter need not (should not) mutate the object', function() {
        var obj = {x: 100, y: 200, catchphrase: 'zing!'};
        assert.deepEqual(phraseLens.set('kapow!', obj), {x: 100, y: 200, catchphrase: 'kapow!'});
        assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
    });

    it('maps a property from getter to setter', function() {
        function plus10(x) { return x + 10; }
        assert.deepEqual(headOf.map(plus10, [-9, 2, 3]), [1, 2, 3]);
    });

    it('the modifier need not (should not) mutate the object', function() {
        var obj = {x: 100, y: 200, catchphrase: 'zing!'};
        function uc(s) { return s.toUpperCase(); }
        assert.deepEqual(phraseLens.map(uc, obj), {x: 100, y: 200, catchphrase: 'ZING!'});
        assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
    });

    it('is curried', function() {
        var get1 = function(x) { return x[1]; };
        var set1 = function(val, obj) {
            var out = obj.concat();
            out.splice(1, 1, val);
            return out;
        };
        var x2 = function(x) { return x * 2; };
        var partial = R.lens(get1);
        assert(typeof partial === 'function');
        assert(typeof partial(set1) === 'function');
        assert.deepEqual(partial(set1)(['zeroth', 'first', 'second']), 'first');
        assert.deepEqual(partial(set1)([10, 20, 30]), 20);
        assert.deepEqual(partial(set1).set('zoom', [10, 20, 30]), [10, 'zoom', 30]);
        assert.deepEqual(partial(set1).map(x2, [10, 20, 30]), [10, 40, 30]);
    });
});

},{"..":1,"assert":2}],104:[function(require,module,exports){
/* jshint -W053 */

var assert = require('assert');

var R = require('..');


var add3 = R.curry(function add3(a, b, c) {
    return a + b + c;
});
var add4 = R.curry(function add4(a, b, c, d) {
    return a + b + c + d;
});
var add5 = R.curry(function add5(a, b, c, d, e) {
    return a + b + c + d + e;
});
var madd3 = R.lift(add3);
var madd4 = R.lift(add4);
var madd5 = R.lift(add5);


describe('lift', function() {

    it('returns a function if called with just a function', function() {
        assert(typeof R.lift(R.add) === 'function');
    });

    it('produces a cross-product of array values', function() {
        assert.deepEqual(madd3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
        assert.deepEqual(madd3([1], [2], [3]), [6]);
        assert.deepEqual(madd3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
    });

    it('can lift functions of any arity', function() {
        assert.deepEqual(madd3([1, 10], [2], [3]), [6, 15]);
        assert.deepEqual(madd4([1, 10], [2], [3], [40]), [46, 55]);
        assert.deepEqual(madd5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.lift);
    });
});

},{"..":1,"assert":2}],105:[function(require,module,exports){
/* jshint -W053 */

var assert = require('assert');

var R = require('..');


var addN = function() {
    return Array.prototype.reduce.call(arguments, function(a, b) { return a + b; }, 0);
};
var add3 = R.curry(function add3(a, b, c) {
    return a + b + c;
});


describe('liftN', function() {

    var addN3 = R.liftN(3, addN);
    var addN4 = R.liftN(4, addN);
    var addN5 = R.liftN(5, addN);

    it('returns a function', function() {
        assert(typeof R.liftN(3, add3) === 'function');
    });

    it('limits a variadic function to the specified arity', function() {
        assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
    });

    it('produces a cross-product of array values', function() {
        assert.deepEqual(addN3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
        assert.deepEqual(addN3([1], [2], [3]), [6]);
        assert.deepEqual(addN3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
    });

    it('can lift functions of any arity', function() {
        assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
        assert.deepEqual(addN4([1, 10], [2], [3], [40]), [46, 55]);
        assert.deepEqual(addN5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
    });

    it('is curried', function() {
        var f4 = R.liftN(4);
        assert(typeof f4 === 'function');
        assert.deepEqual(f4(addN)([1], [2], [3], [4, 5]), [10, 11]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.lift);
    });
});

},{"..":1,"assert":2}],106:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('lt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lt(3, 5));
        assert(!R.lt(6, 4));
        assert(!R.lt(7.0, 7.0));
        assert(R.lt('abc', 'xyz'));
        assert(!R.lt('abcd', 'abc'));
    });

    it('is curried', function() {
        var gt5 = R.lt(5);
        assert(gt5(10));
        assert(!gt5(5));
        assert(!gt5(3));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var lt5 = R.lt(__, 5);
        assert(!lt5(10));
        assert(!lt5(5));
        assert(lt5(3));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lt, TypeError);
    });
});

},{"..":1,"assert":2}],107:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('lte', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lte(3, 5));
        assert(!R.lte(6, 4));
        assert(R.lte(7.0, 7.0));
        assert(R.lte('abc', 'xyz'));
        assert(!R.lte('abcd', 'abc'));
    });

    it('is curried', function() {
        var gte20 = R.lte(20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var upTo20 = R.lte(__, 20);
        assert(upTo20(10));
        assert(upTo20(20));
        assert(!upTo20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lte, TypeError);
    });
});

},{"..":1,"assert":2}],108:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('map', function() {
    var times2 = function(x) {return x * 2;};
    var add1 = function(x) {return x + 1;};

    it('maps simple functions over arrays', function() {
        assert.deepEqual(R.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('is automatically curried', function() {
        var inc = R.map(add1);
        assert.deepEqual(inc([1, 2, 3]), [2, 3, 4]);
    });

    it('correctly reports the arity of curried versions', function() {
        var inc = R.map(add1);
        assert.strictEqual(inc.length, 1);
    });

});

},{"..":1,"assert":2}],109:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('mapIndexed', function() {
    var times2 = function(x) {return x * 2;};
    var addIndexed = function(x, idx) {return x + idx;};
    var squareEnds = function(x, idx, list) {
        return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };

    it('works just like a normal map', function() {
        assert.deepEqual(R.mapIndexed(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(R.mapIndexed(addIndexed, [8, 6, 7, 5, 3, 0, 9]), [8 + 0, 6 + 1, 7 + 2, 5 + 3, 3 + 4, 0 + 5, 9 + 6]);
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(R.mapIndexed(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

    it('is automatically curried', function() {
        var makeSquareEnds = R.mapIndexed(squareEnds);
        assert.deepEqual(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });
});

},{"..":1,"assert":2}],110:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('mapObj', function() {
    var square = function(n) {return n * n;};

    it('runs the given function over each of the object properties', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(R.mapObj(square, obj), {a: 1, b: 4, c: 9});
    });
});

},{"..":1,"assert":2}],111:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('mapObjIndexed', function() {
    var times2 = function(x) {return x * 2;};
    var addIndexed = function(x, key) {return x + key;};
    var squareVowels = function(x, key) {
        var vowels = ['a', 'e', 'i', 'o', 'u'];
        return R.contains(key, vowels) ? x * x : x;
    };

    it('works just like a normal mapObj', function() {
        assert.deepEqual(R.mapObjIndexed(times2, {a: 1, b: 2, c: 3, d: 4}), {a: 2, b: 4, c: 6, d: 8});
    });

    it('passes the index as a second parameter to the callback', function() {
        assert.deepEqual(R.mapObjIndexed(addIndexed, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: '8a', b: '6b', c: '7c', d: '5d', e: '3e', f: '0f', g: '9g'});
    });

    it('passes the entire list as a third parameter to the callback', function() {
        assert.deepEqual(R.mapObjIndexed(squareVowels, {a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });

    it('is automatically curried', function() {
        var makeSquareVowels = R.mapObjIndexed(squareVowels);
        assert.deepEqual(makeSquareVowels({a: 8, b: 6, c: 7, d: 5, e: 3, f: 0, g: 9}),
          {a: 64, b: 6, c: 7, d: 5, e: 9, f: 0, g: 9});
    });
});

},{"..":1,"assert":2}],112:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('match', function() {
    var re = /[A-Z]\d\d\-[a-zA-Z]+/;

    it('determines whether a string matches a regex', function() {
        assert.strictEqual(R.match(re, 'B17-afn').length, 1);
        assert.strictEqual(R.match(re, 'B1-afn'), null);
    });

    it('is automatically curried', function() {
        var format = R.match(re);
        assert.strictEqual(format('B17-afn').length, 1);
        assert.strictEqual(format('B1-afn'), null);
    });
});

},{"..":1,"assert":2}],113:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('mathMod', function() {
    it('requires integer arguments', function() {
        assert.notStrictEqual(R.mathMod('s', 3), R.mathMod('s', 3));
        assert.notStrictEqual(R.mathMod(3, 's'), R.mathMod(3, 's'));
        assert.notStrictEqual(R.mathMod(12.2, 3), R.mathMod(12.2, 3));
        assert.notStrictEqual(R.mathMod(3, 12.2), R.mathMod(3, 12.2));
    });

    it('behaves differently than JS modulo', function() {
        assert.notStrictEqual(R.mathMod(-17, 5), -17 % 5);
        assert.notStrictEqual(R.mathMod(17.2, 5), 17.2 % 5);
        assert.notStrictEqual(R.mathMod(17, -5), 17 % -5);
    });

    it('computes the true modulo function', function() {
        assert.strictEqual(R.mathMod(-17, 5), 3);
        assert.strictEqual(isNaN(R.mathMod(17, -5)), true);
        assert.strictEqual(isNaN(R.mathMod(17, 0)), true);
        assert.strictEqual(isNaN(R.mathMod(17.2, 5)), true);
        assert.strictEqual(isNaN(R.mathMod(17, 5.5)), true);
    });

    it('is curried', function() {
        var f = R.mathMod(29);
        assert.strictEqual(f(6), 5);
    });


    it('behaves right curried when passed `undefined` for its first argument', function() {
        var mod5 = R.modulo(void 0, 5);
        assert.strictEqual(mod5(12), 2);
        assert.strictEqual(mod5(8), 3);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.mathMod);
    });
});

},{"..":1,"assert":2}],114:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('max', function() {
    it('calculates the largest value of a list', function() {
        assert.strictEqual(R.max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.strictEqual(R.max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.strictEqual(R.max([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 52);
    });

    it('finds max in any position', function() {
        assert.strictEqual(R.max([6, 2, 1, 3]), 6);
        assert.strictEqual(R.max([3, 6, 2, 1]), 6);
        assert.strictEqual(R.max([3, 1, 6, 2]), 6);
        assert.strictEqual(R.max([3, 1, 2, 6]), 6);
    });

    it('returns -Infinity for an empty list', function() {
        assert.strictEqual(R.max([]), -Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.max(['4', '1', '100', '10', '2']), 100);
    });
});

},{"..":1,"assert":2}],115:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('maxBy', function() {
    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.maxBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });

    it('returns undefined for the empty list', function() {
        assert.strictEqual(R.maxBy(R.prop('x'), []), undefined);
    });

    it('is properly curried', function() {
        var highestX = R.maxBy(R.prop('x'));
        assert.deepEqual(highestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });
});

},{"..":1,"assert":2}],116:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('memoize', function() {
    it('calculates the value for a given input only once', function() {
        var ctr = 0;
        var fib = R.memoize(function(n) {ctr++; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        var result = fib(10);
        assert.strictEqual(result, 55);
        assert.strictEqual(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
    });

    it('handles multiple parameters', function() {
        var f = R.memoize(function(a, b, c) {return a + ', ' + b + c;});
        assert.strictEqual(f('Hello', 'World' , '!'), 'Hello, World!');
        assert.strictEqual(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
        assert.strictEqual(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
        assert.strictEqual(f('Hello', 'World' , '!'), 'Hello, World!');
    });

    it('returns undefined if supplied no parameters for a positive arity function', function() {
        var fib = R.memoize(function(n) {return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        assert.strictEqual(typeof fib(), 'undefined');
    });

    it('does not rely on reported arity', function() {
        var identity = R.memoize(function() { return arguments[0]; });
        assert.strictEqual(identity('x'), 'x');
        assert.strictEqual(identity('y'), 'y');
    });
});

},{"..":1,"assert":2}],117:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('min', function() {
    it('calculates the smallest value of a list', function() {
        assert.strictEqual(R.min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.strictEqual(R.min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.strictEqual(R.min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.strictEqual(R.min([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 1);
    });

    it('finds min in any position', function() {
        assert.strictEqual(R.min([0, 2, 1, 3]), 0);
        assert.strictEqual(R.min([3, 0, 2, 1]), 0);
        assert.strictEqual(R.min([3, 1, 0, 2]), 0);
        assert.strictEqual(R.min([3, 1, 2, 0]), 0);
    });

    it('returns Infinity for an empty list', function() {
        assert.strictEqual(R.min([]), Infinity);
    });

    it('returns a number', function() {
        assert.strictEqual(R.min(['4', '1', '100', '10', '2']), 1);
    });
});

},{"..":1,"assert":2}],118:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('minBy', function() {
    it('calculates the smallest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.minBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });

    it('returns null for the empty list', function() {
        assert.strictEqual(typeof(R.minBy(R.prop('x'), [])), 'undefined');
    });

    it('is properly curried', function() {
        var lowestX = R.minBy(R.prop('x'));
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});

},{"..":1,"assert":2}],119:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('mixin', function() {
    it('takes two objects, merges their own properties and returns a new object', function() {
        var a = {w: 1, x: 2};
        var b = {y: 3, z: 4};
        assert.deepEqual(R.mixin(a, b), {w: 1, x: 2, y: 3, z: 4});
    });

    it('overrides properties in the first object with properties in the second object', function() {
        var a = {w: 1, x: 2};
        var b = {w: 100, y: 3, z: 4};
        assert.deepEqual(R.mixin(a, b), {w: 100, x: 2, y: 3, z: 4});
    });

    it('is not destructive', function() {
        var a = {w: 1, x: 2};
        var res = R.mixin(a, {x: 5});
        assert.notStrictEqual(a, res);
        assert.deepEqual(res, {w: 1, x: 5});
    });

    it('reports only own properties', function() {
        var a = {w: 1, x: 2};
        function Cla() {}
        Cla.prototype.x = 5;
        assert.deepEqual(R.mixin(new Cla(), a), {w: 1, x: 2});
        assert.deepEqual(R.mixin(a, new Cla()), {w: 1, x: 2});
    });

    it('is curried', function() {
        var curried = R.mixin({w: 1, x: 2});
        var b = {y: 3, z: 4};
        assert.deepEqual(curried(b), {w: 1, x: 2, y: 3, z: 4});
    });
});

},{"..":1,"assert":2}],120:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('modulo', function() {
    it('divides the first param by the second and returns the remainder', function() {
        assert.strictEqual(R.modulo(100, 2), 0);
        assert.strictEqual(R.modulo(100, 3), 1);
        assert.strictEqual(R.modulo(100, 17), 15);
    });

    it('is curried', function() {
        var hundredMod = R.modulo(100);
        assert.strictEqual(typeof hundredMod, 'function');
        assert.strictEqual(hundredMod(2), 0);
        assert.strictEqual(hundredMod(3), 1);
        assert.strictEqual(hundredMod(17), 15);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var isOdd = R.modulo(void 0, 2);
        assert.strictEqual(typeof isOdd, 'function');
        assert.strictEqual(isOdd(3), 1);
        assert.strictEqual(isOdd(198), 0);
    });

    it('preserves javascript-style modulo evaluation for negative numbers', function() {
        assert.strictEqual(R.modulo(-5, 4), -1);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.modulo, TypeError);
    });
});

},{"..":1,"assert":2}],121:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('multiply', function() {
    it('adds together two numbers', function() {
        assert.strictEqual(R.multiply(6, 7), 42);
    });

    it('is automatically curried', function() {
        var dbl = R.multiply(2);
        assert.strictEqual(dbl(15), 30);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.multiply, TypeError);
    });
});

},{"..":1,"assert":2}],122:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('nAry', function() {

    function toArray(args) { return Array.prototype.slice.call(args, 0); }

    it('turns multiple-argument function into a nullary one', function() {
        var fn = R.nAry(0, function(x, y, z) { void z; return toArray(arguments); });
        assert.strictEqual(fn.length, 0);
        assert.deepEqual(fn(1, 2, 3), []);
    });

    it('turns multiple-argument function into a ternary one', function() {
        var fn = R.nAry(3, function(a, b, c, d) { void d; return toArray(arguments); });
        assert.strictEqual(fn.length, 3);
        assert.deepEqual(fn(1, 2, 3, 4), [1, 2, 3]);
        assert.deepEqual(fn(1), [1, undefined, undefined]);
    });

    it('creates functions of arity less than or equal to ten', function() {
        var fn = R.nAry(10, function() { return toArray(arguments); });
        assert.strictEqual(fn.length, 10);
        assert.deepEqual(fn.apply(null, R.range(0, 25)), R.range(0, 10));

        var undefs = fn();
        var ns = R.repeat(undefined, 10);
        assert(undefs.length === ns.length);
        var idx = undefs.length;
        while (--idx) {
            assert(undefs[idx] === ns[idx]);
        }
    });

    it('throws if n is greater than ten', function() {
        assert.throws(function() {
            R.nAry(11, function() {});
        }, function(err) {
            return (err instanceof Error &&
                    err.message === 'First argument to nAry must be a non-negative integer no greater than ten');
        });
    });

});

},{"..":1,"assert":2}],123:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('not', function() {
    it('creates boolean-returning function that reverses another', function() {
        var even = function(x) {return x % 2 === 0;};
        var f = R.not(even);
        assert.strictEqual(f(8), false);
        assert.strictEqual(f(13), true);
    });

    it('accepts a function that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var f = R.not(between);
        assert.strictEqual(f(4, 5, 11), false);
        assert.strictEqual(f(12, 2, 6), true);
    });
});

},{"..":1,"assert":2}],124:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('nth', function() {
    var list = ['foo', 'bar', 'baz', 'quux'];

    it('accepts positive offsets', function() {
        assert.strictEqual(R.nth(0, list), 'foo');
        assert.strictEqual(R.nth(1, list), 'bar');
        assert.strictEqual(R.nth(2, list), 'baz');
        assert.strictEqual(R.nth(3, list), 'quux');
        assert.strictEqual(R.nth(4, list), undefined);
    });
    it('accepts negative offsets', function() {
        assert.strictEqual(R.nth(-1, list), 'quux');
        assert.strictEqual(R.nth(-2, list), 'baz');
        assert.strictEqual(R.nth(-3, list), 'bar');
        assert.strictEqual(R.nth(-4, list), 'foo');
        assert.strictEqual(R.nth(-5, list), undefined);
    });
    it('is curried', function() {
        assert.strictEqual(R.nth(0)(list), 'foo');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.nth(0, null); }, TypeError);
        assert.throws(function() { R.nth(0, undefined); }, TypeError);
    });
});

},{"..":1,"assert":2}],125:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('nthArg', function() {
    it('returns a function which returns its nth argument', function() {
        assert.strictEqual(R.nthArg(0)('foo', 'bar'), 'foo');
        assert.strictEqual(R.nthArg(1)('foo', 'bar'), 'bar');
        assert.strictEqual(R.nthArg(2)('foo', 'bar'), undefined);
    });

    it('accepts negative offsets', function() {
        assert.strictEqual(R.nthArg(-1)('foo', 'bar'), 'bar');
        assert.strictEqual(R.nthArg(-2)('foo', 'bar'), 'foo');
        assert.strictEqual(R.nthArg(-3)('foo', 'bar'), undefined);
    });

    it('returns a function with length 0', function() {
        assert.strictEqual(R.nthArg(2).length, 0);
    });
});

},{"..":1,"assert":2}],126:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('of', function() {
    it('returns its argument as an Array', function() {
        assert.deepEqual(R.of(100), [100]);
        assert.deepEqual(R.of([100]), [[100]]);
        assert.deepEqual(R.of(null), [null]);
        assert.deepEqual(R.of(undefined), [undefined]);
        assert.deepEqual(R.of([]), [[]]);
    });
});

},{"..":1,"assert":2}],127:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('omit', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('copies an object omitting the listed properties', function() {
        assert.deepEqual(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
    });

    it('includes prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
    });

    it('is automatically curried', function() {
        var skipAB = R.omit(['a', 'b']);
        assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
    });
});

},{"..":1,"assert":2}],128:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('once', function() {
    it('returns a function that calls the supplied function only the first time called', function() {
        var ctr = 0;
        var fn = R.once(function() {ctr++;});
        fn();
        assert.strictEqual(ctr, 1);
        fn();
        assert.strictEqual(ctr, 1);
        fn();
        assert.strictEqual(ctr, 1);
    });

    it('passes along arguments supplied', function() {
        var fn = R.once(function(a, b) {return a + b;});
        var result = fn(5, 10);
        assert.strictEqual(result, 15);
    });

    it('retains and returns the first value calculated, even if different arguments are passed later', function() {
        var ctr = 0;
        var fn = R.once(function(a, b) {ctr++; return a + b;});
        var result = fn(5, 10);
        assert.strictEqual(result, 15);
        assert.strictEqual(ctr, 1);
        result = fn(20, 30);
        assert.strictEqual(result, 15);
        assert.strictEqual(ctr, 1);
    });
});

},{"..":1,"assert":2}],129:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('op', function() {
    function lt(a, b) { return a < b; }
    var olt = R.op(lt);
    var placeholder = R.__;

    it('converts a binary function to enable infix-style behavior via placeholder', function() {
        assert(typeof olt === 'function');
    });

    it('is curried', function() {
        var colt = olt(10);
        assert(typeof colt === 'function');
        assert(colt(11));
        assert(!colt(9));
    });

    it('can take a placeholder for the first arg', function() {
        var lt100 = olt(placeholder, 100);
        assert(typeof lt100 === 'function');
        assert(lt100(99));
    });

    it('can take a placeholder for its only arg', function() {
        var ltX = olt(placeholder);
        var lt99 = ltX(99);
        assert(typeof ltX === 'function');
        assert(typeof lt99 === 'function');
        assert(lt99(98));
    });

    it('returns functions with the correct arity', function() {
        assert.strictEqual(R.op(lt).length, 2);
        assert.strictEqual(R.op(lt)(placeholder).length, 2);
        assert.strictEqual(R.op(lt)(placeholder, 1000).length, 1);
        assert.strictEqual(R.op(lt)(1000).length, 1);
    });

    it('can work with methods that may take extra arguments', function() {
        var items = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: 4},
            {value: 5}
        ];
        var gt = R.op(function(a, b) { return a > b; });
        if (Array.prototype.filter) {
            assert.deepEqual(items.filter(R.where({value: gt(3)})), [{value: 1}, {value: 2}]);
            assert.deepEqual(items.filter(R.where({value: gt(R.__, 3)})), [{value: 4}, {value: 5}]);
            assert.deepEqual(items.filter(R.where({value: gt(R.__)(3)})), [{value: 4}, {value: 5}]);
        }
        assert(gt(R.__, 3)(4));
        assert(gt(R.__, 3)(4, {}));
    });

    it('throws an exception given no arguments', function() {
        assert.throws(R.op);
        assert.throws(olt);
    });
});

},{"..":1,"assert":2}],130:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('or', function() {
    it('combines two boolean-returning functions into one', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var f = R.or(even, gt10);
        assert.strictEqual(f(8), true);
        assert.strictEqual(f(13), true);
        assert.strictEqual(f(7), false);
    });

    it('accepts functions that take multiple parameters', function() {
        var between = function(a, b, c) {return a < b && b < c;};
        var total20 = function(a, b, c) {return a + b + c === 20;};
        var f = R.or(between, total20);
        assert.strictEqual(f(4, 5, 8), true);
        assert.strictEqual(f(12, 2, 6), true);
        assert.strictEqual(f(7, 5, 1), false);
    });

    it('does not evaluate the second expression if the first one is true', function() {
        var T = function() { return true; };
        var Z = function() { effect = 'Z got evaluated'; };
        var effect = 'not evaluated';
        R.or(T, Z);
        assert.strictEqual(effect, 'not evaluated');
    });

    it('is curried', function() {
        var even = function(x) {return x % 2 === 0;};
        var gt10 = function(x) {return x > 10;};
        var evenOr = R.or(even);
        assert.strictEqual(typeof evenOr(gt10), 'function');
        assert.strictEqual(evenOr(gt10)(11), true);
        assert.strictEqual(evenOr(gt10)(9), false);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.or, TypeError);
    });
});

},{"..":1,"assert":2}],131:[function(require,module,exports){
var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('pCompose', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}

    it('handles promises', function() {
        var timesTwo = function(a) {return a * 2;};
        var multAsync = function(a, b) {return Q.when(a * b);};
        return R.pCompose(timesTwo, multAsync)(2, 3)
            .then(function(result) {
                assert.strictEqual(result, 12);
            });
    });

    it('does not get tripped up by fake thenables', function() {
        var timesTwo = function(a) {return a.then * 2;};
        var multAsync = function(a, b) {return {then: a * b};};
        assert.strictEqual(R.pCompose(timesTwo, multAsync)(2, 3), 12);
    });

    it('returns a function with arity == rightmost argument', function() {
        function a2(x, y) { void y; return 'A2'; }
        function a3(x, y) { void y; return Q.when('A2'); }
        function a4(x, y) { void y; return 'A2'; }

        var f1 = R.compose(b, a);
        assert.strictEqual(f1.length, a.length);
        var f2 = R.compose(b, a2);
        assert.strictEqual(f2.length, a2.length);
        var f3 = R.compose(b, a3);
        assert.strictEqual(f3.length, a3.length);
        var f4 = R.compose(b, a4);
        assert.strictEqual(f4.length, a4.length);
    });
});

},{"..":1,"assert":2,"q":7}],132:[function(require,module,exports){
var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('pPipe', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}

    it('handles promises', function() {
        var plusOne = function(a) {return a + 1;};
        var multAsync = function(a, b) {return Q.when(a * b);};
        return R.pPipe(multAsync, plusOne)(2, 3)
            .then(function(result) {
                assert.strictEqual(result, 7);
            });
    });

    it('returns a function with arity == leftmost argument', function() {
        function a2(x, y) { void y; return 'A2'; }
        function a3(x, y) { void y; return Q.when('A2'); }
        function a4(x, y) { void y; return 'A2'; }

        var f1 = R.pPipe(a, b);
        assert.strictEqual(f1.length, a.length);
        var f2 = R.pPipe(a2, b);
        assert.strictEqual(f2.length, a2.length);
        var f3 = R.pPipe(a3, b);
        assert.strictEqual(f3.length, a3.length);
        var f4 = R.pPipe(a4, b);
        assert.strictEqual(f4.length, a4.length);
    });
});

},{"..":1,"assert":2,"q":7}],133:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('partition', function() {
    it('splits a list into two lists according to a predicate', function() {
        var pred = function(n) { return n % 2; };
        assert.deepEqual(R.partition(pred, []), [[], []]);
        assert.deepEqual(R.partition(pred, [0, 2, 4, 6]), [[], [0, 2, 4, 6]]);
        assert.deepEqual(R.partition(pred, [1, 3, 5, 7]), [[1, 3, 5, 7], []]);
        assert.deepEqual(R.partition(pred, [0, 1, 2, 3]), [[1, 3], [0, 2]]);
    });

    it('is curried', function() {
        var polarize = R.partition(Boolean);
        assert.deepEqual(polarize([true, 0, 1, null]), [[true, 1], [0, null]]);
    });
});

},{"..":1,"assert":2}],134:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('path', function() {
    var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
    it('takes a dot-delimited path and an object and returns the value at the path or undefined', function() {
        var obj = {
            a: {
                b: {
                    c: 100,
                    d: 200
                },
                e: {
                    f: [100, 101, 102],
                    g: 'G'
                },
                h: 'H'
            },
            i: 'I',
            j: ['J']
        };
        assert.strictEqual(R.path('a.b.c', obj), 100);
        assert.strictEqual(R.path('', obj), undefined);
        assert.strictEqual(R.path('a.e.f.1', obj), 101);
        assert.strictEqual(R.path('j.0', obj), 'J');
        assert.strictEqual(R.path('j.1', obj), undefined);
        assert.strictEqual(R.path('a.b.c', null), undefined);
    });

    it("gets a deep property's value from objects", function() {
        assert.strictEqual(R.path('a.b.c', deepObject), 'c');
        assert.strictEqual(R.path('a', deepObject), deepObject.a);
    });

    it('returns undefined for items not found', function() {
        assert.strictEqual(R.path('a.b.foo', deepObject), undefined);
        assert.strictEqual(R.path('bar', deepObject), undefined);
    });

    it('returns undefined for null/undefined', function() {
        assert.strictEqual(R.path('toString', null), undefined);
        assert.strictEqual(R.path('toString', undefined), undefined);
    });

    it('works with falsy items', function() {
        assert.strictEqual(R.path('toString', false), Boolean.prototype.toString);
    });

    it('is curried', function() {
        assert.strictEqual(R.path('arrayVal.0')(deepObject), 'arr');
    });
});

},{"..":1,"assert":2}],135:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pathEq', function() {

    var obj = {
        a: 1,
        b: {
            ba: '2'
        }
    };

    it('returns true if the path matches the value', function() {
        assert.ok(R.pathEq('a', 1, obj));
        assert.ok(R.pathEq('b.ba', '2', obj));
    });

    it('returns false for non matches', function() {
        assert.ok(!R.pathEq('a', '1', obj));
        assert.ok(!R.pathEq('b.ba', 2, obj));
    });

    it('returns false for non existing values', function() {
        assert.ok(!R.pathEq('c', 'foo', obj));
        assert.ok(!R.pathEq('c.d', 'foo', obj));
    });

});

},{"..":1,"assert":2}],136:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pathOn', function() {
    var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
    it('takes a string separator, string path, and an object and returns the value at the path or undefined', function() {
        var obj = {
            a: {
                b: {
                    c: 100,
                    d: 200
                },
                e: {
                    f: [100, 101, 102],
                    g: 'G'
                },
                h: 'H'
            },
            i: 'I',
            j: ['J']
        };
        assert.strictEqual(R.pathOn('|', 'a|b|c', obj), 100);
        assert.strictEqual(R.pathOn(' ', '', obj), undefined);
        assert.strictEqual(R.pathOn(' ', 'a e f 1', obj), 101);
        assert.strictEqual(R.pathOn('_', 'j_0', obj), 'J');
        assert.strictEqual(R.pathOn('~', 'j~1', obj), undefined);
        assert.strictEqual(R.pathOn('Z', 'aZbZc', null), undefined);
    });

    it("gets a deep property's value from objects", function() {
        assert.strictEqual(R.pathOn('|', 'a|b|c', deepObject), 'c');
        assert.strictEqual(R.pathOn('|', 'a', deepObject), deepObject.a);
    });
});

},{"..":1,"assert":2}],137:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pick', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('copies the named properties of an object to the new object', function() {
        assert.deepEqual(R.pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });

    it('ignores properties not included', function() {
        assert.deepEqual(R.pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pick(['w', 'x', 'y'], obj), {w: 20, x: 30, y: 40});
    });

    it('is automatically curried', function() {
        var copyAB = R.pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

},{"..":1,"assert":2}],138:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pickAll', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('copies the named properties of an object to the new object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });

    it('includes properties not present on the input object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'g'], obj), {a: 1, c: 3, g: undefined});
    });

    it('is automatically curried', function() {
        var copyAB = R.pickAll(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

},{"..":1,"assert":2}],139:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pickBy', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('creates a copy of the object', function() {
        assert.notStrictEqual(R.pickBy(R.always(true), obj), obj);
    });

    it('when returning truthy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.T, obj), obj);
        assert.deepEqual(R.pickBy(R.always({}), obj), obj);
        assert.deepEqual(R.pickBy(R.always(1), obj), obj);
    });

    it('when returning falsy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.always(false), obj), {});
        assert.deepEqual(R.pickBy(R.always(0), obj), {});
        assert.deepEqual(R.pickBy(R.always(null), obj), {});
    });

    it('is called with (val,key,obj)', function() {
        assert.deepEqual(R.pickBy(function(val, key, _obj) {
            assert.strictEqual(_obj, obj);
            return key === 'd' && val === 4;
        }, obj), {d: 4});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pickBy(function(val) {return val < 45;}, obj), {v: 10, w: 20, x: 30, y: 40});
    });


    it('is automatically curried', function() {
        var copier = R.pickBy(R.T);
        assert.deepEqual(copier(obj), obj);
    });
});

},{"..":1,"assert":2}],140:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pipe', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}
    function c(x) {return x + 'C';}
    function d(x) {return x + 'D';}

    it('executes its passed in functions in order from left to right', function() {
        assert.strictEqual(R.pipe(a, b, c, d)(''), 'ABCD');
    });

    it('first function is passed multiple args', function() {
        function e(a, b, c) {
            return c + 'E';
        }
        assert.strictEqual(R.pipe(e, a, b, c)(1, 2, 3), '3EABC');
    });

    it('passes context to functions', function() {
        function x(val) {
            return this.x * val;
        }
        function y(val) {
            return this.y * val;
        }
        function z(val) {
            return this.z * val;
        }
        var context = {
            a: R.pipe(x, y, z),
            x: 4,
            y: 2,
            z: 1
        };
        assert.strictEqual(context.a(5), 40);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.pipe(); });
    });

    it('returns argument if given exactly one argument', function() {
        function f() {}
        assert.strictEqual(R.pipe(f), f);
    });
});

},{"..":1,"assert":2}],141:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('pluck', function() {
    var people = [
        {name: 'Fred', age: 23},
        {name: 'Wilma', age: 21} ,
        {name: 'Pebbles', age: 2}
    ];

    it('returns a function that maps the appropriate property over an array', function() {
        var nm = R.pluck('name');
        assert.strictEqual(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});

},{"..":1,"assert":2}],142:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('prepend', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
        assert.deepEqual(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prepend(1, []), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.prepend(4), 'function');
        assert.deepEqual(R.prepend(4)([3, 2, 1]), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.prepend, TypeError);
    });
});

},{"..":1,"assert":2}],143:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('prependTo', function() {
    it('adds the element to the beginning of the list', function() {
        assert.deepEqual(R.prependTo([4, 5, 6], 3), [3, 4, 5, 6]);
        assert.deepEqual(R.prependTo([4, 5, 6], [1, 2, 3]), [[1, 2, 3], 4, 5, 6]);
    });

    it('works on empty list', function() {
        assert.deepEqual(R.prependTo([], 1), [1]);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.prependTo([]), 'function');
        assert.deepEqual(R.prependTo([3, 2, 1])(4), [4, 3, 2, 1]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.prependTo, TypeError);
    });
});

},{"..":1,"assert":2}],144:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('product', function() {
    it('multiplies together the array of numbers supplied', function() {
        assert.strictEqual(R.product([1, 2, 3, 4]), 24);
    });
});

},{"..":1,"assert":2}],145:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('project', function() {
    var kids = [
        {name: 'Abby', age: 7, hair: 'blond'},
        {name: 'Fred', age: 12, hair: 'brown'},
        {name: 'Rusty', age: 10, hair: 'brown'},
        {name: 'Alois', age: 15, disposition: 'surly'}
    ];

    it('selects the chosen properties from each element in a list', function() {
        assert.deepEqual(R.project(['name', 'age'], kids), [
            {name: 'Abby', age: 7},
            {name: 'Fred', age: 12},
            {name: 'Rusty', age: 10},
            {name: 'Alois', age: 15}
        ]);
    });

    it('has an undefined property on the output tuple for any input tuple that does not have the property', function() {
        assert.deepEqual(R.project(['name', 'hair'], kids), [
            {name: 'Abby', hair: 'blond'},
            {name: 'Fred', hair: 'brown'},
            {name: 'Rusty', hair: 'brown'},
            {name: 'Alois', hair: undefined}
        ]);
    });

    it('is automatically curried', function() {
        var myFields = R.project(['name', 'age']);
        assert.deepEqual(myFields(kids), [
            {name: 'Abby', age: 7},
            {name: 'Fred', age: 12},
            {name: 'Rusty', age: 10},
            {name: 'Alois', age: 15}
        ]);
    });
});

},{"..":1,"assert":2}],146:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('prop', function() {
    var fred = {name: 'Fred', age: 23};

    it('returns a function that fetches the appropriate property', function() {
        var nm = R.prop('name');
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), 'Fred');
    });

    it('is aliased by `get`', function() {
        assert.strictEqual(R.get, R.prop);
    });

    it('throws when called with no arguments', function() {
        assert.throws(R.prop, TypeError);
    });
});

},{"..":1,"assert":2}],147:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('propEq', function() {
    var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
    var obj2 = {name: 'Fred', age: 12, hair: 'brown'};
    var obj3 = {name: 'Rusty', age: 10, hair: 'brown'};
    var obj4 = {name: 'Alois', age: 15, disposition: 'surly'};

    it('determines whether a particular property matches a given value for a specific object', function() {
        assert.strictEqual(R.propEq('name', 'Abby', obj1), true);
        assert.strictEqual(R.propEq('hair', 'brown', obj2), true);
        assert.strictEqual(R.propEq('hair', 'blond', obj2), false);
    });

    it('is automatically curried', function() {
        var kids = [obj1, obj2, obj3, obj4];
        var hairMatch = R.propEq('hair');
        assert.strictEqual(typeof hairMatch, 'function');
        var brunette = hairMatch('brown');
        assert.deepEqual(R.filter(brunette, kids), [obj2, obj3]);
        // more likely usage:
        assert.deepEqual(R.filter(R.propEq('hair', 'brown'), kids), [obj2, obj3]);
    });

});

},{"..":1,"assert":2}],148:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('propOf', function() {
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('returns a function that fetches the appropriate properties from the initially supplied object', function() {
        var p = R.propOf(fred);

        assert.strictEqual(p('name'), 'Fred');
        assert.strictEqual(p('age'), 23);
        assert.strictEqual(p('feet'), 'large');
        assert.strictEqual(p('nonexistent'), undefined);
    });
});

},{"..":1,"assert":2}],149:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('propOr', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    var nm = R.propOr('name', 'Unknown');

    it('returns a function that fetches the appropriate property', function() {
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), 'Fred');
    });

    it('returns the default value when the property does not exist', function() {
        assert.strictEqual(nm(anon), 'Unknown');
    });

    it('does not return properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.strictEqual(R.propOr('age', 100, bob), 100);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.propOr, TypeError);
    });
});

},{"..":1,"assert":2}],150:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('props', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('throws when called with no arguments', function() {
        assert.throws(R.props, TypeError);
    });

    it('returns empty array if no properties requested', function() {
        assert.deepEqual(R.props([], obj), []);
    });

    it('returns values for requested properties', function() {
        assert.deepEqual(R.props(['a', 'e'], obj), [1, 5]);
    });

    it('preserves order', function() {
        assert.deepEqual(R.props(['f', 'c', 'e'], obj), [6, 3, 5]);
    });

    it('returns undefined for nonexistent properties', function() {
        var ps = R.props(['a', 'nonexistent'], obj);
        assert.strictEqual(ps.length, 2);
        assert.strictEqual(ps[0], 1);
        assert.strictEqual(ps[1], void 0);
    });

    it('is automatically curried', function() {
        assert.deepEqual(R.props(['a', 'b'])(obj), [1, 2]);
    });
});

},{"..":1,"assert":2}],151:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('rPartial', function() {
    var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
        return b * b - 4 * a * c;
    };

    it('caches the initially supplied right-most parameters in the generated function', function() {
        var f = R.rPartial(disc, 4);
        assert.strictEqual(f(3, 7), 1);
        var g = R.rPartial(disc, 7, 4);
        assert.strictEqual(g(3), 1);
    });

    it('correctly reports the arity of the new function', function() {
        var f = R.rPartial(disc, 4);
        assert.strictEqual(f.length, 2);
        var g = R.rPartial(disc, 7, 4);
        assert.strictEqual(g.length, 1);
    });
});

},{"..":1,"assert":2}],152:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('range', function() {
    it('returns list of numbers', function() {
        assert.deepEqual(R.range(0, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(R.range(4, 7), [4, 5, 6]);
    });

    it('returns the empty list if the first parameter is not larger than the second', function() {
        assert.deepEqual(R.range(7, 3), []);
        assert.deepEqual(R.range(5, 5), []);
    });

    it('is automatically curried', function() {
        var from10 = R.range(10);
        assert.deepEqual(from10(15), [10, 11, 12, 13, 14]);
    });

    it('returns an empty array if from > to', function() {
        var result = R.range(10, 5);
        assert.deepEqual(result, []);
        result.push(5);
        assert.deepEqual(R.range(10, 5), []);
    });
});

},{"..":1,"assert":2}],153:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('reject', function() {
    var even = function(x) {return x % 2 === 0;};

    it('reduces an array to those not matching a filter', function() {
        assert.deepEqual(R.reject(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.reject(function(x) { return x > 100; }, []), []);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.reject(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.reject(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var odd = R.reject(even);
        assert.deepEqual(odd([1, 2, 3, 4, 5, 6, 7]), [1, 3, 5, 7]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.rejectIndexed, TypeError);
    });
});

},{"..":1,"assert":2}],154:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('rejectIndexed', function() {
    var even = function(x) {return x % 2 === 0;};
    var everyOther = function(val, idx) {return idx % 2 === 0;};
    var lastTwo = function(val, idx, list) {return list.length - idx < 3;};

    it('works just like a normal reject', function() {
        assert.deepEqual(R.rejectIndexed(even, [1, 2, 3, 4, 5]), [1, 3, 5]);
    });

    it('passes the index as a second parameter to the predicate', function() {
        assert.deepEqual(R.rejectIndexed(everyOther, [8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });

    it('passes the entire list as a third parameter to the predicate', function() {
        assert.deepEqual(R.rejectIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]), [8, 6, 7, 5, 3]);
    });

    it('returns an empty array if no element matches', function() {
        assert.deepEqual(R.rejectIndexed(function(x) { return x < 100; }, [1, 9, 99]), []);
    });

    it('returns an empty array if asked to filter an empty array', function() {
        assert.deepEqual(R.rejectIndexed(function(x) { return x > 100; }, []), []);
    });

    it('is automatically curried', function() {
        var everyOtherPosition = R.rejectIndexed(everyOther);
        assert.deepEqual(everyOtherPosition([8, 6, 7, 5, 3, 0, 9]), [6, 5, 0]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.rejectIndexed, TypeError);
    });
});

},{"..":1,"assert":2}],155:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('remove', function() {
    it('splices out a sub-list of the given list', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 5, list), ['a', 'b', 'h', 'i', 'j']);
    });

    it('returns the appropriate sublist when start == 0', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(0, 5, list), ['f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, 1, list), ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(0, list.length, list), []);
    });

    it('removes the end of the list if the count is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(2, 20, list), ['a', 'b']);
    });

    it('retains the entire list if the start is too large', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13, 3, list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });

    it('is curried', function() {
        var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepEqual(R.remove(13)(3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
        assert.deepEqual(R.remove(13, 3)(list), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    });
});

},{"..":1,"assert":2}],156:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('repeat', function() {
    it('returns a lazy list of identical values', function() {
        assert.deepEqual(R.repeat(0, 5), [0, 0, 0, 0, 0]);
    });

    it('can accept any value, including `null`', function() {
        assert.deepEqual(R.repeat(null, 3), [null, null, null]);
    });

    it('is automatically curried', function() {
        var makeFoos = R.repeat('foo');
        assert.deepEqual(makeFoos(0), []);
        assert.deepEqual(makeFoos(3), ['foo', 'foo', 'foo']);
    });
});

},{"..":1,"assert":2}],157:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('replace', function() {

    it('replaces substrings of the input string', function() {
        assert.strictEqual(R.replace('1', 'one', '1 two three'), 'one two three');
    });

    it('replaces regex matches of the input string', function() {
        assert.strictEqual(R.replace(/\d+/g, 'num', '1 2 three'), 'num num three');
    });

    it('is curried up to 3 arguments', function() {
        assert(R.replace(null) instanceof Function);
        assert(R.replace(null, null) instanceof Function);

        var replaceSemicolon = R.replace(';');
        var removeSemicolon = replaceSemicolon('');
        assert.strictEqual(removeSemicolon('return 42;'), 'return 42');
    });

});

},{"..":1,"assert":2}],158:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('reverse', function() {
    it('reverses arrays', function() {
        assert.deepEqual(R.reverse([1, 2, 3, 4]), [4, 3, 2, 1]);
    });

    it('returns the empty list to itself', function() {
        assert.deepEqual(R.reverse([]), []);
    });

});

},{"..":1,"assert":2}],159:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('scanl', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('scans simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.scanl(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(R.scanl(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
    });

    it('returns the accumulator for an empty array', function() {
        assert.deepEqual(R.scanl(add, 0, []), [0]);
        assert.deepEqual(R.scanl(mult, 1, []), [1]);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.scanl(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.deepEqual(sum([1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(cat(['1', '2', '3', '4']), ['', '1', '12', '123', '1234']);
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.scanl(add, 0);
        assert.strictEqual(sum.length, 1);
    });

    it('throws if called with no arguments', function() {
        assert.throws(R.scanl, TypeError);
    });

    it('returns a function which throws if called with no arguments', function() {
        assert.throws(R.scanl(R.add), TypeError);
    });
});

},{"..":1,"assert":2}],160:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('slice', function() {
    it('retrieves the proper sublist of a list', function() {
        var list = [8, 6, 7, 5, 3, 0, 9];
        assert.deepEqual(R.slice(2, 5, list), [7, 5, 3]);
    });
});

},{"..":1,"assert":2}],161:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('sort', function() {
    it('sorts the elements of a list', function() {
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, [3, 1, 8, 1, 2, 5]), [1, 1, 2, 3, 5, 8]);
    });

    it('does not affect the list passed supplied', function() {
        var list = [3, 1, 8, 1, 2, 5];
        assert.deepEqual(R.sort(function(a, b) {return a - b;}, list), [1, 1, 2, 3, 5, 8]);
        assert.deepEqual(list, [3, 1, 8, 1, 2, 5]);
    });

    it('is automatically curried', function() {
        var sortByLength = R.sort(function(a, b) {return a.length - b.length;});
        assert.deepEqual(sortByLength(['one', 'two', 'three', 'four', 'five', 'six']),
                                      ['one', 'two', 'six', 'four', 'five', 'three']);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.sort, TypeError);
    });
});

},{"..":1,"assert":2}],162:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


var albums = [
    {title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'},
    {title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'},
    {title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'},
    {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'},
    {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'},
    {title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'},
    {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'},
    {title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'},
    {title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'},
    {title: 'Evita', artist: 'Various', genre: 'Broadway'},
    {title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'},
    {title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}
];


describe('sortBy', function() {
    it('sorts by a simple property of the objects', function() {
        var sortedAlbums = R.sortBy(R.prop('title'), albums);
        assert.strictEqual(sortedAlbums.length, albums.length);
        assert.strictEqual(sortedAlbums[0].title, 'A Farewell to Kings');
        assert.strictEqual(sortedAlbums[11].title, 'Timeout');
    });

    it('is automatically curried', function() {
        var sorter = R.sortBy(R.prop('title'));
        var sortedAlbums = sorter(albums);
        assert.strictEqual(sortedAlbums.length, albums.length);
        assert.strictEqual(sortedAlbums[0].title, 'A Farewell to Kings');
        assert.strictEqual(sortedAlbums[11].title, 'Timeout');
    });
});

},{"..":1,"assert":2}],163:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('split', function() {
    it('splits a string into an array', function() {
        assert.deepEqual(R.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
    });

    it('the split string can be arbitrary', function() {
        assert.deepEqual(R.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
    });
});

},{"..":1,"assert":2}],164:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('strIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strIndexOf('c', 'abcdefg'), 2);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findD = R.strIndexOf('d');
        assert.strictEqual(findD('abcdefg'), 3);
    });
});

},{"..":1,"assert":2}],165:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('strLastIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strLastIndexOf('a', 'bananas'), 5);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strLastIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findA = R.strLastIndexOf('a');
        assert.strictEqual(findA('banana split'), 5);
    });
});

},{"..":1,"assert":2}],166:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('substring', function() {
    it('returns the substring of a string', function() {
        assert.strictEqual(R.substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('is automatically curried', function() {
        var from2 = R.substring(2);
        assert.strictEqual(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = R.substring(2, 5);
        assert.strictEqual(from2to5('abcdefghijklm'), 'cde');
    });
});

},{"..":1,"assert":2}],167:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('substringFrom', function() {
    it('returns the trailing substring of a string', function() {
        assert.strictEqual(R.substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('is automatically curried', function() {
        var after8 = R.substringFrom(8);
        assert.strictEqual(after8('abcdefghijklm'), 'ijklm');
    });
});

},{"..":1,"assert":2}],168:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('substringTo', function() {
    it('returns the trailing substring of a string', function() {
        assert.strictEqual(R.substringTo(8, 'abcdefghijklm'), 'abcdefgh');
    });

    it('is automatically curried', function() {
        var through8 = R.substringTo(8);
        assert.strictEqual(through8('abcdefghijklm'), 'abcdefgh');
    });
});

},{"..":1,"assert":2}],169:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('subtract', function() {
    it('subtracts two numbers', function() {
        assert.strictEqual(R.subtract(22, 7), 15);
    });

    it('is curried', function() {
        var ninesCompl = R.subtract(9);
        assert.strictEqual(ninesCompl(6), 3);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var minus5 = R.subtract(void 0, 5);
        assert.strictEqual(minus5(17), 12);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.subtract, TypeError);
    });
});

},{"..":1,"assert":2}],170:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('sum', function() {
    it('adds together the array of numbers supplied', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
    });

    it('does not save the state of the accumulator', function() {
        assert.strictEqual(R.sum([1, 2, 3, 4]), 10);
        assert.strictEqual(R.sum([1]), 1);
        assert.strictEqual(R.sum([5, 5, 5, 5, 5]), 25);
    });
});

},{"..":1,"assert":2}],171:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('tail', function() {
    it('returns an empty list for an empty list', function() {
        assert.deepEqual(R.tail([]), []);
    });
    it('returns a new list containing all the elements after the first element of a list', function() {
        assert.deepEqual(R.tail(['a', 'b', 'c', 'd']), ['b', 'c', 'd']);
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.tail(null); }, TypeError);
        assert.throws(function() { R.tail(undefined); }, TypeError);
        assert.throws(function() { R.tail(); }, TypeError);
    });
});

},{"..":1,"assert":2}],172:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('take', function() {
    it('takes only the first `n` elements from a list', function() {
        assert.deepEqual(R.take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
    });

    it('returns only as many as the array can provide', function() {
        assert.deepEqual(R.take(3, [1, 2]), [1, 2]);
        assert.deepEqual(R.take(3, []), []);
    });

    it('is automatically curried', function() {
        var take3 = R.take(3);
        assert.deepEqual(take3(['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c']);
        assert.deepEqual(take3(['w', 'x', 'y', 'z']), ['w', 'x', 'y']);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.take, TypeError);
    });
});

},{"..":1,"assert":2}],173:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('takeWhile', function() {
    it('continues taking elements while the function reports `true`', function() {
        assert.deepEqual(R.takeWhile(function(x) {return x != 5;}, [1, 3, 5, 7, 9]), [1, 3]);
    });

    it('starts at the right arg and acknowledges undefined', function() {
        assert.deepEqual(R.takeWhile(function() { assert.ok(false); }, []), []);
        assert.deepEqual(R.takeWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]), [1, 3]);
    });

    it('is automatically curried', function() {
        var takeUntil7 = R.takeWhile(function(x) {return x != 7;});
        assert.deepEqual(takeUntil7([1, 3, 5, 7, 9]), [1, 3, 5]);
        assert.deepEqual(takeUntil7([2, 4, 6, 8, 10]), [2, 4, 6, 8, 10]);
    });
});

},{"..":1,"assert":2}],174:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('tap', function() {
    it('returns a function that always returns its argument', function() {
        var f = R.tap(R.I);
        assert.strictEqual(typeof f, 'function');
        assert.strictEqual(f(100), 100);
    });

    it("may take a function as the first argument that executes with tap's argument", function() {
        var sideEffect = 0;
        assert.strictEqual(sideEffect, 0);
        var rv = R.tap(function(x) { sideEffect = 'string ' + x; }, 200);
        assert.strictEqual(rv, 200);
        assert.strictEqual(sideEffect, 'string 200');
    });

});

},{"..":1,"assert":2}],175:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('times', function() {
    it('takes a map func', function() {
        assert.deepEqual(R.times(R.identity, 5), [0, 1, 2, 3, 4]);
        assert.deepEqual(R.times(function(x) {
            return x * 2;
        }, 5), [0, 2, 4, 6, 8]);
    });

    it('is curried', function() {
        var mapid = R.times(R.identity);
        assert.deepEqual(mapid(5), [0, 1, 2, 3, 4]);
    });

    it('throws if second argument is not a valid array length', function() {
        assert.throws(function() { R.times(3)('cheers!'); }, RangeError);
        assert.throws(function() { R.times(R.identity, -1); }, RangeError);
    });
});

},{"..":1,"assert":2}],176:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('toLowerCase', function() {
    it('returns the lower-case equivalent of the input string', function() {
        assert.strictEqual(R.toLowerCase('XYZ'), 'xyz');
    });
});

},{"..":1,"assert":2}],177:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('toPairs', function() {
    it('converts an object into an array of two-element [key, value] arrays', function() {
        assert.deepEqual(R.toPairs({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
    });
    it("only iterates the object's own properties", function() {
        var F = function() {
            this.x = 1;
            this.y = 2;
        };
        F.prototype.protoProp = 'you can\'t see me';
        var f = new F();
        assert.deepEqual(R.toPairs(f), [['x', 1], ['y', 2]]);
    });
});

},{"..":1,"assert":2}],178:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('toPairsIn', function() {
    it('converts an object into an array of two-element [key, value] arrays', function() {
        assert.deepEqual(R.toPairsIn({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
    });
    it("iterates properties on the object's prototype chain", function() {
        function sortPairs(a, b) {
            return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        }
        var F = function() {
            this.x = 1;
            this.y = 2;
        };
        F.prototype.protoProp = 'you can see me';
        var f = new F();
        assert.deepEqual(R.toPairsIn(f).sort(sortPairs), [['protoProp', 'you can see me'], ['x', 1], ['y', 2]]);
    });
});

},{"..":1,"assert":2}],179:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('toUpperCase', function() {
    it('returns the upper-case equivalent of the input string', function() {
        assert.strictEqual(R.toUpperCase('abc'), 'ABC');
    });
});

},{"..":1,"assert":2}],180:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('trim', function() {
    var test = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    it('trims a string', function() {
        assert.strictEqual(R.trim('   xyz  '), 'xyz');
    });

    it('trims all ES5 whitespace', function() {
        assert.strictEqual(R.trim(test), 'Hello, World!');
        assert.strictEqual(R.trim(test).length, 13);
    });

    it('does not trim the zero-width space', function() {
        assert.strictEqual(R.trim('\u200b'), '\u200b');
        assert.strictEqual(R.trim('\u200b').length, 1);
    });

    if (typeof String.prototype.trim !== 'function') {
        it('falls back to a shim if String.prototype.trim is not present', function() {
            assert.strictEqual(R.trim('   xyz  '), 'xyz');
            assert.strictEqual(R.trim(test), 'Hello, World!');
            assert.strictEqual(R.trim(test).length, 13);
            assert.strictEqual(R.trim('\u200b'), '\u200b');
            assert.strictEqual(R.trim('\u200b').length, 1);
        });
    }
});

},{"..":1,"assert":2}],181:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('type', function() {

    it('"Array" if given an array literal', function() {
        assert.strictEqual(R.type([1, 2, 3]), 'Array');
    });

    it('"Arguments" if given an arguments object', function() {
        var args = (function() { return arguments; }());
        assert.strictEqual(R.type(args), 'Arguments');
    });

    it('"Object" if given an object literal', function() {
        assert.strictEqual(R.type({batman: 'na na na na na na na'}), 'Object');
    });

    it('"RegExp" if given a RegExp literal', function() {
        assert.strictEqual(R.type(/[A-z]/), 'RegExp');
    });

    it('"Number" if given a numeric value', function() {
        assert.strictEqual(R.type(4), 'Number');
    });

    it('"Number" if given the NaN value', function() {
        assert.strictEqual(R.type(NaN), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.strictEqual(R.type('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"String" if given a String object', function() {
        /*jshint -W053 */
        assert.strictEqual(R.type(new String('I am a String object')), 'String');
    });

    it('"Null" if given the null value', function() {
        assert.strictEqual(R.type(null), 'Null');
    });

    it('"Undefined" if given the undefined value', function() {
        assert.strictEqual(R.type(undefined), 'Undefined');
    });
});

},{"..":1,"assert":2}],182:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('unapply', function() {
    it('returns a function which is always passed one argument', function() {
        var fn = R.unapply(function() { return arguments.length; });
        assert.strictEqual(fn(), 1);
        assert.strictEqual(fn('x'), 1);
        assert.strictEqual(fn('x', 'y'), 1);
        assert.strictEqual(fn('x', 'y', 'z'), 1);
    });

    it('forwards arguments to decorated function as an array', function() {
        var fn = R.unapply(function(xs) { return '[' + xs + ']'; });
        assert.strictEqual(fn(), '[]');
        assert.strictEqual(fn(2), '[2]');
        assert.strictEqual(fn(2, 4), '[2,4]');
        assert.strictEqual(fn(2, 4, 6), '[2,4,6]');
    });

    it('returns a function with length 0', function() {
        var fn = R.unapply(R.identity);
        assert.strictEqual(fn.length, 0);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.unapply, TypeError);
    });

    it('is the inverse of R.apply', function() {
        var a, b, c, d, e, f, g, idx;
        var rand = function() {
            return Math.floor(200 * Math.random()) - 100;
        };

        f = Math.max;
        g = R.unapply(R.apply(f));
        idx = 100;
        while (idx--) {
            a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
            assert.strictEqual(f(a, b, c, d, e), g(a, b, c, d, e));
        }

        f = function(xs) { return '[' + xs + ']'; };
        g = R.apply(R.unapply(f));
        idx = 100;
        while (idx--) {
            a = rand(); b = rand(); c = rand(); d = rand(); e = rand();
            assert.strictEqual(f([a, b, c, d, e]), g([a, b, c, d, e]));
        }
    });
});

},{"..":1,"assert":2}],183:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('unary', function() {
    it('turns multiple-argument function into unary one', function() {
        R.unary(function(x, y, z) {
            assert.strictEqual(arguments.length, 1);
            assert.strictEqual(typeof y, 'undefined');
            assert.strictEqual(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial argument is passed through normally', function() {
        R.unary(function(x, y, z) {
            assert.strictEqual(x, 10);
            void z;
        })(10, 20, 30);
    });
});

},{"..":1,"assert":2}],184:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('unfoldr', function() {
    it('unfolds simple functions with a starting point to create a list', function() {
        assert.deepEqual(R.unfoldr(function(n) {if (n > 0) {return [n, n - 1];}}, 10), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it('is cool!', function() {
        var fib = function(n) {var count = 0; return function(pair) {if (count++ < n) {return [pair[0], [pair[1], pair[0] + pair[1]]];}};};
        assert.deepEqual(R.unfoldr(fib(10), [0, 1]), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

});

},{"..":1,"assert":2}],185:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('union', function() {
    var M = [1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('combines two lists into the set of all their elements', function() {
        assert.deepEqual(R.union(M, N), [1, 2, 3, 4, 5, 6]);
    });

    it('is curried', function() {
        assert(typeof R.union(M) === 'function');
        assert.deepEqual(R.union(M)(N), [1, 2, 3, 4, 5, 6]);
    });

    it('does not work for non-primitives (use `unionWith`)', function() {
        assert.strictEqual(R.union(Mo, No).length, 8);
    });
});

},{"..":1,"assert":2}],186:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('unionWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.unionWith(eqA, Ro, So), [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}]);
    });
});

},{"..":1,"assert":2}],187:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('uniq', function() {
    it('returns a set from any array (i.e. purges duplicate elements)', function() {
        var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
        assert.deepEqual(R.uniq(list), [1, 2, 3]);
    });

    it('keeps elements from the left', function() {
        assert.deepEqual(R.uniq([1, 2, 3, 4, 1]), [1, 2, 3, 4]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniq([]), []);
    });
});

},{"..":1,"assert":2}],188:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('uniqWith', function() {
    var objs = [
        {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
        {x: R.F, i: 4}, {x: R.F, i: 5}, {x: R.T, i: 6}, {x: R.F, i: 7}
    ];
    var objs2 = [
        {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
        {x: R.F, i: 0}, {x: R.T, i: 1}, {x: R.F, i: 2}, {x: R.F, i: 3}
    ];
    function eqI(x, accX) { return x.i === accX.i; }

    it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
        assert.deepEqual(R.uniqWith(eqI, objs), objs);
        assert.deepEqual(R.uniqWith(eqI, objs2), [{x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3}]);
    });

    it('keeps elements from the left', function() {
        assert.deepEqual(R.uniqWith(eqI, [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 1}]), [{i: 1}, {i: 2}, {i: 3}, {i: 4}]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniqWith(eqI, []), []);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.uniqWith(eqI), 'function');
        assert.deepEqual(R.uniqWith(eqI)(objs), objs);
        assert.deepEqual(R.uniqWith(eqI)(objs2), [{x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3}]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.uniqWith, TypeError);
    });
});

},{"..":1,"assert":2}],189:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('unnest', function() {
    it('only flattens one layer deep of a nested list', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(R.unnest(nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(R.unnest(nest), [[[3]], 2, 1, 0, [-1, -2], -3]);
        assert.deepEqual(R.unnest([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it('is not destructive', function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.notStrictEqual(R.unnest(nest), nest);
    });

    it('handles array-like objects', function() {
        var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
        assert.deepEqual(R.unnest(o), [1, 2, [3], 'a', 'b', 'c', ['d', 'e']]);
    });

    it('flattens an array of empty arrays', function() {
        assert.deepEqual(R.unnest([[], [], []]), []);
        assert.deepEqual(R.unnest([]), []);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.unnest, TypeError);
    });
});

},{"..":1,"assert":2}],190:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('useWith', function() {
    function max() { return Math.max.apply(Math, arguments); }
    function add1(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function div3(x) { return x / 3; }
    var f = R.useWith(max, add1, mult2, div3);

    it('takes a arbitrary number of function arguments and returns a function', function() {
        assert.strictEqual(typeof R.useWith(max), 'function');
        assert.strictEqual(typeof R.useWith(max, add1), 'function');
        assert.strictEqual(typeof R.useWith(max, add1, mult2, div3), 'function');
    });

    it('passes the arguments received to their respective functions', function() {
        assert.strictEqual(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
    });

    it('passes additional arguments to the main function', function() {
        assert.strictEqual(f(7, 8, 9, 10), 16);
        assert.strictEqual(f(7, 8, 9, 20), 20);
    });

    it('nonetheless has the correct arity', function() {
        assert.strictEqual(f.length, 3);
    });

});

},{"..":1,"assert":2}],191:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('values', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        var vs = R.values(obj).sort();
        var ts = [[1, 2, 3], 100, 'D', {x: 200, y: 300}, null, undefined];
        assert.strictEqual(vs.length, ts.length);
        assert.deepEqual(vs[0], ts[0]);
        assert.strictEqual(vs[1], ts[1]);
        assert.strictEqual(vs[2], ts[2]);
        assert.deepEqual(vs[3], ts[3]);
        assert.strictEqual(vs[4], ts[4]);
        assert.strictEqual(vs[5], ts[5]);

        assert.deepEqual(R.values({
            /* jshint -W001 */
            hasOwnProperty: false
            /* jshint +W001 */
        }), [false]);
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.values(cobj), [100, 200]);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });
});

},{"..":1,"assert":2}],192:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('valuesIn', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        var vs = R.valuesIn(obj);
        assert(vs.length === 6);
        assert(R.indexOf(100, vs) > -1);
        assert(R.indexOf('D', vs) > -1);
        assert(R.indexOf(null, vs) > -1);
        assert(R.indexOf(undefined, vs) > -1);
        assert(R.indexOf(obj.b, vs) > -1);
        assert(R.indexOf(obj.c, vs) > -1);
    });

    it("includes the given object's prototype properties", function() {
        var vs = R.valuesIn(cobj);
        assert(vs.length === 4);
        assert(R.indexOf(100, vs) > -1);
        assert(R.indexOf(200, vs) > -1);
        assert(R.indexOf(cobj.x, vs) > -1);
        assert(R.indexOf('y', vs) > -1);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.values(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });
});

},{"..":1,"assert":2}],193:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('where', function() {
    it('takes a spec and a test object and returns true if the test object satisfies the spec', function() {

        var spec = {x: 1, y: 2};
        var test1 = {x: 0, y: 200};
        var test2 = {x: 0, y: 10};
        var test3 = {x: 1, y: 101};
        var test4 = {x: 1, y: 2};
        assert.strictEqual(R.where(spec, test1), false);
        assert.strictEqual(R.where(spec, test2), false);
        assert.strictEqual(R.where(spec, test3), false);
        assert.strictEqual(R.where(spec, test4), true);
    });

    it('calls any functions in the spec against the test object value for that property', function() {
        var spec = {
            a: function(a, obj) {
                return a < obj.b + obj.c;
            },
            b: function(b, obj) {
                return b < obj.a + obj.c;
            },
            c: function(c, obj) {
                return c < obj.a + obj.b;
            }
        };
        var test1 = {a: 3, b: 4, c: 5};
        var test2 = {a: 6, b: 8, c: 9};
        var test3 = {a: 2, b: 8, c: 12};
        var test4 = {a: 3, b: 11, c: 5};

        assert.strictEqual(R.where(spec, test1), true);
        assert.strictEqual(R.where(spec, test2), true);
        assert.strictEqual(R.where(spec, test3), false);
        assert.strictEqual(R.where(spec, test4), false);
    });

    it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
        var spec = {x: 100};
        var test1 = {x: 20, y: 100, z: 100};
        var test2 = {w: 1, x: 100, y: 100, z: 100};

        assert.strictEqual(R.where(spec, test1), false);
        assert.strictEqual(R.where(spec, test2), true);
    });

    it('is false if the test object is null-ish', function() {
        var spec = {x: 200};
        var testN = null;
        var testU;
        var testF = false;
        assert.strictEqual(R.where(spec, testN), false);
        assert.strictEqual(R.where(spec, testU), false);
        assert.strictEqual(R.where(spec, testF), false);
    });

    it('matches specs that have undefined properties', function() {
        var spec = {x: undefined};
        var test1 = {};
        var test2 = {x: null};
        var test3 = {x: undefined};
        var test4 = {x: 1};
        assert.strictEqual(R.where(spec, test1), true);
        assert.strictEqual(R.where(spec, test2), false);
        assert.strictEqual(R.where(spec, test3), true);
        assert.strictEqual(R.where(spec, test4), false);
    });

    it('is automatically curried', function() {
        var predicate = R.where({x: 1, y: 2});
        assert.strictEqual(predicate({x: 1, y: 2, z: 3}), true);
        assert.strictEqual(predicate({x: 3, y: 2, z: 1}), false);
    });

    it('is true for an empty spec', function() {
        assert.strictEqual(R.where({}, {a: 1}), true);
        assert.strictEqual(R.where(null, {a: 1}), true);
    });

    it('reports true when the object equals the spec', function() {
        assert.strictEqual(R.where(R, R), true);
    });

    function Parent() {
        this.y = 6;
    }
    Parent.prototype.a = undefined;
    Parent.prototype.x = 5;
    var parent = new Parent();

    it('matches inherited functions', function() {
        var spec = {
            toString: R.T
        };
        assert.strictEqual(R.where(spec, {}), true);
        assert.strictEqual(R.where(spec, {a: 1}), true);
        assert.strictEqual(R.where(spec, {toString: 1}), true);
        assert.strictEqual(R.where({a: R.T}, {x: 1}), false);
    });

    it('matches inherited props', function() {
        assert.strictEqual(R.where({y: 6}, parent), true);
        assert.strictEqual(R.where({x: 5}, parent), true);
        assert.strictEqual(R.where({x: 5, y: 6}, parent), true);
        assert.strictEqual(R.where({x: 4, y: 6}, parent), false);
    });

    it('doesnt match inherited spec', function() {
        assert.strictEqual(R.where(parent, {y: 6}), true);
        assert.strictEqual(R.where(parent, {x: 5}), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.where, TypeError);
    });

});

},{"..":1,"assert":2}],194:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('wrap', function() {
    it('surrounds the invocation of one function with another', function() {
        var greet = function(name) {return 'Hello ' + name;};
        var extendedGreet = R.wrap(greet, function(gr, name) {
            return gr('my dear ' + name) + ', how are you?';
        });
        assert.strictEqual(greet('joe'), 'Hello joe');
        assert.strictEqual(extendedGreet('joe'), 'Hello my dear joe, how are you?');
    });

    it('should maintain the arity of the function that is being wrapped', function() {
        var greet = function(name) {return 'Hello ' + name;};
        var extendedGreet = R.wrap(greet, function(gr, name) {
            return gr('my dear ' + name) + ', how are you?';
        });
        assert.strictEqual(greet.length, extendedGreet.length);
    });

});

},{"..":1,"assert":2}],195:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('xprod', function() {
    var a = [1, 2], b = ['a', 'b', 'c'];

    it('returns an empty list if either input list is empty', function() {
        assert.deepEqual(R.xprod([], [1, 2, 3]), []);
        assert.deepEqual(R.xprod([1, 2, 3], []), []);
    });

    it('creates the collection of all cross-product pairs of its parameters', function() {
        assert.deepEqual(R.xprod(a, b), [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
    });

    it('is automatically curried', function() {
        var something = R.xprod(b);
        assert.deepEqual(something(a), [['a', 1], ['a', 2], ['b', 1], ['b', 2], ['c', 1], ['c', 2]]);
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.xprod(a);
        assert.deepEqual(something.length, 1);
    });
});

},{"..":1,"assert":2}],196:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('zip', function() {
    it('returns an array of "tuples"', function() {
        var a = [1, 2, 3], b = [100, 200, 300];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    });

    it('returns a list as long as the shorter of the lists input', function() {
        var a = [1, 2, 3], b = [100, 200, 300, 400], c = [10, 20];
        assert.deepEqual(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
        assert.deepEqual(R.zip(a, c), [[1, 10], [2, 20]]);
    });
});

},{"..":1,"assert":2}],197:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('zipObj', function() {
    it('combines an array of keys with an arrau of values into a single object', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3]), {a: 1, b: 2, c: 3});
    });
    it('ignores extra values', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {a: 1, b: 2, c: 3});
    });
    it('extra keys are undefined', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]),
          {a: 1, b: 2, c: 3, d: undefined, e: undefined, f: undefined});
    });
    it('last one in wins when there are duplicate keys', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {a: 'LAST', b: 2, c: 3});
    });
});

},{"..":1,"assert":2}],198:[function(require,module,exports){
var assert = require('assert');

var R = require('..');


describe('zipWith', function() {
    var a = [1, 2, 3], b = [100, 200, 300], c = [10, 20, 30, 40, 50, 60];
    var add = function(a, b) { return a + b; };
    var x = function(a, b) { return a * b; };
    var s = function(a, b) { return a + ' cow ' + b; };
    it('returns an array created by applying its passed-in function pair-wise on its passed in arrays', function() {
        assert.deepEqual(R.zipWith(add, a, b), [101, 202, 303]);
        assert.deepEqual(R.zipWith(x, a, b), [100, 400, 900]);
        assert.deepEqual(R.zipWith(s, a, b), ['1 cow 100', '2 cow 200', '3 cow 300']);
    });

    it('returns an array whose length is equal to the shorter of its input arrays', function() {
        assert.strictEqual(R.zipWith(add, a, c).length, a.length);
    });
});

},{"..":1,"assert":2}]},{},[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198]);
