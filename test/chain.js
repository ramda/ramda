var listXf = require('./helpers/listXf');

var R = require('../source');
var eq = require('./shared/eq');
var _isTransformer = require('../source/internal/_isTransformer');

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

});
