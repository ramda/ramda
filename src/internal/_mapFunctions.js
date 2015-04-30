module.exports = {

  get: function(key, map) {
    return map.get(key);
  },

  has: function(key, map) {
    return map.has(key);
  },

  keys: function(map) {
    var keys = [];
    var iter = map.keys();
    var next;
    while (!(next = iter.next()).done) {
      keys.push(next.value);
    }
    return keys;
  },

  values: function(map) {
    var values = [];
    var iter = map.values();
    var next;
    while (!(next = iter.next()).done) {
      values.push(next.value);
    }
    return values;
  },

  assoc: function(key, val, map) {
    var result = new Map(map.entries());
    result.set(key, val);
    return result;
  },

  dissoc: function(key, map) {
    var result = new Map(map.entries());
    result.delete(key);
    return result;
  },

  omit: function(keys, map) {
    var result = new Map(map.entries());
    var len = keys.length;
    var idx = -1;
    while (++idx < len) {
      result.delete(keys[idx]);
    }
    return result;
  }

};
