var R = require('..');
var eq = require('./shared/eq');


describe('empty', function() {

  it('dispatches to `empty` method', function() {
    function Nothing() {}
    Nothing.prototype.empty = function() { return new Nothing(); };

    function Just(x) { this.value = x; }
    Just.prototype.empty = function() { return new Nothing(); };

    eq(R.empty(new Nothing()).constructor, Nothing);
    eq(R.empty(new Just(123)).constructor, Nothing);
  });

  it('dispatches to `empty` function on constructor', function() {
    function Nothing() {}
    Nothing.empty = function() { return new Nothing(); };

    function Just(x) { this.value = x; }
    Just.empty = function() { return new Nothing(); };

    eq(R.empty(new Nothing()).constructor, Nothing);
    eq(R.empty(new Just(123)).constructor, Nothing);
  });

  it('returns empty array given array', function() {
    eq(R.empty([1, 2, 3]), []);
  });

  it('returns empty object given object', function() {
    eq(R.empty({x: 1, y: 2}), {});
  });

  it('returns empty string given string', function() {
    eq(R.empty('abc'), '');
    /* jshint -W053 */
    eq(R.empty(new String('abc')), '');
    /* jshint +W053 */
  });

  it('returns empty arguments object given arguments object', function() {
    var x = (function() { return arguments; }(1, 2, 3));
    eq(R.empty(x), (function() { return arguments; }()));
  });

});
