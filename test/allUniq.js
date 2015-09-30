var R = require('..');
var eq = require('./shared/eq');


describe('allUniq', function() {
  it('returns true if a list is composed of unique elements', function() {
    var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    eq(R.allUniq(list), false);
    eq(R.allUniq([3, 1, 4, 2, 5, 7, 9]), true);
  });

  it('returns true for an empty array', function() {
    eq(R.allUniq([]), true);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.allUniq([0, -0]), true);
    eq(R.allUniq([-0, 0]), true);
    eq(R.allUniq([NaN, NaN]), false);
    eq(R.allUniq([new Just([42]), new Just([42])]), false);
  });

});
