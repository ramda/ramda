var R = require('..');
var eq = require('./shared/eq');


describe('repeatWith', function() {
  it('repeating 0 times has no side effects', function() {
    var i = 0;
    R.repeatWith(function() {i = i + 1; return i;}, 0);
    eq(i, 0);
  });

  it('the order of the side effects occure from left to right', function() {
    var i = 0;
    eq(R.repeatWith(function() {i = i + 1; return i;}, 5), [1,2,3,4,5]);

  });

  it('is curried', function() {
    var i = 0;
    var makeFoos = R.repeatWith(function() {i = i + 1; return i;});
    eq(makeFoos(0), []);
    eq(makeFoos(3), [1,2,3]);
  });

});
