var assert = require('assert');

var R = require('..');


describe('set', function() {
  it('handles flat object', function() {
    var a = {w: 1, x: 2, y: 3, z: 4};
    var b = R.set({y: 5}, a);
    assert.deepEqual(b, {w: 1, x: 2, y: 5, z: 4});
  });

  it('add new properties to original object', function() {
    var a = {w: 1, x: 2, y: 3};
    var b = R.set({z: 4}, a);
    assert.deepEqual(b, {w: 1, x: 2, y: 3, z: 4});
  });

  it('handles nested objects', function() {
    var a = {w: 1, x: {a: 1, b: 2, c: 3}, z: 4};
    var b = R.set({x: {a: 5}}, a);
    assert.deepEqual(b, {w: 1, x: {a: 5, b: 2, c: 3}, z: 4});
  });

  it('swallow copies when possible', function() {
    var a = {w: 1, x: {a: 1, b: 2, c: 3}, z: 4};
    var b = R.set({z: 5}, a);
    assert.strictEqual(a.x, b.x);
    var c = R.set({x: {a: 5}}, a);
    assert.notStrictEqual(a.x, c.x);
  });

  it('overrides arrays', function() {
    var a = {w: 1, x: [1, 2, 3], z: 4};
    var b = R.set({x: [4]}, a);
    assert.deepEqual(b.x, [4]);
  });
});
