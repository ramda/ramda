var assert = require('assert');

var R = require('..');


describe('when', function() {
  it('calls the whenTrue function if the validator returns a truthy value', function() {
    assert.strictEqual(R.when(R.is(Number), R.add(1))(10), 11);
  });

  it('returns the argument unmodified if the validator returns a falsey value', function() {
    assert.strictEqual(R.when(R.is(Number), R.add(1))('hello'), 'hello');
  });

  it('returns a curried function', function() {
    var ifIsNumber = R.when(R.is(Number));
    assert.strictEqual(ifIsNumber(R.add(1))(15), 16);
    assert.strictEqual(ifIsNumber(R.add(1))('hello'), 'hello');
  });
});
