var _isArray = require('../internal/_isArray');
var _isTransformer = require('../internal/_isTransformer');
var _curry2 = require('../internal/_curry2');
var _xmap = require('../internal/_xmap');
var curryN = require('../curryN');
var _reduce = require('../internal/_reduce');
var keys = require('../keys');



/**
 * Returns a function that dispatches with different strategies based on the
o * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
module.exports = function dispatcher(coreImp, fnName) {

  function implemented(fn, functor) {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var fl = 'fantasy-land/' + fnName;
      var methodNames = [fl, fnName];
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
    // xmap is hardoded for map but you would look appropriately
        var transducer = _xmap.apply(null, args);
        return transducer(obj);
      }
    }
    var func = Object.prototype.toString.call(functor);
    if (func === '[object Function]') {
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    }
    if (func === '[object Object]') {
      return _reduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    }

    return coreImp.apply(this, arguments);
  }

  return _curry2(implemented);

};

