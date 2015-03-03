var _isArray = require('./_isArray');
var _isIterable = require('./_isIterable');
var _isXf = require('./_isXf');
var _xfDefaultInit = require('./_xfDefaultInit');
var _xfReducer = require('./_xfReducer');

module.exports = function (){

    var isReduced = function(x) {
        return x.__transducers_reduced__ === true;
    };
    
    var isObject = function isObject(x) {
        return x instanceof Object;
    };
    
    var arrayReduce = function arrayReduce(xf, init, list) {
        var acc = init;
        var i;
        for (i = 0; i < list.length; ++i) {
            acc = xf.step(acc, list[i], i, list);
            if (isReduced(acc)) {
                acc = acc.value;
                break;
            }
        }
        return xf.result(acc);
    };
    
    var objectReduce = function objectReduce(xf, init, obj) {
        var acc = init;
        var p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                acc = xf.step(acc, obj[p], p, obj);
                if (isReduced(acc)) {
                    acc = acc.value;
                    break;
                }
            }
        }
        return xf.result(acc);
    };
    
    var iterableReduce = function(xf, init, iterable) {
        if (iterable.entries instanceof Function) {
            return iteratorKeyValReduce(xf, init, iterable, iterable.entries());
        }
        else if (typeof Symbol !== 'undefined' && iterable[Symbol.iterator]) {
            return iteratorValOnlyReduce(xf, init, iterable, iterable[Symbol.iterator]());
        }
        else if (iterable['@@iterator']) {
            return iteratorValOnlyReduce(xf, init, iterable, iterable['@@iterator']());
        }
        else if (iterable.next instanceof Function) {
            return iteratorValOnlyReduce(xf, init, iterable, iterable);
        }
        else {
            throw 'Could not get iterator from ' + iterable.toString();
        }
    };

    var iteratorValOnlyReduce = function iteratorValOnlyReduce(xf, init, iterable, iterator) {
        var acc = init;
        var step;
        for (step = iterator.next(); !step.done; step = iterator.next()) {
            acc = xf.step(acc, step.value, void 0, iterable);
            if (isReduced(acc)) {
                acc = acc.value;
                break;
            }
        }
        return xf.result(acc);
    };

    var iteratorKeyValReduce = function iteratorKeyValReduce(xf, init, iterable, iterator) {
        var acc = init;
        var step;
        for (step = iterator.next(); !step.done; step = iterator.next()) {
            acc = xf.step(acc, step.value[1], step.value[0], iterable);
            if (isReduced(acc)) {
                acc = acc.value;
                break;
            }
        }
        return xf.result(acc);
    };

    var observableReduce = function observableReduce(xf, init, observable, cb) {
        var acc = init;
        var i = 0;
        var listener = function listener(chunk) {
            acc = xf.step(acc, chunk, i, observable);
            if (isReduced(acc)) {
                // stop listening for data events
                observable.removeListener('data', listener);
                acc = acc.value;
            }
            i++;
        };
        observable.on('data', listener);
        observable.on('end', function() { cb(null, xf.result(acc)); });
        observable.on('error', function(e) { cb(e); });
    };
    
    return function _reduce(xf, init, coll) {
        if (arguments.length === 2) {
            coll = init;
            init = _xfDefaultInit(coll);
        }
        if (!_isXf(xf)) {
            xf = new _xfReducer(xf);
        }
        // reduce based on type of collection
        if (_isArray(coll)) {
            return arrayReduce(xf, init, coll);
        }
        else if (_isIterable(coll)) {
            return iterableReduce(xf, init, coll);
        }
        else if (isObject(coll)) {
            return objectReduce(xf, init, coll);
        }
        throw 'Cannot reduce "' + coll.toString() + '"';
    };
}();
