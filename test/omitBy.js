var assert = require('assert');

var R = require('..');


describe('omitBy', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('creates a copy of the object', function() {
    assert.notStrictEqual(R.omitBy(R.always(false), obj), obj);
  });

  it('when returning truthy, omit the key', function() {
    assert.deepEqual(R.omitBy(R.T, obj), {});
    assert.deepEqual(R.omitBy(R.always({}), obj), {});
    assert.deepEqual(R.omitBy(R.always(1), obj), {});
  });

  it('when returning falsy, keeps the key', function() {
    assert.deepEqual(R.omitBy(R.always(false), obj), obj);
    assert.deepEqual(R.omitBy(R.always(0), obj), obj);
    assert.deepEqual(R.omitBy(R.always(null), obj), obj);
  });

  it('is called with (val,key,obj)', function() {
    assert.deepEqual(R.omitBy(function(val, key, _obj) {
      assert.strictEqual(_obj, obj);
      return key === 'd' && val === 4;
    }, obj), R.omit(['d'], obj));
  });

  it('retrieves prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    assert.deepEqual(
      R.omitBy(function(val) {return val < 45;}, obj), {z: 50}
    );
  });

  it('is curried', function() {
    var copier = R.omitBy(R.T);
    assert.deepEqual(copier(obj), {});
  });
});
