var assert = require('assert');

var R = require('..');


describe('adjustPath', function() {
  it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
    var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
    var obj2 = R.adjustPath(R.add(1), ['f', 'g', 'i'],  obj1);
    assert.deepEqual(obj2,
        {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 6, j: {k: 6, l: 7}}}, m: 8}
    );
    // Note: reference equality below!
    assert.strictEqual(obj2.a, obj1.a);
    assert.strictEqual(obj2.m, obj1.m);
    assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
    assert.strictEqual(obj2.f.g.j, obj1.f.g.j);

    // Ensure no inplace mutations. New references for the changed path.
    assert.notStrictEqual(obj2.f, obj1.f);
    assert.notStrictEqual(obj2.f.g, obj1.f.g);
    assert.notStrictEqual(obj2.f.g, obj1.f.g);
  });

  it('is curried', function() {
    var obj1 = {a: {b: ['first']}};
    var expected = {a: {b: ['first', 'second']}};
    var f = R.adjustPath(R.append('second'));
    var g = f(['a', 'b']);

    assert.deepEqual(f(['a', 'b'], obj1), expected);
    assert.deepEqual(g(obj1), expected);
  });

  it('creates missing objects', function() {
    assert.deepEqual(R.adjustPath(R.always('foo'), ['a', 'b'], {}), {a: {b: 'foo'}});
  });

  it('accepts empty path', function() {
    function fn() {
      assert(false, 'fn must not execute');
    }
    assert.deepEqual(R.adjustPath(fn, [], {a: 1, b: 2}), {a: 1, b: 2});
  });

});
