var R = require('..');
var eq = require('./shared/eq');


describe('forEachObjIndexed', function() {
  var obj = { x: 1, y: 2, z: 123 };

  it('performs the passed in function on each element of the list', function() {
    var sideEffect = {};
    R.forEachObjIndexed(function(value, key) {sideEffect[key] = value;}, obj);
    eq(sideEffect, obj);
  });

  it('returns the original object', function() {
    var s = '';
    eq(R.forEachObjIndexed(function(value) { s += value; }, obj), obj);
    eq('12123', s);
  });

  it('dispatches to `forEachObjIndexed` method', function() {
    var dispatched = false;
    var fn = function() {};
    function DummyObject() {}
    DummyObject.prototype.forEachObjIndexed = function(callback) {
      dispatched = true;
      eq(callback, fn);
    }
    R.forEachObjIndexed(fn, new DummyObject());
    eq(dispatched, true);
  });

  it('is curried', function() {
    var xStr = '';
    var xe = R.forEachObjIndexed(function(v) { xStr += (v + ' '); });
    eq(typeof xe, 'function');
    xe(obj);
    eq(xStr, '1 2 123 ');
  });

});
