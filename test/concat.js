var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('concat', function() {
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

  it('throws if attempting to combine an array with a non-array', function() {
    assert.throws(function() { return R.concat([1], 2); }, TypeError);
  });

  it('throws if not an array, String, or object with a concat method', function() {
    assert.throws(function() { return R.concat({}, {}); }, TypeError);
  });

});
