var R = require('..');
var eq = require('./shared/eq');
var jsv = require('jsverify');
var equalsInvoker = R.invoker(1, 'equals');
var types = require('./shared/types')(equalsInvoker);

var MaybeGen = R.curry(function(a, n) {
  return n % 2 === 0 ? R.Just(a.generator(n)) : R.Nothing(n);
});

function isJust(x) {
  return x.isJust;
}

var MaybeShow = R.curry(function(a, m) {
  return (isJust(m)) ?
    'Just(' + a.show(m.value) + ')' :
    'Nothing';
});

var MaybeShrink = R.curry(function(a, m) {
  return (isJust(m)) ?
    [R.Nothing()].concat(a.shrink(m.value).map(R.Just)) :
    [];
});

var MaybeArb = function(a) {
  return {
    generator: jsv.generator.bless(MaybeGen(a)),
    show: MaybeShow(a),
    shrink: jsv.shrink.bless(MaybeShrink(a))
  };
};

describe('Maybe', function() {
  var m = MaybeArb(jsv.nat);
  var env = {Maybe: MaybeArb};
  var appF = 'Maybe (nat -> nat)';
  var appN = 'Maybe nat';

  it('has an arbitrary', function() {
    var arb = jsv.forall(m, function(m) {
      return m['@@type'] === 'ramda/Maybe';
    });
    jsv.assert(arb);
  });

  it('is a Functor', function() {
    var fTest = types.functor;

    jsv.assert(jsv.forall(m, fTest.iface));
    jsv.assert(jsv.forall(m, fTest.id));
    jsv.assert(jsv.forall(m, 'nat -> nat', 'nat -> nat', fTest.compose));
  });

  it('is an Apply', function() {
    var aTest = types.apply;

    jsv.assert(jsv.forall(m, aTest.iface));
    jsv.assert(jsv.forall(appF, appF, appN, env, aTest.compose));
  });

  it('is an Applicative', function() {
    var aTest = types.applicative;

    jsv.assert(jsv.forall(m, aTest.iface));
    jsv.assert(jsv.forall(appN, appN, env, aTest.id));
    jsv.assert(jsv.forall(appN, 'nat -> nat', 'nat', env, aTest.homomorphic));
    jsv.assert(jsv.forall(appN, appF, 'nat', env, aTest.interchange));
  });

  it('is a Chain', function() {
    var cTest = types.chain;
    var f = 'nat -> Maybe nat';

    jsv.assert(jsv.forall(m, cTest.iface));
    jsv.assert(jsv.forall(m, f, f, env, cTest.associative));
  });

  it('is a Monad', function() {
    var mTest = types.monad;

    jsv.assert(jsv.forall(m, mTest.iface));
  });

  it('is Foldable', function() {
    var fTest = types.foldable;

    jsv.assert(jsv.forall(m, fTest.iface));
    jsv.assert(jsv.forall('nat -> nat -> nat', 'nat', 'nat', function(f, n1, n2) {
      return R.Just(n1).reduce(R.uncurryN(2, f), n2) === f(n2)(n1);
    }));
    jsv.assert(jsv.forall('nat -> nat -> nat', 'nat', function(f, n) {
      return R.Nothing(null).reduce(R.uncurryN(2, f), n) === n;
    }));
  });
});

describe('Maybe usage', function() {

  describe('checking for Just | Nothing', function() {
    it('should allow the user to check if the instance is a Nothing', function() {
      eq(true, R.Nothing(null).isNothing);
      eq(false, R.Just(42).isNothing);
    });

    it('should allow the user to check if the instance is a Just', function() {
      eq(true, R.Just(42).isJust);
      eq(false, R.Nothing(null).isJust);
    });
  });

  describe('#getOrElse', function() {

    it('should return the contained value for if the instance is a Just', function() {
      eq(42, R.Just(42).getOrElse(24));
    });

    it('should return the input value if the instance is a Nothing', function() {
      eq(24, R.Nothing(null).getOrElse(24));
    });

  });

  describe('#toString', function() {

    it('returns the string representation of a Just', function() {
      eq(R.Just([1, 2, 3]).toString(), 'Just([1, 2, 3])');
    });

    it('returns the string representation of a Nothing', function() {
      eq(R.Nothing(null).toString(), 'Nothing()');
    });
  });
/**/
});
