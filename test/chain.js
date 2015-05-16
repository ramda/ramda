var assert = require('assert');
var listXf = require('./helpers/listXf');

var R = require('..');
var _isTransformer = require('../src/internal/_isTransformer');

describe('chain', function() {
  var intoArray = R.into([]);
  function add1(x) { return [x + 1]; }
  function dec(x) { return [x - 1]; }
  function times2(x) { return [x * 2]; }

  it('maps a function over a nested list and returns the (shallow) flattened result', function() {
    assert.deepEqual(R.chain(times2, [1, 2, 3, 1, 0, 10, -3, 5, 7]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
    assert.deepEqual(R.chain(times2, [1, 2, 3]), [2, 4, 6]);
  });

  it('does not flatten recursively', function() {
    function f(xs) {
      return xs[0] ? [xs[0]] : [];
    }
    assert.deepEqual(R.chain(f, [[1], [[2], 100], [], [3, [4]]]), [1, [2], 3]);
  });

  it('maps a function (a -> [b]) into a (shallow) flat result', function() {
    assert.deepEqual(intoArray(R.chain(times2), [1, 2, 3, 4]), [2, 4, 6, 8]);
  });

  it('dispatches to objects that implement `chain`', function() {
    var obj = {x: 100, chain: function(f) { return f(this.x); }};
    assert.deepEqual(R.chain(add1, obj), [101]);
  });

  it('dispatches to transformer objects', function() {
    assert.strictEqual(_isTransformer(R.chain(add1, listXf)), true);
  });

  it('composes', function() {
    var mdouble = R.chain(times2);
    var mdec = R.chain(dec);
    assert.deepEqual(mdec(mdouble([10, 20, 30])), [19, 39, 59]);
  });

  it('can compose transducer-style', function() {
    var mdouble = R.chain(times2);
    var mdec = R.chain(dec);
    var xcomp = R.compose(mdec, mdouble);
    assert.deepEqual(intoArray(xcomp, [10, 20, 30]), [18, 38, 58]);
  });

  it('is curried', function() {
    var flatInc = R.chain(add1);
    assert.deepEqual(flatInc([1, 2, 3, 4, 5, 6]), [2, 3, 4, 5, 6, 7]);
  });

  it('correctly reports the arity of curried versions', function() {
    var inc = R.chain(add1);
    assert.strictEqual(inc.length, 1);
  });

});
