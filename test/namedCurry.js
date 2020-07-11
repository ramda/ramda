var R = require('../source');
var eq = require('./shared/eq');
var jsv = require('jsverify');
var funcN = require('./shared/funcN');

describe('namedCurry', function() {
  it('curries a single value', function() {
    var f = R.namedCurry([['a'], ['b'], ['c'], ['d']], function({a, b, c, d}) {return (a + b * c) / d;});
    var g = f({ a: 12 });
    eq(g({ b: 3, c: 6, d: 2 }), 15);
  });

  it('curries multiple values', function() {
    var f = R.namedCurry([['a'], ['b'], ['c'], ['d']], function({a, b, c, d}) {return (a + b * c) / d;});
    var g = f({ a: 12, b: 3 });
    eq(g({ c: 6, d: 2}), 15);
    var h = f({ a: 12, b: 3, c: 6 });
    eq(h({ d: 2 }), 15);
  });

  it('allows further currying of a curried function', function() {
    var f = R.namedCurry([['a'], ['b'], ['c'], ['d']], function({a, b, c, d}) {return (a + b * c) / d;});
    var g = f({ a: 12 });
    eq(g({ b: 3, c: 6, d: 2 }), 15);
    var h = g({ b: 3 });
    eq(h({ c: 6, d: 2 }), 15);
    eq(g({ b: 3, c: 6})({ d: 2}), 15);
  });

  it('forwards extra arguments', function() {
    var f = function({a, b, c}) {
      void c;
      return Array.prototype.slice.call(arguments);
    };
    var g = R.namedCurry([['a'], ['b'], ['c']], f);

    eq(g({a:1, b:2, c:3}), [{a:1, b:2, c:3}]);
    eq(g({a:1, b:2, c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1, b:2})({c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1})({b:2, c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1})({b:2})({c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
  });

  it('supports nested paths', function() {
    var f = R.namedCurry([['a'], ['b', 'c', 'd'], ['e'], ['f', 'g']], function({a, b, e, f}) {return (a + b.c.d * e) / f.g;});
    var g = f({ a: 12, b: { c: { d: 3 } } });
    eq(g({ e: 6, f: { g: 2 } }), 15);
    var h = f({ a: 12, b: { c: { d: 3 } }, e: 6 });
    eq(h({ f: { g: 2 } }), 15);
  });
});

describe('curry properties', function() {
  jsv.property('curries multiple values', funcN(4), jsv.json, jsv.json, jsv.json, jsv.json, function(f, a, b, c, d) {
    var g = R.namedCurry([['a'], ['b'], ['c'], ['d']], f);

    return R.all(R.equals(f({ a, b, c, d })), [
      g({ a, b, c, d }),
      g({a})({b})({c})({d}),
      g({a})({b, c, d}),
      g({a, b})({c, d}),
      g({a, b, c})({d})
    ]);
  });

  jsv.property('order is not important', funcN(4), jsv.json, jsv.json, jsv.json, jsv.json, function(f, a, b, c, d) {
    var g = R.namedCurry([['a'], ['b'], ['c'], ['d']], f);

    return R.all(R.equals(f({ a, b, c, d })), [
      g({ a, b, c, d }),
      g({a})({c})({b})({d}),
      g({a, d})({b, c}),
      g({c, b})({a, d}),
      g({d, c, b})({a})
    ]);
  });
});
