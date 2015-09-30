var R = require('..');
var eq = require('./shared/eq');


describe('nthArg', function() {
  it('returns a function which returns its nth argument', function() {
    eq(R.nthArg(0)('foo', 'bar'), 'foo');
    eq(R.nthArg(1)('foo', 'bar'), 'bar');
    eq(R.nthArg(2)('foo', 'bar'), undefined);
  });

  it('accepts negative offsets', function() {
    eq(R.nthArg(-1)('foo', 'bar'), 'bar');
    eq(R.nthArg(-2)('foo', 'bar'), 'foo');
    eq(R.nthArg(-3)('foo', 'bar'), undefined);
  });

  it('returns a function with length 0', function() {
    eq(R.nthArg(2).length, 0);
  });
});
