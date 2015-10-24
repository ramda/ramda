var R = require('..');
var eq = require('./shared/eq');


describe('keysIn', function() {
  var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
  function C() { this.a = 100; this.b = 200; }
  C.prototype.x = function() { return 'x'; };
  C.prototype.y = 'y';
  var cobj = new C();

  it("returns an array of the given object's keys", function() {
    eq(R.keysIn(obj), ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it("includes the given object's prototype properties", function() {
    eq(R.keysIn(cobj), ['a', 'b', 'x', 'y']);
  });

  it('sorts all the property names', function() {
    function X() { this.x = 100; this.a = 200; }
    X.prototype.y = function() { return 'y'; };
    X.prototype.b = 'b';
    eq(R.keysIn(new X()), ['a', 'b', 'x', 'y']);
  });

  it('works for primitives', function() {
    /* jshint elision: true */
    var result = R.map(function(val) {
      return R.keys(val);
    }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
    eq(result, R.repeat([], 10));
  });
});
