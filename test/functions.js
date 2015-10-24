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
    eq(R.functions(f), ['map', 'sort']);
    eq(R.functions(f).length, 2);
    eq(R.functions({add: R.add, reduce: R.reduce}), ['add', 'reduce']);
  });

  it('returns an empty array if there are no functions on the object or its prototype chain', function() {
    function G() {}
    eq(R.functions(new G()), []);
  });

  it('returns the function names sorted by their natural order', function() {
    var f = function() {};
    var obj = {first: f, second: f, third: f, fourth: f, fifth: f};
    eq(R.functions(obj), ['fifth', 'first', 'fourth', 'second', 'third']);
  });
});
