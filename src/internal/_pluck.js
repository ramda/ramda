var map = require('../map');
var prop = require('../prop');


module.exports = function _pluck(p, list) {
  return map(prop(p), list);
};
