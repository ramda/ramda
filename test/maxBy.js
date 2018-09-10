var R = require('../source');
var eq = require('./shared/eq');


describe('maxBy', function() {

  it('returns the larger value as determined by the function', function() {
    eq(R.maxBy(function(n) { return n * n; }, -3, 2), -3);
    eq(R.maxBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 5, y: 10});
  });

});
