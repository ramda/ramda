var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('empty', function() {

  it('dispatches to `empty` function on constructor', function() {
    eq(R.empty(Maybe.Nothing), Maybe.Nothing);
    eq(R.empty(Maybe.Just(0)), Maybe.Nothing);
  });

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
