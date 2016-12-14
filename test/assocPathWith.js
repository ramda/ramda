var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('assocPathWith', function() {
  it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
    var obj2 = R.assocPathWith(R.always({x: 42}), ['f', 'g', 'i'], obj1);
    eq(obj2,
      {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8}
    );
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.m, obj1.m);
    assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
    assert.strictEqual(obj2.f.g.j, obj1.f.g.j);
  });

  it('applies function to the value at the end of the path', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
    var obj2 = R.assocPathWith(R.add(2), ['f', 'g', 'i'], obj1);
    var obj3 = R.assocPathWith(R.multiply(2), ['f', 'g', 'i'], obj1);
    var obj4 = R.assocPathWith(R.keys, ['f', 'g'], obj1);
    eq(obj2,
      {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 7, j: {k: 6, l: 7}}}, m: 8}
    );
    eq(obj3,
      {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 10, j: {k: 6, l: 7}}}, m: 8}
    );
    eq(obj4,
      {a: {b: 1, c: 2, d: {e: 3}}, f: {g: ['h', 'i', 'j']}, m: 8}
    );
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.m, obj1.m);
    assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
    assert.strictEqual(obj2.f.g.j, obj1.f.g.j);
  });

  it('is the equivalent of clone and setPath if the property is not on the original', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = R.assocPathWith(R.always({w: 42}), ['x', 'y', 'z'], obj1);
    eq(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: {y: {z: {w: 42}}}});
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.b, obj1.b);
    assert.strictEqual(obj2.f, obj1.f);
  });

  it('is curried', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
    var expected = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8};
    var f = R.assocPathWith(R.always({x: 42}));
    var g = f(['f', 'g', 'i']);
    eq(f(['f', 'g', 'i'], obj1), expected);
    eq(g(obj1), expected);
  });

  it('empty path applies the the whole object to the function', function() {
    eq(R.assocPathWith(R.always(3), [], {a: 1, b: 2}), 3);
  });

});
