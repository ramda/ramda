var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('traverseWithKey', function() {

  it('passes both the key and value to the applicative producing function', function() {
    function allValid(v, k) { return k.length >= 3 && v > 0 ? S.Just(v) : S.Nothing(); }

    eq(R.traverseWithKey(S.Maybe.of, allValid, { a: 1, b: 2, c: 3 }), S.Nothing());
    eq(R.traverseWithKey(S.Maybe.of, allValid, { foo: 0, bar: 1, baz: 2 }), S.Nothing());
    eq(R.traverseWithKey(S.Maybe.of, allValid, { foo: 1, bar: 2, baz: 3 }), S.Just({ foo: 1, bar: 2, baz: 3 }));
  });

  it('applies the applicative effects consistently independent of insertion order', function() {
    function ignoreKey(v, k) { return v; }

    eq(R.traverseWithKey(R.of, ignoreKey, { a: [1, 2], b: [3, 4] }),
       R.traverseWithKey(R.of, ignoreKey, { b: [3, 4], a: [1, 2] }));

    eq(R.traverseWithKey(S.Either.of, ignoreKey, { a: S.Left(0), b: S.Left(1) }),
       R.traverseWithKey(S.Either.of, ignoreKey, { b: S.Left(1), a: S.Left(0) }));
  });

  it('handles an empty object', function() {
    eq(R.traverseWithKey(S.Either.of, function(k, v) { return v; }, {}), S.Right({}));
  });

});
