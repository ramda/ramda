var R = require('..');
var eq = require('./shared/eq');


function ArrayChainRecEquivalence(expected, isDone, onDone, onNext, x) {
  const a = R.chainRec(Array, function(next, done, v) {
    return isDone(v) ? R.map(done, onDone(v)) : R.map(next, onNext(v));
  }, x);
  const b = (function step(v) {
    return isDone(v) ? onDone(v) : R.chain(step, onNext(v));
  }(x));
  eq(a, expected);
  eq(b, expected);
}

describe('chainRec', function() {

  it('is equivalent to using chain', function() {
    ArrayChainRecEquivalence(
      ['aa!', 'aa?', 'ab!', 'ab?', 'ba!', 'ba?', 'bb!', 'bb?'],
      function isDone(a) { return a.length == 2; },
      function onDone(a) { return [a + '!', a + '?']; },
      function onNext(a) { return [a + 'a', a + 'b']; },
      ''
    );

    ArrayChainRecEquivalence(
      [1, 2, 3, 4, 5],
      function isDone(a) { return !Array.isArray(a); },
      function onDone(a) { return [a]; },
      function onNext(a) { return a; },
      [1, [[2, 3], 4], 5]
    );
  });

  it('is stacksafe', function() {
    eq(R.chainRec(Array, function(next, done, n) {
      if (n === 0) {
        return [done('DONE')]
      } else {
        return [next(n - 1)]
      }
    }, 100000), ['DONE'])
  });

  it('dispatches to objects that implement `chainRec`', function() {
    eq(R.chainRec({ chainRec: function(f, i) { return true; }}, null, null), true);
  });

  it('is curried', function() {
    var f = R.chainRec(Array, function(next, done, i) {
      return [done(i)];
    });
    eq(f(10), [10]);
  });

  it('correctly reports the arity of curried versions', function() {
    var f = R.chainRec(Array);
    eq(f.length, 2);
  });
});
