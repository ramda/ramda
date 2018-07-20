var R = require('../source');
var eq = require('./shared/eq');


describe('without', function() {
  it('returns an array not containing values in the first argument', function() {
    eq(R.without([1, 2], [1, 2, 1, 4, 5]), [4, 5]);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.without([1]), [1]), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.without([0], [-0]).length, 1);
    eq(R.without([-0], [0]).length, 1);
    eq(R.without([NaN], [NaN]).length, 0);
    eq(R.without([[1]], [[1]]).length, 0);
    eq(R.without([new Just([42])], [new Just([42])]).length, 0);
  });
});
