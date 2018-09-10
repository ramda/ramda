var R = require('../source');
var eq = require('./shared/eq');


describe('ifElse', function() {
  var t = function(a) { return a + 1; };
  var identity = function(a) { return a; };
  var isArray = function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

  it('calls the truth case function if the validator returns a truthy value', function() {
    var v = function(a) { return typeof a === 'number'; };
    eq(R.ifElse(v, t, identity)(10), 11);
  });

  it('calls the false case function if the validator returns a falsy value', function() {
    var v = function(a) { return typeof a === 'number'; };
    eq(R.ifElse(v, t, identity)('hello'), 'hello');
  });

  it('calls the true case on array items and the false case on non array items', function() {
    var list = [[1, 2, 3, 4, 5], 10, [0, 1], 15];
    var arrayToLength = R.map(R.ifElse(isArray, R.prop('length'), identity));
    eq(arrayToLength(list), [5, 10, 2, 15]);
  });

  it('passes the arguments to the true case function', function() {
    var v = function() { return true; };
    var onTrue = function(a, b) {
      eq(a, 123);
      eq(b, 'abc');
    };
    R.ifElse(v, onTrue, identity)(123, 'abc');
  });

  it('passes the arguments to the false case function', function() {
    var v = function() { return false; };
    var onFalse = function(a, b) {
      eq(a, 123);
      eq(b, 'abc');
    };
    R.ifElse(v, identity, onFalse)(123, 'abc');
  });

  it('returns a function whose arity equals the max arity of the three arguments to `ifElse`', function() {
    function a0() { return 0; }
    function a1(x) { return x; }
    function a2(x, y) { return x + y; }

    eq(R.ifElse(a0, a1, a2).length, 2);
    eq(R.ifElse(a0, a2, a1).length, 2);
    eq(R.ifElse(a1, a0, a2).length, 2);
    eq(R.ifElse(a1, a2, a0).length, 2);
    eq(R.ifElse(a2, a0, a1).length, 2);
    eq(R.ifElse(a2, a1, a0).length, 2);
  });

  it('returns a curried function', function() {
    var v = function(a) { return typeof a === 'number'; };
    var ifIsNumber = R.ifElse(v);
    eq(ifIsNumber(t, identity)(15), 16);
    eq(ifIsNumber(t, identity)('hello'), 'hello');

    var fn = R.ifElse(R.gt, R.subtract, R.add);
    eq(fn(2)(7), 9);
    eq(fn(2, 7), 9);
    eq(fn(7)(2), 5);
    eq(fn(7, 2), 5);
  });

});
