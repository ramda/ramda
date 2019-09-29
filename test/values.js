var R = require('../source');
var eq = require('./shared/eq');


describe('values', function() {
  var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
  function C() { this.a = 100; this.b = 200; }
  C.prototype.x = function() { return 'x'; };
  C.prototype.y = 'y';
  var cobj = new C();

  it("returns an array of the given object's values", function() {
    var vs = R.values(obj).sort();
    var ts = [[1, 2, 3], 100, 'D', {x: 200, y: 300}, null, undefined];
    eq(vs.length, ts.length);
    eq(vs[0], ts[0]);
    eq(vs[1], ts[1]);
    eq(vs[2], ts[2]);
    eq(vs[3], ts[3]);
    eq(vs[4], ts[4]);
    eq(vs[5], ts[5]);

    eq(R.values({
      hasOwnProperty: false
    }), [false]);
  });

  it("does not include the given object's prototype properties", function() {
    eq(R.values(cobj), [100, 200]);
  });

  it('returns an empty object for primitives', function() {
    eq(R.values(null), []);
    eq(R.values(undefined), []);
    eq(R.values(55), []);
    eq(R.values('foo'), []);
    eq(R.values(true), []);
    eq(R.values(false), []);
    eq(R.values(NaN), []);
    eq(R.values(Infinity), []);
    eq(R.values([]), []);
  });

});
