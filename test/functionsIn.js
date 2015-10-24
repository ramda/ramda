var R = require('..');
var eq = require('./shared/eq');


describe('functionsIn', function() {

  function F() {
    this.sort = function() {};
    this.map = function() {};
    this.obj = {};
    this.num = 4;
  }

  F.prototype.x = function() {};
  F.prototype.y = function() {};
  F.prototype.z = {};

  var f = new F();

  it('returns list of functions with prototype functions', function() {
    eq(R.functionsIn(f), ['map', 'sort', 'x', 'y']);
    eq(R.functionsIn(f).length, 4);
  });

  it('sorts all the function names', function() {
    var X = function() {
      this.s = function() {};
      this.o = function() {};
    };
    X.prototype.r = function() {};
    X.prototype.t = function() {};
    eq(R.functionsIn(new X()), ['o', 'r', 's', 't']);
  });

  it('returns an empty array if there are no functions on the object or its prototype chain', function() {
    function G() {}
    eq(R.functionsIn(new G()), []);
  });
});
