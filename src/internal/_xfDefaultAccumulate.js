var _isArray = require('./_isArray');
var _isIterable = require('./_isIterable');
var is = require('../is');

module.exports = function(){
    
    var arrayAccumulate = function arrayAccumulate(acc, value) {
        return acc.concat([value]);
    };
    
    var objectAccumulate = function objectAccumulate(acc, value, key) {
        acc[key] = value;
        return acc;
    };
    
    var iterablePush = function iterablePush(acc, value) {
        return acc.push(value);
    };
    
    var iterableSet = function iterableSet(acc, value, key) {
        return acc.set(key, value);
    };
    
    return function _xfDefaultAccumulate(coll) {
        if (_isArray(coll)) {
            return arrayAccumulate;
        }
        else if (_isIterable(coll)) {
            if (is(Function, coll.push)) {
                return iterablePush;
            }
            else if (is(Function, coll.set)) {
                return iterableSet;
            }
            else {
                throw 'No method to accumulate iterable ' + coll.toString();
            }
        }
        else if (is(Object, coll)) {
            return objectAccumulate;
        }
    };
}();
