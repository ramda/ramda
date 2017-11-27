var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('drive', function() {

  it('is not a variadic function', function() {
    eq(typeof R.drive, 'function');
    eq(R.drive.length, 2);
  });

  it('is a curried function', function() {
    var x = 2
    var g = R.drive(R.__, [R.add(3)])
    eq(g(x), 5);
  });

  it('apply ', function() {
    eq(R.drive(2, [R.add(3), R.multiply(3)]), 15)
  })

});
