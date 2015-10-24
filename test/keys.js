var R = require('..');
var eq = require('./shared/eq');


describe('keys', function() {
  var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
  function C() { this.a = 100; this.b = 200; }
  C.prototype.x = function() { return 'x'; };
  C.prototype.y = 'y';
  var cobj = new C();

  it("returns an array of the given object's own keys", function() {
    eq(R.keys(obj), ['a', 'b', 'c', 'd', 'e', 'f']);
  });


  it('lists the keys in their natural sort order', function() {
    eq(R.keys({a: 1, d: 2, c: 3, e: 4, b: 5}), ['a', 'b', 'c', 'd', 'e']);
  });

  it('places numeric indices first, but in lexicographic order', function() {
    eq(R.keys({a: 1, 20: 2, c: 3, 9: 4, b: 5}), ['20', '9', 'a', 'b', 'c']);
  });

  it('works with hasOwnProperty override', function() {
    eq(R.keys({
      /* jshint -W001 */
      hasOwnProperty: false
      /* jshint +W001 */
    }), ['hasOwnProperty']);
  });

  it('works for primitives', function() {
    /* jshint elision: true */
    var result = R.map(function(val) {
      return R.keys(val);
    }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
    eq(result, R.repeat([], 10));
  });

  it("does not include the given object's prototype properties", function() {
    eq(R.keys(cobj), ['a', 'b']);
  });
});
