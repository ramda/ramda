var R = require('../source');
var eq = require('./shared/eq');


describe('tryCatch', function() {

  function headX(ls) {
    return ls[0].x;
  }

  function catcher() {
    return 10101;
  }

  it('takes two functions and return a function', function() {
    var mayThrow = R.tryCatch(headX, catcher);
    eq(typeof mayThrow, 'function');
  });

  it('returns a function with the same arity as the `tryer` function', function() {
    function a1(a) { return a; }
    function a2(a, b) { return b; }
    function a3(a, b, c) { return c; }
    function a4(a, b, c, d) { return d; }

    eq(R.tryCatch(a1, catcher).length, a1.length);
    eq(R.tryCatch(a2, catcher).length, a2.length);
    eq(R.tryCatch(a3, catcher).length, a3.length);
    eq(R.tryCatch(a4, catcher).length, a4.length);
  });

  it('returns the value of the first function if it does not throw', function() {
    var mayThrow = R.tryCatch(headX, catcher);
    eq(mayThrow([{x: 10}, {x: 20}, {x: 30}]), 10);
  });

  it('returns the value of the second function if the first function throws', function() {
    function throw10() {
      throw new Error(10);
    }

    function eCatcher(e) {
      return Number(e.message);
    }

    var mayThrow = R.tryCatch(headX, catcher);
    eq(mayThrow([]), 10101);

    var willThrow = R.tryCatch(throw10, eCatcher);
    eq(willThrow([]), 10);
    eq(willThrow([{}, {}, {}]), 10);
  });

  it('the second function gets passed the error object and the same arguments as the first function', function() {
    function thrower(a, b, c) {
      void c;
      throw new Error('throwerError');
    }

    function catch3(e, a, b, c) {
      return [e.message, a, b, c].join(' ');
    }

    var mayThrow = R.tryCatch(thrower, catch3);
    eq(mayThrow('A', 'B', 'C'), 'throwerError A B C');
  });
});
