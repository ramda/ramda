var R = require('..');
var eq = require('./shared/eq');


describe('I', function() {
  it('returns its first argument', function() {
    eq(R.I(undefined), undefined);
    eq(R.I('foo'), 'foo');
    eq(R.I('foo', 'bar'), 'foo');
  });

  it('has length 1', function() {
    eq(R.I.length, 1);
  });

});
