var R = require('../source');
var eq = require('./shared/eq');


describe('minBy', function() {

  it('returns the smaller value as determined by the function', function() {
    eq(R.minBy(function(n) { return n * n; }, -3, 2), 2);
    eq(R.minBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 3, y: 1});
  });

});
