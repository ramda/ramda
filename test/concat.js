var assert = require('assert');

var R = require('..');
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
  it('is curried', function() {
    var conc123 = R.concat([1, 2, 3]);
    eq(conc123([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
    eq(conc123(['a', 'b', 'c']), [1, 2, 3, 'a', 'b', 'c']);
  });
  it('is curried like a binary operator, that accepts an inital placeholder', function() {
    var appendBar = R.concat(R.__, 'bar');
    eq(typeof appendBar, 'function');
    eq(appendBar('foo'), 'foobar');
  });
  it('throws if not an array, String, or object with a concat method', function() {
    assert.throws(function() { return R.concat({}, {}); }, TypeError);
  });
});
