var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('omitArgs', function() {

  function sumThree(a, b, c) { return a + b + c; }

  it('adds omitted parameters to a function', function() {
    var fn = R.omitArgs(3, sumThree);
    eq(fn(1, 2, 3, 4, 5, 6), sumThree(4, 5, 6));
  });

  it('maintains the correct length property of a function', function() {
    var fn = R.omitArgs(3, sumThree);
    eq(fn.length, 3 + sumThree.length);
  });

  it('throws if resulting arity is greater than ten', function() {
    var checkError = function(err) {
      return (err instanceof Error &&
              err.message === 'The increased arity of the function passed to omitArgs must be no greater than ten');
    };
    assert.throws(function() {
      R.omitArgs(11, function() {});
    }, checkError);
    assert.throws(function() {
      R.omitArgs(2, function(a, b, c, d, e, f, g, h, i) {});
    }, checkError);
  });

});
