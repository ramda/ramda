var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


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

  it('makes a shallow clone of an array, overriding only the specified index', function() {
    var newValue = [4, 2];
    var ary1 = [1, [2, 3], 4, 5];
    var ary2 = R.assoc(2, newValue, ary1);
    eq(ary2, [1, [2, 3], [4, 2], 5]);
    // Note: reference equality below!
    assert.strictEqual(ary2[0], ary1[0]);
    assert.strictEqual(ary2[1], ary1[1]);
    assert.strictEqual(ary2[2], newValue);
    assert.strictEqual(ary2[3], ary1[3]);
  });

  it('is the equivalent of clone and set if the index is not on the original', function() {
    var newValue = [4, 2];
    var ary1 = [1, [2, 3], 4];
    var ary2 = R.assoc(5, newValue, ary1);
    eq(ary2, [1, [2, 3], 4, undefined, undefined, [4, 2]]);
    // Note: reference equality below!
    assert.strictEqual(ary2[0], ary1[0]);
    assert.strictEqual(ary2[1], ary1[1]);
    assert.strictEqual(ary2[2], ary1[2]);
    assert.strictEqual(ary2[5], newValue);
  });

  it('handles negative indexes from end of array', function() {
    var newValue = 8;
    var ary1 = [1, 2];
    var ary2 = R.assoc(-2, 8, ary1);
    eq(ary2, [8, 2]);
    // Note: reference equality below!
    assert.strictEqual(ary2[0], newValue);
    assert.strictEqual(ary2[1], ary1[1]);
  });

  it('handles Symbols', function() {
    var obj = R.assoc('c', 3, {a: 1, b: 2, [Symbol.for('test')]: 4 });

    eq(obj, {a: 1, b: 2, c: 3, [Symbol.for('test')]: 4});
    assert.strictEqual(obj.c, 3);
    assert.strictEqual(obj[Symbol.for('test')], 4);
  });

  it('sets garbage key when negative indexes wraps to < 0', function() {
    var newValue = 8;
    var ary1 = [1, 2];
    var ary2 = R.assoc(-3, 8, ary1);
    var expected = [1, 2];
    expected[-1] = 8;
    eq(ary2, expected);
    // Note: reference equality below!
    assert.strictEqual(ary2[-1], newValue);
    assert.strictEqual(ary2[0], ary1[0]);
    assert.strictEqual(ary2[1], ary1[1]);
  });
});
