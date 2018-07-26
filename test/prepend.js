var R = require('../source');
var eq = require('./shared/eq');


describe('prepend', function() {
  it('adds the element to the beginning of the list', function() {
    eq(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
    eq(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
  });

  it('works on empty list', function() {
    eq(R.prepend(1, []), [1]);
  });

});
