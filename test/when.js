var R = require('../source');
var eq = require('./shared/eq');


describe('when', function() {
  it('calls the whenTrue function if the validator returns a truthy value', function() {
    eq(R.when(R.is(Number), R.add(1))(10), 11);
  });

  it('returns the argument unmodified if the validator returns a falsy value', function() {
    eq(R.when(R.is(Number), R.add(1))('hello'), 'hello');
  });

  it('returns a curried function', function() {
    var ifIsNumber = R.when(R.is(Number));
    eq(ifIsNumber(R.add(1))(15), 16);
    eq(ifIsNumber(R.add(1))('hello'), 'hello');
  });

});
