var R = require('..');
var eq = require('./shared/eq');


describe('test', function() {
  it('returns true if string matches pattern', function() {
    eq(R.test(/^x/, 'xyz'), true);
  });

  it('returns false if string does not match pattern', function() {
    eq(R.test(/^y/, 'xyz'), false);
  });

  it('is referentially transparent', function() {
    var pattern = /x/g;
    eq(pattern.lastIndex, 0);
    eq(R.test(pattern, 'xyz'), true);
    eq(pattern.lastIndex, 0);
    eq(R.test(pattern, 'xyz'), true);
  });
});
