var _indexOf = require('./_indexOf');
var _keys = require('./_keys');


module.exports = {

  get: function(key, obj) {
    return obj[key];
  },

  has: function(key, obj) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  },

  keys: _keys,

  values: function(obj) {
    var values = [];
    var keys = _keys(obj);
    var len = keys.length;
    var idx = -1;
    while (++idx < len) {
      values[idx] = obj[keys[idx]];
    }
    return values;
  },

  assoc: function(key, val, obj) {
    var result = {};
    for (var k in obj) {
      result[k] = obj[k];
    }
    result[key] = val;
    return result;
  },

  dissoc: function(key, obj) {
    var result = {};
    for (var k in obj) {
      result[k] = obj[k];
    }
    delete result[key];
    return result;
  },

  omit: function(keys, obj) {
    var result = {};
    for (var key in obj) {
      if (_indexOf(keys, key) < 0) {
        result[key] = obj[key];
      }
    }
    return result;
  }

};
