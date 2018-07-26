var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('pickBy', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('creates a copy of the object', function() {
    assert.notStrictEqual(R.pickBy(R.always(true), obj), obj);
  });

  it('when returning truthy, keeps the key', function() {
    eq(R.pickBy(R.T, obj), obj);
    eq(R.pickBy(R.always({}), obj), obj);
    eq(R.pickBy(R.always(1), obj), obj);
  });

  it('when returning falsy, keeps the key', function() {
    eq(R.pickBy(R.always(false), obj), {});
    eq(R.pickBy(R.always(0), obj), {});
    eq(R.pickBy(R.always(null), obj), {});
  });

  it('is called with (val,key,obj)', function() {
    eq(R.pickBy(function(val, key, _obj) {
      eq(_obj, obj);
      return key === 'd' && val === 4;
    }, obj), {d: 4});
  });

  it('retrieves prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    eq(R.pickBy(function(val) {return val < 45;}, obj), {v: 10, w: 20, x: 30, y: 40});
  });

});
