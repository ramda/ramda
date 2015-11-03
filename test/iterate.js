var R = require('..');
var eq = require('./shared/eq');


describe('iterate', function() {
  it('can build an infinite list', function() {
    const evens = R.iterate(R.add(2), 2);
    eq(R.take(5, evens), [2, 4, 6, 8, 10]);
  });

  it('is cool!', function() {
    const fib = pair => [pair[1], pair[0] + pair[1]];
    const fibboList = R.map(R.head, R.iterate(fib, [0, 1]));
    eq(R.take(5, fibboList), [0, 1, 1, 2, 3]);
  });

  it('can calculate square root of 2', function() {
    const rootList = R.iterate(function(guess) {
      const a = 2 / guess;
      return (guess + a) / 2;
    }, 1.5);
    eq(R.nth(5, rootList), 1.414213562373095);
  });

  it('can generate infinite list of prime numbers', function() {
    const seive = (x, arr) => R.filter(a => a % x !== 0, arr);
    const fn = list => seive(R.head(list), R.tail(list));
    const primes = R.map(R.head, R.iterate(fn, R.xrange(1, 2, Infinity)));
    eq(R.take(5, primes), [2, 3, 5, 7, 11]);
  });
});
