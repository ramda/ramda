var R = require('../source');
var eq = require('./shared/eq');


describe('keys', function() {
  var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
  function C() { this.a = 100; this.b = 200; }
  C.prototype.x = function() { return 'x'; };
  C.prototype.y = 'y';
  var cobj = new C();

  it("returns an array of the given object's own keys", function() {
    eq(R.keys(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('works with hasOwnProperty override', function() {
    eq(R.keys({
      hasOwnProperty: false
    }), ['hasOwnProperty']);
  });

  it('works for primitives', function() {
    eq(R.keys(null), []);
    eq(R.keys(undefined), []);
    eq(R.keys(55), []);
    eq(R.keys('foo'), []);
    eq(R.keys(true), []);
    eq(R.keys(false), []);
    eq(R.keys(NaN), []);
    eq(R.keys(Infinity), []);
    eq(R.keys([]), []);
  });

  it("does not include the given object's prototype properties", function() {
    eq(R.keys(cobj).sort(), ['a', 'b']);
  });

});
