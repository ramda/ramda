var assert = require('assert');

var R = require('..');


describe('and', function() {
  it('compares two values with js &&', function() {
    var someAr = [];
    assert.strictEqual(R.and(1, 1), 1);
    assert.strictEqual(R.and(1, 0), 0);
    assert.strictEqual(R.and(true, someAr), someAr);
  });

  it('dispatches to `and` method', function() {
    function Nothing() {}
    Nothing.prototype.and = function() { return this; };

    function Just(x) { this.value = x; }
    Just.prototype.and = R.identity;

    var n1 = new Nothing();
    var n2 = new Nothing();
    var j1 = new Just(1);
    var j2 = new Just(2);

    assert.strictEqual(R.and(n1, n2), n1);
    assert.strictEqual(R.and(n2, n1), n2);
    assert.strictEqual(R.and(n1, j2), n1);
    assert.strictEqual(R.and(j2, n1), n1);
    assert.strictEqual(R.and(j1, j2), j2);
    assert.strictEqual(R.and(j2, j1), j1);
  });

  it('is curried', function() {
    var halfTruth = R.and(true);
    assert.strictEqual(halfTruth(false), false);
    assert.strictEqual(halfTruth('lie'), 'lie');
  });
});
