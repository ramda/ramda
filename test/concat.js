var R = require('..');
var eq = require('./shared/eq');


describe('concat', function() {
  it('adds combines the elements of the two lists', function() {
    eq(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(R.concat([], ['c', 'd']), ['c', 'd']);
  });

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

});
