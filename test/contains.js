var R = require('..');
var eq = require('./shared/eq');


describe('contains', function() {
  it('returns true if an element is in a list', function() {
    eq(R.contains(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
  });

  it('returns false if an element is not in a list', function() {
    eq(R.contains(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
  });

  it('returns false for the empty list', function() {
    eq(R.contains(1, []), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.contains(0, [-0]), false);
    eq(R.contains(-0, [0]), false);
    eq(R.contains(NaN, [NaN]), true);
    eq(R.contains(new Just([42]), [new Just([42])]), true);
  });

  it('is curried', function() {
    eq(typeof R.contains(7), 'function');
    eq(R.contains(7)([1, 2, 3]), false);
    eq(R.contains(7)([1, 2, 7, 3]), true);
  });

  it('is curried like a binary operator, that accepts an inital placeholder', function() {
    var isDigit = R.contains(R.__, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    eq(typeof isDigit, 'function');
    eq(isDigit('0'), true);
    eq(isDigit('1'), true);
    eq(isDigit('x'), false);
  });
});
