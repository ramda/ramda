var R = require('..');
var eq = require('./shared/eq');


describe('always', function() {
  it('returns a function that returns the object initially supplied', function() {
    var theMeaning = R.always(42);
    eq(theMeaning(), 42);
    eq(theMeaning(10), 42);
    eq(theMeaning(false), 42);
  });

  it('works with various types', function() {
    eq(R.always(false)(), false);
    eq(R.always('abc')(), 'abc');
    eq(R.always({a: 1, b: 2})(), {a: 1, b: 2});
    var obj = {a: 1, b: 2};
    eq(R.always(obj)(), obj);
    var now = new Date(1776, 6, 4);
    eq(R.always(now)(), new Date(1776, 6, 4));
    eq(R.always(undefined)(), undefined);
  });
});
