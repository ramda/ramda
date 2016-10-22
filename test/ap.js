var R = require('..');
var eq = require('./shared/eq');


describe('ap', function() {
  function mult2(x) { return x * 2; }
  function plus3(x) { return x + 3; }

  it('interprets [a] as an applicative', function() {
    eq(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
  });

  it('interprets ((->) r) as an applicative', function() {
    var f = function(r) {
      return function(a) {
        return r + a;
      };
    };
    var g = function(r) { return r * 2; };
    var h = R.ap(f, g);
    // (<*>) :: (r -> a -> b) -> (r -> a) -> (r -> b)
    // f <*> g = \x -> f x (g x)
    eq(h(10), 10 + (10 * 2));

    eq(R.ap(R.add)(g)(10), 10 + (10 * 2));
  });

  it('is curried', function() {
    var val = R.ap([mult2, plus3]);
    eq(typeof val, 'function');
    eq(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
  });

});
