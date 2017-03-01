var R = require('..');

var eq = require('./shared/eq');


//  wrap :: Semigroup a => a -> a -> a -> a
var wrap = function(a) {
  return function(z) {
    return function(s) {
      return R.concat(R.concat(a, s), z);
    };
  };
};


describe('lift3', function() {

  it('lifts a ternary function', function() {
    eq(R.lift3(wrap, ['<'], ['>'], ['A', 'B', 'C']), ['<A>', '<B>', '<C>']);
    eq(R.lift3(wrap, ['', '<'], ['', '>'], ['A', 'B', 'C']), ['A', 'B', 'C', 'A>', 'B>', 'C>', '<A', '<B', '<C', '<A>', '<B>', '<C>']);
  });

});
