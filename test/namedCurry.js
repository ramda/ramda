var R = require('../source');
var eq = require('./shared/eq');

describe('namedCurry', function() {
  it('curries a single value', function() {
    var f = R.namedCurry(['a', 'b', 'c', 'd'], function({a, b, c, d}) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    var g = f({ a: 12 });
    eq(g({ b: 3, c: 6, d: 2 }), 15);
  });

  it('curries multiple values', function() {
    var f = R.namedCurry([['a'], ['b'], ['c'], ['d']], function({a, b, c, d}) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    var g = f({ a: 12, b: 3 });
    eq(g({ c: 6, d: 2}), 15);
    var h = f({ a: 12, b: 3, c: 6 });
    eq(h({ d: 2 }), 15);
  });

  it('allows further currying of a curried function', function() {
    var f = R.namedCurry(['a', 'b', 'c', 'd'], function({a, b, c, d}) {return (a + b * c) / d;}); // f(12, 3, 6, 2) == 15
    var g = f({ a: 12 });
    eq(g({ b: 3, c: 6, d: 2 }), 15);
    var h = g({ b: 3 });
    eq(h({ c: 6, d: 2 }), 15);
    eq(g({ b: 3, c: 6})({ d: 2}), 15);
  });

  it('properly reports the length of the curried function', function() {
    var f = R.namedCurry(['a', 'b', 'c', 'd'], function({a, b, c, d}) {return (a + b * c) / d;});
    eq(f.length, 1);
    var g = f({a: 12});
    eq(g.length, 1);
    var h = g({b: 3});
    eq(h.length, 1);
    eq(g({b: 3, c: 6}).length, 1);
  });

  it('preserves context', function() {
    var ctx = {x: 10};
    var f = function({a, b}) { return a + b * this.x; };
    var g = R.namedCurry(['a', 'b'], f);

    eq(g.call(ctx, {a: 2, b: 4}), 42);
    eq(g.call(ctx, {a: 2}).call(ctx, {b: 4}), 42);
  });

  it('supports R.__ placeholder', function() {
    var f = function({a, b, c}) { return [a, b, c]; };
    var _ = R.__;
    var g = R.namedCurry(['a', 'b', 'c'], f);

    eq(g({a:_, b:2, c:3})({a:1}), [1, 2, 3]);
    eq(g({a:1, b:_, c:3})({b:2}), [1, 2, 3]);
    eq(g({a:1, b:2, c:_})({c:3}), [1, 2, 3]);
    eq(g({a:1, b:_, c:_})({b:2})({c:3}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:1})({c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:1})({b:2}), [1, 2, 3]);
    eq(g({a:1, b:_, c:_})({b:2, c:3}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:1, c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:1, b:2}), [1, 2, 3]);
    eq(g({a:1, b:_, c:_})({b:_, c:3})({b:2}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:_, c:3})({a:1}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:_, b:2})({a:1}), [1, 2, 3]);
    eq(g({a:_, b:_, c:_})({a:_, b:_})({c:_})({a:1, b:2, c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:_})({a:1, b:_, c:_})({b:_, c:_})({b:2, c:_})({c:_})({c:3}), [1, 2, 3]);
  });

  it('supports @@functional/placeholder', function() {
    var f = function({a, b, c}) { return [a, b, c]; };
    var g = R.namedCurry(['a', 'b', 'c'], f);
    var _ = {'@@functional/placeholder': true, x: Math.random()};

    eq(g({a:1})({b:2})({c:3}), [1, 2, 3]);
    eq(g({a:1})({b:2, c:3}), [1, 2, 3]);
    eq(g({a:1, b:2, c:3}), [1, 2, 3]);
    eq(g({a:1, b:2, c:3}), [1, 2, 3]);

    eq(g({a:_, b:2, c:3})({a:1}), [1, 2, 3]);
    eq(g({a:1, b:_, c:3})({b:2}), [1, 2, 3]);
    eq(g({a:1, b:2, c:_})({c:3}), [1, 2, 3]);

    eq(g({a:1, b:_, c:_})({b:2})({c:3}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:1})({c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:1})({b:2}), [1, 2, 3]);

    eq(g({a:1, b:_, c:_})({b:2, c:3}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:1, c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:1, b:2}), [1, 2, 3]);

    eq(g({a:1, b:_, c:_})({b:_, c:3})({b:2}), [1, 2, 3]);
    eq(g({a:_, b:2, c:_})({a:_, c:3})({a:1}), [1, 2, 3]);
    eq(g({a:_, b:_, c:3})({a:_, b:2})({a:1}), [1, 2, 3]);

    eq(g({a:_, b:_, c:_})({a:_, b:_})({c:_})({a:1, b:2, c:3}), [1, 2, 3]);
    eq(g({a:_, b:_, c:_})({a:1, b:_, c:_})({b:_, c:_})({b:2, c:_})({c:_})({c:3}), [1, 2, 3]);
  });

  it('forwards extra arguments', function() {
    var f = function({a, b, c}) {
      void c;
      return Array.prototype.slice.call(arguments);
    };
    var g = R.namedCurry(['a', 'b', 'c'], f);

    eq(g({a:1, b:2, c:3}), [{a:1, b:2, c:3}]);
    eq(g({a:1, b:2, c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1, b:2})({c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1})({b:2, c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
    eq(g({a:1})({b:2})({c:3, d:4}), [{a:1, b:2, c:3, d:4}]);
  });
});
