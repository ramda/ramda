var R = require('../source');
var eq = require('./shared/eq');

describe('mapGenerator', function() {

  it('interprets generator function as a functor', function() {
    var f = function(value) { return value - 1; };
    var g = function* (b) { yield b * 2; };
    var h = R.mapGenerator(f, g);
    eq(h(10).next().value, (10 * 2) - 1);
  });

  it('interprets generator function as a functor and handles multiple arguments', function() {
    var f = function(value) { return value - 1; };
    var g = function* (a, b, c) { yield a + b + c; };
    var h = R.mapGenerator(f, g);
    eq(h(10, 20, 30).next().value, (10 + 20 + 30) - 1);
  });

});
