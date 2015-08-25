var assert = require('assert');

var R = require('..');


describe('unnest', function() {

  it('only flattens one layer deep of a nested list', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    assert.deepEqual(R.unnest(nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
    nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
    assert.deepEqual(R.unnest(nest), [[[3]], 2, 1, 0, [-1, -2], -3]);
    assert.deepEqual(R.unnest([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('is not destructive', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    assert.notStrictEqual(R.unnest(nest), nest);
  });

  it('handles array-like objects', function() {
    var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
    assert.deepEqual(R.unnest(o), [1, 2, [3], 'a', 'b', 'c', ['d', 'e']]);
  });

  it('flattens an array of empty arrays', function() {
    assert.deepEqual(R.unnest([[], [], []]), []);
    assert.deepEqual(R.unnest([]), []);
  });

  it('is equivalent to R.chain(R.identity)', function() {
    function _Nothing() {}
    _Nothing.prototype.chain = function() { return this; };
    _Nothing.prototype.toString = function() { return 'Nothing()'; };

    function _Just(x) { this.value = x; }
    _Just.prototype.chain = function(f) { return f(this.value); };
    _Just.prototype.toString = function() { return 'Just(' + R.toString(this.value) + ')'; };

    var Nothing = function() { return new _Nothing(); };
    var Just = function(x) { return new _Just(x); };

    assert.strictEqual(R.toString(R.unnest(Nothing())), 'Nothing()');
    assert.strictEqual(R.toString(R.unnest(Just(Nothing()))), 'Nothing()');
    assert.strictEqual(R.toString(R.unnest(Just(Just(Nothing())))), 'Just(Nothing())');
    assert.strictEqual(R.toString(R.unnest(Just(Just(42)))), 'Just(42)');
    assert.strictEqual(R.toString(R.unnest(Just(Just(Just(42))))), 'Just(Just(42))');
  });

});
