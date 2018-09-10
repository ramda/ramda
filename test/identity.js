var R = require('../source');
var eq = require('./shared/eq');


describe('identity', function() {
  it('returns its first argument', function() {
    eq(R.identity(undefined), undefined);
    eq(R.identity('foo'), 'foo');
    eq(R.identity('foo', 'bar'), 'foo');
  });

  it('has length 1', function() {
    eq(R.identity.length, 1);
  });

});
