var R = require('../..');
var eq = require('./eq');

module.exports = function(testName, keys) {
  describe(testName, function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's own keys", function() {
      eq(keys(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('works with hasOwnProperty override', function() {
      eq(keys({
        /* jshint -W001 */
        hasOwnProperty: false
        /* jshint +W001 */
      }), ['hasOwnProperty']);
    });

    it('works for primitives', function() {
      /* jshint elision: true */
      var result = R.map(function(val) {
        return keys(val);
      }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
      eq(result, R.repeat([], 10));
    });

    it("does not include the given object's prototype properties", function() {
      eq(keys(cobj).sort(), ['a', 'b']);
    });

  });
};
