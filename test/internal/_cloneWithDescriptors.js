var assert = require('assert');

var eq = require('../shared/eq');
var _cloneWithDescriptors = require('../../src/internal/_cloneWithDescriptors');


describe('_cloneWithDescriptors', function() {
  it('makes a shallow clone of an object', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = _cloneWithDescriptors(obj1);
    eq(obj1, obj2);
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
  });

  it('preserves computed properties', function() {
    var obj = { x: 2 };
    var obj1 = {a: 1, get b() { return obj.x; }};
    var obj2 = _cloneWithDescriptors(obj1);
    obj.x = 3;
    eq(obj2, {a: 1, b: 3});
  });

});
