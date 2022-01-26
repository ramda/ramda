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
