var R = require('../source');
var eq = require('./shared/eq');


describe('forEachObjIndexed', function() {
  var obj = { x: 1, y: 2, z: 123 };

  it('performs the passed in function on each key and value of the object', function() {
    var sideEffect = {};
    R.forEachObjIndexed(function(value, key) { sideEffect[key] = value; }, obj);
    eq(sideEffect, obj);
  });

  it('returns the original object', function() {
    var s = '';
    eq(R.forEachObjIndexed(function(value) { s += value; }, obj), obj);
    eq('12123', s);
  });

});
