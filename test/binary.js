var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('binary', function() {
  it('turns multiple-argument function into binary one', function() {
    R.binary(function(x, y, z) {
      eq(arguments.length, 2);
      eq(typeof z, 'undefined');
    })(10, 20, 30);
  });

  it('initial arguments are passed through normally', function() {
    R.binary(function(x, y, z) {
      eq(x, 10);
      eq(y, 20);
      void z;
    })(10, 20, 30);
  });

});
