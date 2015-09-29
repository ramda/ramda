var R = require('..');
var eq = require('./shared/eq');


describe('prepend', function() {
  it('adds the element to the beginning of the list', function() {
    eq(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
    eq(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
  });

  it('works on empty list', function() {
    eq(R.prepend(1, []), [1]);
  });

  it('is curried', function() {
    eq(typeof R.prepend(4), 'function');
    eq(R.prepend(4)([3, 2, 1]), [4, 3, 2, 1]);
  });
});
