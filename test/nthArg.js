var R = require('../source');
var eq = require('./shared/eq');


describe('nthArg', function() {
  it('returns a function which returns its nth argument', function() {
    eq(R.nthArg(0)('foo', 'bar'), 'foo');
    eq(R.nthArg(1)('foo', 'bar'), 'bar');
  });

  it('accepts negative offsets', function() {
    eq(R.nthArg(-1)('foo', 'bar'), 'bar');
    eq(R.nthArg(-2)('foo', 'bar'), 'foo');
    eq(R.nthArg(-3)('foo', 'bar'), undefined);
  });

  it('returns a function with length n + 1 when n >= 0', function() {
    eq(R.nthArg(0).length, 1);
    eq(R.nthArg(1).length, 2);
    eq(R.nthArg(2).length, 3);
    eq(R.nthArg(3).length, 4);
  });

  it('returns a function with length 1 when n < 0', function() {
    eq(R.nthArg(-1).length, 1);
    eq(R.nthArg(-2).length, 1);
    eq(R.nthArg(-3).length, 1);
  });

  it('returns a curried function', function() {
    eq(R.nthArg(1)('foo', 'bar'), R.nthArg(1)('foo')('bar'));
    eq(R.nthArg(2)('foo', 'bar', 'baz'), R.nthArg(2)('foo')('bar')('baz'));
  });
});
