var R = require('..');
var eq = require('./shared/eq');


describe('values', function() {
  var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
  function C() { this.a = 100; this.b = 200; }
  C.prototype.x = function() { return 'x'; };
  C.prototype.y = 'y';
  var cobj = new C();

  it('lists the values of an object in the natural sort order of the related keys', function() {
    eq(R.values({a: 1, d: 2, c: 3, e: 4, b: 5}), [1, 5, 3, 2, 4]); // keys: [a, b, c, d, e]
  });

  it('places numeric indices first, but in lexicographic order', function() {
    eq(R.values({a: 1, 20: 2, c: 3, 9: 4, b: 5}), [2, 4, 1, 5, 3]); // keys: [20, 9, a, b, c]
  });

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
      /* jshint -W001 */
      hasOwnProperty: false
      /* jshint +W001 */
    }), [false]);
  });

  it("does not include the given object's prototype properties", function() {
    eq(R.values(cobj), [100, 200]);
  });

  it('works for primitives', function() {
    /* jshint elision: true */
    var result = R.map(function(val) {
      return R.keys(val);
    }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
    eq(result, R.repeat([], 10));
  });
});
