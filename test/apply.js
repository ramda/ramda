var R = require('../source');
var eq = require('./shared/eq');


describe('apply', function() {
  it('applies function to argument list', function() {
    eq(R.apply(Math.max, [1, 2, 3, -99, 42, 6, 7]), 42);
  });

  it('provides no way to specify context', function() {
    var obj = {method: function() { return this === obj; }};
    eq(R.apply(obj.method, []), false);
    eq(R.apply(R.bind(obj.method, obj), []), true);
  });

});
