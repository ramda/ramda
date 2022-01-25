var R = require('../source/index.js');
var eq = require('./shared/eq.js');


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
