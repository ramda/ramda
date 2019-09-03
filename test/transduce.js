var R = require('../source');
var eq = require('./shared/eq');

describe('transduce', function() {
  var add = R.add;
  var mult = function(a, b) {return a * b;};
  var isOdd = function(b) {return b % 2 === 1;};
  var square = function(a) {return a * a;};
  var addxf = {
    '@@transducer/step': function(acc, x) { return acc + x; },
    '@@transducer/init': function() { return 0; },
    '@@transducer/result': function(x) { return x; }
  };

  var listxf = {
    '@@transducer/step': function(acc, x) { return acc.concat([x]); },
    '@@transducer/init': function() { return []; },
    '@@transducer/result': function(x) { return x; }
  };

  var multxf = {
    '@@transducer/step': function(acc, x) { return acc * x; },
    '@@transducer/init': function() { return 1; },
    '@@transducer/result': function(x) { return x; }
  };

  var toxf = function(fn) {
    return function(xf) {
      return {
        f: fn,
        '@@transducer/step': xf['@@transducer/step'],
        '@@transducer/result': xf['@@transducer/result'],
        xf: xf
      };
    };
  };

  it('transduces into arrays', function() {
    eq(R.transduce(R.map(add(1)), R.flip(R.append), [], [1, 2, 3, 4]), [2, 3, 4, 5]);
    eq(R.transduce(R.filter(isOdd), R.flip(R.append), [],  [1, 2, 3, 4]), [1, 3]);
    eq(R.transduce(R.compose(R.map(add(1)), R.take(2)), R.flip(R.append), [],  [1, 2, 3, 4]), [2, 3]);
    eq(R.transduce(R.compose(R.filter(isOdd), R.take(1)), R.flip(R.append), [],  [1, 2, 3, 4]), [1]);
  });

  it('transduces into strings', function() {
    var _add = function(x, y) { return x + y; };
    eq(R.transduce(R.map(R.inc), _add, '', [1, 2, 3, 4]), '2345');
    eq(R.transduce(R.filter(isOdd), _add, '', [1, 2, 3, 4]), '13');
    eq(R.transduce(R.compose(R.map(add(1)), R.take(2)), _add, '', [1, 2, 3, 4]), '23');
  });

  it('transduces into objects', function() {
    eq(R.transduce(R.map(R.identity), R.mergeRight, {}, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

  it('folds transformer objects over a collection with the supplied accumulator', function() {
    eq(R.transduce(toxf(add), addxf, 0, [1, 2, 3, 4]), 10);
    eq(R.transduce(toxf(mult), multxf, 1, [1, 2, 3, 4]), 24);
    eq(R.transduce(toxf(R.concat), listxf, [0], [1, 2, 3, 4]), [0, 1, 2, 3, 4]);
    eq(R.transduce(toxf(add), add, 0, [1, 2, 3, 4]), 10);
    eq(R.transduce(toxf(mult), mult, 1, [1, 2, 3, 4]), 24);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.transduce(R.map(add(1)), add, 0, obj), 'override');
    eq(R.transduce(R.map(add(1)), add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty collection', function() {
    eq(R.transduce(toxf(add), addxf, 0, []), 0);
    eq(R.transduce(toxf(mult), multxf, 1, []), 1);
    eq(R.transduce(toxf(R.concat), listxf, [], []), []);
  });

  it('short circuits with reduced', function() {
    var transducer = R.compose(R.map(square), R.filter(isOdd));
    var iterator = function(acc, val) {return val > 10 ? R.reduced(acc) : R.append(val, acc);};
    var getOddSquaresWhileLessThan10 = R.transduce(transducer, iterator, []);
    eq(getOddSquaresWhileLessThan10([1, 2, 3, 4]), [1, 9]);
  });
});
