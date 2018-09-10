var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('assocPath', function() {
  it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: [5, 6, 7], j: {k: 6, l: 7}}}, m: 8};
    var obj2 = R.assocPath(['f', 'g', 'i', 1], 42, obj1);
    eq(obj2.f.g.i, [5, 42, 7]);
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.m, obj1.m);
    assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
    assert.strictEqual(obj2.f.g.j, obj1.f.g.j);
  });

  it('is the equivalent of clone and setPath if the property is not on the original', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = R.assocPath(['x', 0, 'y'], 42, obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: [{y: 42}]});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.e, obj1.e);
    assert.strictEqual(obj2.f, obj1.f);
  });

  it('empty path replaces the the whole object', function() {
    eq(R.assocPath([], 3, {a: 1, b: 2}), 3);
  });

  it('replaces `undefined` with a new object', function() {
    eq(R.assocPath(['foo', 'bar', 'baz'], 42, {foo: undefined}), {foo: {bar: {baz: 42}}});
  });

  it('replaces `null` with a new object', function() {
    eq(R.assocPath(['foo', 'bar', 'baz'], 42, {foo: null}), {foo: {bar: {baz: 42}}});
  });

});
