var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('assoc', function() {
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

  it('is curried', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var expected = {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5};
    var f = R.assoc('e');
    var g = f({x: 42});
    eq(f({x: 42}, obj1), expected);
    eq(g(obj1), expected);
  });

  it('does not flatten object prototype properties', function() {
    function Player() { this.a = 1; this.b = 2 }
    Player.prototype.sayHello = function() { return 'Hello' }

    var obj1 = new Player()
    var obj2 = R.assoc('a', 42, obj1);
    eq(obj2, {a: 42, b: 2});
  });

  it('keeps the prototype properties of the provided object', function() {
    function Player() { this.a = 1; this.b = 2 }
    Player.prototype.sayHello = function() { return 'Hello' }

    var obj1 = new Player()
    var obj2 = R.assoc('a', 42, obj1);

    assert.strictEqual(obj2.sayHello(), 'Hello');
  });

});
