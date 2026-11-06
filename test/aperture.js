var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var assert = require('assert');


describe('aperture', function() {
  var sevenLs = [1, 2, 3, 4, 5, 6, 7];
  it('creates a list of n-tuples from a list', function() {
    eq(R.aperture(1, sevenLs), [[1], [2], [3], [4], [5], [6], [7]]);
    eq(R.aperture(2, sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
    eq(R.aperture(3, sevenLs), [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
    eq(R.aperture(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', function() {
    eq(R.aperture(6, [1, 2, 3]), []);
    eq(R.aperture(1, []), []);
  });

  it('can act as a transducer', function() {
    var expected = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]];
    eq(R.into([], R.aperture(2), sevenLs), expected);
    eq(R.transduce(R.aperture(2), R.flip(R.append), [], sevenLs), expected);
  });

  [Math.pow(2, 32), Number.MAX_SAFE_INTEGER, Infinity].forEach(function(n) {
    [[], [1, 2, 3]].forEach(function(input) {
      it('handles a window of ' + n + ' with into and ' + input.length + ' inputs', function() {
        eq(R.into([], R.aperture(n), input), R.aperture(n, input));
      });

      it('handles a window of ' + n + ' with transduce and ' + input.length + ' inputs', function() {
        eq(R.transduce(R.aperture(n), R.flip(R.append), [], input), R.aperture(n, input));
      });
    });
  });

  it('finalizes a downstream transformer even when an oversized window emits nothing', function() {
    var steps = 0;
    var results = 0;
    var xf = {
      '@@transducer/init': function() { return []; },
      '@@transducer/step': function(acc) { steps += 1; return acc; },
      '@@transducer/result': function(acc) { results += 1; return acc; }
    };
    eq(R.transduce(R.aperture(Infinity), xf, [], sevenLs), []);
    eq(steps, 0);
    eq(results, 1);
  });

  it('keeps the same windows when a downstream transducer stops early', function() {
    eq(R.into([], R.compose(R.aperture(3), R.take(2)), sevenLs), [[1, 2, 3], [2, 3, 4]]);
  });

  it('continues to reject invalid numeric array lengths', function() {
    [-1, 1.5, NaN, -Infinity].forEach(function(n) {
      assert.throws(function() { R.into([], R.aperture(n), sevenLs); }, RangeError);
    });
  });

});
