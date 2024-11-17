import _rebuild from './_rebuild.js';

var mapKeys = function mapKeys(fn, obj) {
  return _rebuild(function(k, v) {return [[fn(k), v]];}, obj);
};

export default mapKeys;
