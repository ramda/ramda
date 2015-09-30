var R = require('..');
var eq = require('./shared/eq');


describe('add', function() {
  it('adds together two numbers', function() {
    eq(R.add(3, 7), 10);
  });

  it('is curried', function() {
    var incr = R.add(1);
    eq(incr(42), 43);
  });
});
