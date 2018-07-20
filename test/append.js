var R = require('../source');
var eq = require('./shared/eq');


describe('append', function() {
  it('adds the element to the end of the list', function() {
    eq(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
    eq(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
  });

  it('works on empty list', function() {
    eq(R.append(1, []), [1]);
  });

});
