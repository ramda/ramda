var R = require('../source');
var eq = require('./shared/eq');

describe('mapAsync', function() {

  it('interprets (async (->) r) as a functor', function() {
    var f = function(a) { return a - 1; };
    var g = async function(b) { return b * 2; };
    var h = R.mapAsync(f, g);
    return h(10)
      .then(h => {
        eq(h, (10 * 2) - 1);
      });
  });

  it('interprets (async (->) r) as a functor and handles multiple arguments', function() {
    var f = function(a) { return a - 1; };
    var g = async function(a, b, c) { return a + b + c; };
    var h = R.mapAsync(f, g);
    return h(10, 20, 30)
      .then(h => {
        eq(h, (10 + 20 + 30) - 1);
      });
  });

});
