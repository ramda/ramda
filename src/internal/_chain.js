var _curry2 = require('./_curry2');
var map = require('../map');
var unnest = require('../unnest');


module.exports = _curry2(function _chain(f, list) {
  return unnest(map(f, list));
});
