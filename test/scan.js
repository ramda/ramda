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

  it('emits the seed when transducing nonempty and empty inputs', function() {
    eq(R.transduce(R.scan(add, 0), R.flip(R.append), [], [1, 2, 3]), [0, 1, 3, 6]);
    eq(R.transduce(R.scan(mult, 1), R.flip(R.append), [], []), [1]);
  });

  it('emits the seed when an upstream filter removes every input', function() {
    var xf = R.compose(R.filter(R.F), R.scan(add, 10));
    eq(R.transduce(xf, R.flip(R.append), [], [1, 2]), [10]);
  });

  it('keeps the scan seed separate from the reduction accumulator', function() {
    eq(R.transduce(R.scan(add, 10), add, 100, [1, 2]), 134);
  });

  it('emits the seed of each composed scan', function() {
    var xf = R.compose(R.scan(add, 0), R.scan(add, 10));
    eq(R.transduce(xf, R.flip(R.append), [], [1, 2]), [10, 10, 11, 14]);
  });

  [0, 1].forEach(function(n) {
    it('respects termination while emitting the seed with take(' + n + ')', function() {
      var reducer = sinon.spy(add);
      var xf = R.compose(R.scan(reducer, 0), R.take(n));
      eq(R.transduce(xf, R.flip(R.append), [], [1, 2]), n === 0 ? [] : [0]);
      sinon.assert.notCalled(reducer);
    });
  });

  it('unwraps termination while emitting a seed at completion', function() {
    var xf = R.compose(R.scan(add, 10), R.take(1));
    eq(R.transduce(xf, R.flip(R.append), [], []), [10]);
  });

  it('does not initialize the reducer and finalizes it exactly once', function() {
    var completions = 0;
    var transformer = {
      '@@transducer/init': function() { throw new Error('unexpected init'); },
      '@@transducer/step': function(acc, x) { return acc.concat([x]); },
      '@@transducer/result': function(acc) { completions += 1; return acc.join(','); }
    };
    eq(R.transduce(R.scan(add, 0), transformer, [], [1, 2]), '0,1,3');
    eq(completions, 1);
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
