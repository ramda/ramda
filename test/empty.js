var R = require('../source');
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

  it('returns empty typed array of equivalent type given typed array', function() {
    eq(R.empty(Uint8Array.from('123')), Uint8Array.from(''));
    eq(R.empty(Uint8Array.from('123')).constructor.name, 'Uint8Array');
    eq(R.empty(new Float32Array([1, 2, 3])), new Float32Array([]));
    eq(R.empty(new Float32Array([1, 2, 3])).constructor.name, 'Float32Array');
  });

  it('returns empty object given object', function() {
    eq(R.empty({x: 1, y: 2}), {});
  });

  it('returns empty string given string', function() {
    eq(R.empty('abc'), '');
    eq(R.empty(new String('abc')), '');
  });

  it('returns empty arguments object given arguments object', function() {
    var x = (function() { return arguments; }(1, 2, 3));
    eq(R.empty(x), (function() { return arguments; }()));
  });

});
