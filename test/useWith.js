var assert = require('assert');

var R = require('..');


describe('useWith', function() {
  function max() { return Math.max.apply(Math, arguments); }
  function add1(x) { return x + 1; }
  function mult2(x) { return x * 2; }
  function div3(x) { return x / 3; }
  var f = R.useWith(max, add1, mult2, div3);

  it('takes a arbitrary number of function arguments and returns a function', function() {
    assert.strictEqual(typeof R.useWith(max), 'function');
    assert.strictEqual(typeof R.useWith(max, add1), 'function');
    assert.strictEqual(typeof R.useWith(max, add1, mult2, div3), 'function');
  });

  it('passes the arguments received to their respective functions', function() {
    assert.strictEqual(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
  });

  it('passes additional arguments to the main function', function() {
    assert.strictEqual(f(7, 8, 9, 10), 16);
    assert.strictEqual(f(7, 8, 9, 20), 20);
  });

  it('nonetheless has the correct arity', function() {
    assert.strictEqual(f.length, 3);
  });

  it('maintains the `this` context of main function', function() {
    function combine(x, y) {return 'x: ' + x + ', y: ' + y + ', z: ' + this.z;}
    var f = R.useWith(combine, add1, mult2);
    assert.strictEqual(f.call({z: 15}, 5, 10), 'x: 6, y: 20, z: 15');
  });

  it('maintains the `this` context of transformer functions', function() {
    function propX(val) {return this.propX + ': ' + val;}
    function propY(val) {return this.propY + ': ' + val;}
    function combine(x, y) {return x + ', ' + y;}
    var f = R.useWith(combine, propX, propY);
    assert.strictEqual(f.call({propX: 'alpha', propY: 'beta'}, 5, 10), 'alpha: 5, beta: 10');
  });

});
