var _isArray = require('./_isArray');
var _isIterable = require('./_isIterable');
var is = require('../is');

module.exports = function _xfDefaultInit(coll) {
    if (_isArray(coll)) {
        return [];
    }
    else if (_isIterable(coll)) {
        if (is(Function, coll.empty)) {
            return coll.empty();
        }
        else if (is(Function, coll.clear)) {
            return coll.clear();
        }
        else {
            throw new Error('Could not create empty collection from iterable ' + coll.toString());
        }
    }
    else if (is(Object, coll)) {
        return {};
    }
};
