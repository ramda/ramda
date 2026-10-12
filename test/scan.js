var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var sinon = require('sinon');


describe('scan', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};
  var double = function(x) {return 2 * x;};

  it('scans simple functions over arrays with the supplied accumulator', function() {
    eq(R.scan(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
    eq(R.scan(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.scan(add, 0, []), [0]);
    eq(R.scan(mult, 1, []), [1]);
  });

  it('works with transducers', function() {
    eq(R.into([], R.scan(add, 0), [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
    eq(R.into([], R.scan(mult, 1), []), [1]);
  });

  it('includes the initial scan value when using transduce', function() {
    eq(R.transduce(R.scan(add, 0), R.flip(R.append), [], [1, 2, 3]), [0, 1, 3, 6]);
    eq(R.transduce(R.scan(mult, 1), R.flip(R.append), [], []), [1]);
  });

  it('keeps the scan seed separate from the reduction accumulator', function() {
    eq(R.transduce(R.scan(add, 10), add, 100, [1, 2]), 134);
    eq(R.transduce(R.scan(add, 10), add, 100, []), 110);
  });

  it('does not call the transformer init when using transduce', function() {
    var init = sinon.spy();
    var transformer = {
      '@@transducer/init': init,
      '@@transducer/step': R.flip(R.append),
      '@@transducer/result': R.identity
    };
    eq(R.transduce(R.scan(add, 0), transformer, ['existing'], [1]), ['existing', 0, 1]);
    sinon.assert.notCalled(init);
  });

  it('includes the initial scan value after all inputs are filtered out', function() {
    var transducer = R.compose(R.filter(R.F), R.scan(add, 0));
    eq(R.transduce(transducer, R.flip(R.append), [], [1, 2]), [0]);
    eq(R.into([], transducer, [1, 2]), [0]);
  });

  it('composes scans when using transduce', function() {
    var transducer = R.compose(R.scan(add, 0), R.scan(add, 10));
    eq(R.transduce(transducer, R.flip(R.append), [], [1, 2]), [10, 10, 11, 14]);
    eq(R.transduce(transducer, R.flip(R.append), [], []), [10, 10]);
  });

  it('finalizes an empty scan once and unwraps downstream early termination', function() {
    var result = sinon.spy(R.identity);
    var transformer = {
      '@@transducer/init': Array,
      '@@transducer/step': function(acc, value) { return R.reduced(R.append(value, acc)); },
      '@@transducer/result': result
    };
    eq(R.transduce(R.scan(add, 0), transformer, [], []), [0]);
    sinon.assert.calledOnce(result);
    sinon.assert.calledWithExactly(result, [0]);
  });

  it('does not call the scan reducer after downstream termination on the seed', function() {
    var reducer = sinon.spy(add);
    var takeOne = R.compose(R.scan(reducer, 0), R.take(1));
    var takeNone = R.compose(R.scan(reducer, 0), R.take(0));
    eq(R.transduce(takeOne, R.flip(R.append), [], [1, 2]), [0]);
    eq(R.transduce(takeNone, R.flip(R.append), [], [1, 2]), []);
    eq(R.transduce(takeNone, R.flip(R.append), [], []), []);
    sinon.assert.notCalled(reducer);
  });

  it('composes with other transducers', function() {
    eq(R.into([], R.compose(R.scan(mult, 1), R.take(2)), [1, 2, 3, 4]), [1, 1]);
    eq(R.into([], R.compose(R.scan(mult, 1), R.map(double)), [1, 2, 3, 4]), [2, 2, 4, 12, 48]);
  });

  it('works lazily: taking 3 elements must call reducer twice', function() {
    var reducer = sinon.spy();
    R.into([], R.compose(R.scan(reducer, 0), R.take(3)), [1, 2, 3, 4]);
    sinon.assert.calledTwice(reducer);
  });

  it('works lazily: taking 0 elements must call reducer 0 times', function() {
    var reducer = sinon.spy();
    R.into([], R.compose(R.scan(reducer, 0), R.take(0)), [1, 2, 3, 4]);
    sinon.assert.notCalled(reducer);
  });
});
