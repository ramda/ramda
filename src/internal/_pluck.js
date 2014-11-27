var _map = require('./_map');
var prop = require('../prop');


module.exports = function _pluck(p, list) {
    return _map(prop(p), list);
};
