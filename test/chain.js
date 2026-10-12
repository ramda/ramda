var listXf = require('./helpers/listXf.js');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var _isTransformer = require('../source/internal/_isTransformer.js');

describe('chain', function() {
  var intoArray = R.into([]);
  function add1(x) { return [x + 1]; }
  function dec(x) { return [x - 1]; }
  function times2(x) { return [x * 2]; }

  it('maps a function over a nested list and returns the (shallow) flattened result', function() {
    eq(R.chain(times2, [1, 2, 3, 1, 0, 10, -3, 5, 7]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
    eq(R.chain(times2, [1, 2, 3]), [2, 4, 6]);
  });

  it('does not flatten recursively', function() {
    function f(xs) {
      return xs[0] ? [xs[0]] : [];
    }
    eq(R.chain(f, [[1], [[2], 100], [], [3, [4]]]), [1, [2], 3]);
  });

  it('maps a function (a -> [b]) into a (shallow) flat result', function() {
    eq(intoArray(R.chain(times2), [1, 2, 3, 4]), [2, 4, 6, 8]);
  });

  it('interprets ((->) r) as a monad', function() {
    var h = function(r) { return r * 2; };
    var f = function(a) {
      return function(r) {
        return r + a;
      };
    };
    var bound = R.chain(f, h);
    // (>>=) :: (r -> a) -> (a -> r -> b) -> (r -> b)
    // h >>= f = \w -> f (h w) w
    eq(bound(10), (10 * 2) + 10);

    eq(R.chain(R.append, R.head)([1, 2, 3]), [1, 2, 3, 1]);
  });

  it('dispatches to objects that implement `chain`', function() {
    var obj = {x: 100, chain: function(f) { return f(this.x); }};
    eq(R.chain(add1, obj), [101]);
  });

  it('dispatches to transformer objects', function() {
    eq(_isTransformer(R.chain(add1, listXf)), true);
  });

  it('composes', function() {
    var mdouble = R.chain(times2);
    var mdec = R.chain(dec);
    eq(mdec(mdouble([10, 20, 30])), [19, 39, 59]);
  });

  it('can compose transducer-style', function() {
    var mdouble = R.chain(times2);
    var mdec = R.chain(dec);
    var xcomp = R.compose(mdec, mdouble);
    eq(intoArray(xcomp, [10, 20, 30]), [18, 38, 58]);
  });

  it('preserves downstream state between nested lists', function() {
    var transducer = R.compose(R.chain(function(x) { return [x, x + 10]; }), R.dropLast(1));
    eq(intoArray(transducer, [1, 2]), [1, 11, 2]);
  });

  it('completes a downstream transformer once after all nested lists', function() {
    var completions = 0;
    var transformer = {
      '@@transducer/init': function() { return []; },
      '@@transducer/step': function(acc, x) { return acc.concat([x]); },
      '@@transducer/result': function(acc) { completions += 1; return acc.join(','); }
    };
    eq(R.into(transformer, R.chain(R.identity), [[1, 2], [], [3]]), '1,2,3');
    eq(completions, 1);
  });

  it('completes a downstream transformer once when every nested list is empty', function() {
    var transducer = R.compose(R.chain(R.identity), R.all(R.identity));
    eq(intoArray(transducer, [[], []]), [true]);
  });

  it('finishes grouping after all nested lists have been flattened', function() {
    var transducer = R.compose(R.chain(R.identity), R.groupBy(function(x) { return x % 2; }));
    eq(R.into({}, transducer, [[1, 2], [3, 4]]), {0: [2, 4], 1: [1, 3]});
  });

  it('stops inside a nested list without processing further outer items', function() {
    var seen = [];
    var transducer = R.compose(
      R.chain(function(x) { seen.push(x); return [x, x + 10]; }),
      R.take(1)
    );
    eq(intoArray(transducer, [1, 2]), [1]);
    eq(seen, [1]);
  });

  it('preserves early termination through multiple chain transducers', function() {
    var transducer = R.compose(R.chain(R.identity), R.chain(R.identity), R.take(2));
    eq(intoArray(transducer, [[[1, 2], [3]], [[4]]]), [1, 2]);
  });

});
