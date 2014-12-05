var _concat = require('./_concat');
var _foldl = require('./_foldl');
var _hasMethod = require('./_hasMethod');
var _map = require('./_map');


module.exports = function _ap(fns, vs) {
    return _hasMethod('ap', fns) ? fns.ap(vs) : _foldl(function(acc, fn) {
        return _concat(acc, _map(fn, vs));
    }, [], fns);
};
