var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('concat', function() {
  it('adds combines the elements of the two lists', function() {
    eq(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(R.concat([], ['c', 'd']), ['c', 'd']);
  });

  var z1 = {
    x: 'z1',
    concat: function(that) { return this.x + ' ' + that.x; }
  };
  var z2 = {
    x: 'z2'
  };

  it('adds combines the elements of the two lists', function() {
    eq(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(R.concat([], ['c', 'd']), ['c', 'd']);
  });

  it('works on strings', function() {
    eq(R.concat('foo', 'bar'), 'foobar');
    eq(R.concat('x', ''), 'x');
    eq(R.concat('', 'x'), 'x');
    eq(R.concat('', ''), '');
  });

  it('delegates to non-String object with a concat method, as second param', function() {
    eq(R.concat(z1, z2), 'z1 z2');
  });

  it('merges objects', function() {
    const src = { foo: 1, bar: 2 };
    const res = R.concat(src, { foo: 3 });
    eq(res, { foo: 3, bar: 2 });
    assert.notDeepStrictEqual(src, res, "doesn't mutate src");
  });

  it('merges Maps', function() {
    const src = new Map([['foo', 1], ['bar', 2]]);
    const res = R.concat(src, new Map([['foo', 3]]));
    assert.deepStrictEqual(res, new Map([['foo', 3], ['bar', 2]]));
    assert.notDeepStrictEqual(src, res, "doesn't mutate src");
  });

  it('throws if attempting to combine an array with a non-array', function() {
    assert.throws(function() { return R.concat([1], 2); }, TypeError);
  });

  it('throws if not an array, string, or object', function() {
    assert.throws(function() { return R.concat(null, null); }, TypeError);
    assert.throws(function() { return R.concat(0, 0); }, TypeError);
  });

});
