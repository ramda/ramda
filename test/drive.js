var R = require('..');
var eq = require('./shared/eq');


describe('drive', function() {

  it('is not a variadic function', function() {
    eq(typeof R.drive, 'function');
    eq(R.drive.length, 2);
  });

  it('is a curried function', function() {
    var x = 2;
    var listOfFuncs = [R.add(3)];
    var f = R.drive(x);
    var g = R.drive(R.__, listOfFuncs);
    eq(f(listOfFuncs), 5);
    eq(g(x), 5);
  });

  it('pass the value through a list of functions', function() {
    var x = 2;
    var listOfFuncs = [R.add(3), R.multiply(3)];
    eq(R.drive(x, listOfFuncs), 15);
    eq(R.drive(x, listOfFuncs), R.apply(R.pipe, listOfFuncs)(x));
  });

  it('should return the first argument if the second argument is an empty list', function() {
    var x = 2;
    eq(R.drive(x, []), x);
  });

});
