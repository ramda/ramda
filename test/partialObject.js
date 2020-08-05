var R = require('../source');
var eq = require('./shared/eq');

describe('partialObject', function() {
  var discriminant = function({ a, b, c }) {
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partialObject(discriminant, { a: 3 });
    eq(f({ b: 7, c: 4 }), 1);

    var g = R.partialObject(discriminant, { a: 3, b: 7 });
    eq(g({ c: 4 }), 1);
  });

  it('works regardless of property order', function() {
    var f = R.partialObject(discriminant, { b: 7 });
    eq(f({ c: 4, a: 3 }), 1);

    var g = R.partialObject(discriminant, { a: 3 });
    var h = R.partialObject(g, { c: 4 });
    eq(h({ b: 7 }), 1);
  });

  it('merges deeply right', function() {
    var nestedDiscriminant = function({ a, c, d}) {
      return d.b * d.b - 4 * a * c;
    };

    var f = R.partialObject(nestedDiscriminant, { a: 0, d: { b: 0 } });
    var g = R.partialObject(f, { a: 3, d: { b: 7 } });
    eq(g({ c: 4 }), 1);
  });
});
