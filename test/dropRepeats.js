var R = require('../source');
var eq = require('./shared/eq');


describe('dropRepeats', function() {
  var objs = [1, 2, 3, 4, 5, 3, 2];
  var objs2 = [1, 2, 2, 2, 3, 4, 4, 5, 5, 3, 2, 2];

  it('removes repeated elements', function() {
    eq(R.dropRepeats(objs2), objs);
    eq(R.dropRepeats(objs), objs);
  });

  it('returns an empty array for an empty array', function() {
    eq(R.dropRepeats([]), []);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.dropRepeats, objs2), objs);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.dropRepeats([0, -0]).length, 2);
    eq(R.dropRepeats([-0, 0]).length, 2);
    eq(R.dropRepeats([NaN, NaN]).length, 1);
    eq(R.dropRepeats([new Just([42]), new Just([42])]).length, 1);
  });

});
