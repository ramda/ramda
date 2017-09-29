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

  it('dispatches to the passed object\'s ap method when values is a non-Array object', function() {
    var obj = {ap: function(n) { return 'called ap with ' + n; }};
    eq(R.ap(obj, 10), obj.ap(10));
  });

  it('is curried', function() {
    var val = R.ap([mult2, plus3]);
    eq(typeof val, 'function');
    eq(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
  });

  /** Demonstrates the consistent ordering of ap with fantasy-land */
  it('fantasy-land ap', function() {
    var Left = function (value) {
      var self = {
        simple: function () { return ['Left', value]; },

        // Either e a ~> (a -> b) -> Either e b
        'fantasy-land/map': function (f) { return self; },

        // Either e a ~> Either e (a -> b) -> Either e b
        'fantasy-land/ap': function (other) { return self; }
      };
      return self;
    };

    var Right = function (value) {
      return {
        simple: function () { return ['Right', value]; },

        // Either e a ~> (a -> b) -> Either e b
        'fantasy-land/map': function (f) { return Right(f(value)); },

        // Either e a ~> Either e (a -> b) -> Either e b
        'fantasy-land/ap': function (other) {
          return other['fantasy-land/map'](function (fn) { return fn(value); });
        }
      };
    };

    var leftFn = Left('Failed fn');
    var leftVal = Left('Failed val');
    var rightFn = Right(function (x) { return x * 10; });
    var rightVal = Right(42);

    eq(R.ap(leftFn, leftVal).simple(), leftFn.simple());
    eq(R.ap(rightFn, leftVal).simple(), leftVal.simple());
    eq(R.ap(rightFn, rightVal).simple(), Right(420).simple());
    eq(R.ap(leftFn, rightVal).simple(), leftFn.simple());
  });

});
