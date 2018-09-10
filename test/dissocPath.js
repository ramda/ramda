var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('dissocPath', function() {
  it('makes a shallow clone of an object, omitting only what is necessary for the path', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: [{ g: 4}, {h: 5, i: 6, j: {k: 7, l: 8}}], m: 9};
    var obj2 = R.dissocPath(['f', 1, 'i'], obj1);
    eq(obj2,
      {a: {b: 1, c: 2, d: {e: 3}}, f: [{g: 4}, {h: 5, j: {k: 7, l: 8}}], m: 9}
    );
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.m, obj1.m);
    assert.strictEqual(obj2.f[0], obj1.f[0]);
    assert.strictEqual(obj2.f[1].h, obj1.f[1].h);
    assert.strictEqual(obj2.f[1].j, obj1.f[1].j);
  });

  it('does not try to omit inner properties that do not exist', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = R.dissocPath(['x', 0, 'z'], obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
  });

  it('leaves an empty object when all properties omitted', function() {
    var obj1 = {a: 1, b: {c: 2}, d: 3};
    var obj2 = R.dissocPath(['b', 'c'], obj1);
    eq(obj2,
      {a: 1, b: {}, d: 3}
    );
  });

  it('leaves an empty array when all indexes are omitted', function() {
    var obj1 = {a: 1, b: [2], d: 3};
    var obj2 = R.dissocPath(['b', 0], obj1);
    eq(obj2,
      {a: 1, b: [], d: 3}
    );
  });

  it('flattens properties from prototype', function() {
    var F = function() {};
    F.prototype.a = 1;
    var obj1 = new F();
    obj1.b = {c: 2, d: 3};
    var obj2 = R.dissocPath(['b', 'c'], obj1);
    eq(obj2,
      {a: 1, b: {d: 3}}
    );
  });

  it('accepts empty path', function() {
    eq(R.dissocPath([], {a: 1, b: 2}), {a: 1, b: 2});
  });

  it('allow integer to be used as key for object', function() {
    eq(R.dissocPath([42], {a: 1, b: 2, 42: 3}), {a: 1, b: 2});
  });

});
