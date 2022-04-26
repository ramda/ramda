var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var Maybe = require('./shared/Maybe.js');


describe('union', function() {
  var M = [1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  it('combines two lists into the set of all their elements', function() {
    eq(R.union(M, N), [1, 2, 3, 4, 5, 6]);
  });

  it('has R.equals semantics', function() {
    eq(R.union([0], [-0]).length, 2);
    eq(R.union([-0], [0]).length, 2);
    eq(R.union([NaN], [NaN]).length, 1);
    eq(R.union([new Maybe.Just([42])], [new Maybe.Just([42])]).length, 1);
  });

});
