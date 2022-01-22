var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('prepend', function() {
  it('adds the element to the beginning of the list', function() {
    eq(R.prepend('x', ['y', 'z']), ['x', 'y', 'z']);
    eq(R.prepend(['a', 'z'], ['x', 'y']), [['a', 'z'], 'x', 'y']);
  });

  it('works on empty list', function() {
    eq(R.prepend(1, []), [1]);
  });

});
