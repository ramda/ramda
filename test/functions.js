var R = require('..');
var eq = require('./shared/eq');


describe('functions', function() {

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

  it('returns list of functions without prototype functions', function() {
    eq(R.functions(f).sort(), ['map', 'sort']);
    eq(R.functions(f).length, 2);
    eq(R.functions({add: R.add, reduce: R.reduce}).sort(), ['add', 'reduce']);
  });

  it('returns an empty array if there are no functions on the object or its prototype chain', function() {
    function G() {}
    eq(R.functions(new G()), []);
  });
});
