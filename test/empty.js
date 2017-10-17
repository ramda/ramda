var R = require('..');
var eq = require('./shared/eq');


describe('empty', function() {

  it('returns empty array given array', function() {
    eq(R.empty([1, 2, 3]), []);
  });

  it('returns empty object given object', function() {
    eq(R.empty({x: 1, y: 2}), {});
  });

  it('returns empty string given string', function() {
    eq(R.empty('abc'), '');
    eq(R.empty(new String('abc')), '');
  });

});
