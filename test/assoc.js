var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('assoc', function() {
  it('keeps `__proto__` property of source object', function() {
    class X {
      constructor({a, b, e, f}) {
        Object.assign(this, {a, b, e, f});
      }
    }

    var obj1 = new X({a: 1, b: {c: 2, d: 3}, e: 4, f: 5});
    var obj2 = R.assoc('e', {x: 42}, obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
    assert.strictEqual(obj2.__proto__, obj1.__proto__);
  });

  it('keeps `__proto__` property of source object unless overridden', function() {
    class X {
      constructor({a, b, e, f}) {
        Object.assign(this, {a, b, e, f});
      }
    }

    class Y {}

    var obj1 = new X({a: 1, b: {c: 2, d: 3}, e: 4, f: 5});
    var obj2 = R.assoc('__proto__', Y.prototype, obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.e, obj1.e);
    assert.strictEqual(obj2.f, obj1.f);
    assert.strictEqual(obj2.__proto__, Y.prototype);
  });

  it('makes a shallow clone of an object, overriding only the specified property', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = R.assoc('e', {x: 42}, obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
  });

  it('is the equivalent of clone and set if the property is not on the original', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = R.assoc('z', {x: 42}, obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
  });

});
