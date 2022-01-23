var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('append', function() {
  it('adds the element to the end of the list', function() {
    eq(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
    eq(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
  });

  it('works on empty list', function() {
    eq(R.append(1, []), [1]);
  });

});
