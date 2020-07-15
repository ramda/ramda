var R = require('../source');
var eq = require('./shared/eq');

describe('partialObject', function() {
  var disc = function({ a, b, c }) {
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partialObject(disc, { a: 3 });
    eq(f({ b: 7, c: 4 }), 1);
    var g = R.partialObject(disc, { a: 3, b: 7 });
    eq(g({ c: 4 }), 1);
  });

  it('works regardless of property order', function() {
    var f = R.partialObject(disc, { b: 7 });
    eq(f({ c: 4, a: 3 }), 1);
    var g = R.partialObject(disc, { a: 3 });
    var h = R.partialObject(g, { c: 4 })
    eq(h({ b: 7 }), 1);
  });

  it('merges deeply right', function() {
    var disc2 = function({ a, b, d }) {
      return b.c * b.c - 4 * a * d;
    };

    var f = R.partialObject(disc2, { a: 0, b: { c: 0 } });
    var g = R.partialObject(f, { a: 3, b: { c: 7 } });
    eq(g({ d: 4 }), 1);
  });
});
