var assert = require('assert');

var R = require('..');


describe('where', function() {

  it('returns true if the test object satisfies the spec', function() {
    var spec = {x: R.equals(1), y: R.equals(2)};
    var test1 = {x: 0, y: 200};
    var test2 = {x: 0, y: 10};
    var test3 = {x: 1, y: 101};
    var test4 = {x: 1, y: 2};
    assert.strictEqual(R.where(spec, test1), false);
    assert.strictEqual(R.where(spec, test2), false);
    assert.strictEqual(R.where(spec, test3), false);
    assert.strictEqual(R.where(spec, test4), true);
  });

  it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
    var spec = {x: R.equals(100)};
    var test1 = {x: 20, y: 100, z: 100};
    var test2 = {w: 1, x: 100, y: 100, z: 100};

    assert.strictEqual(R.where(spec, test1), false);
    assert.strictEqual(R.where(spec, test2), true);
  });

  it('matches specs that have undefined properties', function() {
    var spec = {x: R.equals(undefined)};
    var test1 = {};
    var test2 = {x: null};
    var test3 = {x: undefined};
    var test4 = {x: 1};
    assert.strictEqual(R.where(spec, test1), true);
    assert.strictEqual(R.where(spec, test2), false);
    assert.strictEqual(R.where(spec, test3), true);
    assert.strictEqual(R.where(spec, test4), false);
  });

  it('is curried', function() {
    var predicate = R.where({x: R.equals(1), y: R.equals(2)});
    assert.strictEqual(predicate({x: 1, y: 2, z: 3}), true);
    assert.strictEqual(predicate({x: 3, y: 2, z: 1}), false);
  });

  it('is true for an empty spec', function() {
    assert.strictEqual(R.where({}, {a: 1}), true);
    assert.strictEqual(R.where(null, {a: 1}), true);
  });

  it('matches inherited properties', function() {
    var spec = {
      toString: R.equals(Object.prototype.toString),
      valueOf: R.equals(Object.prototype.valueOf)
    };
    assert.strictEqual(R.where(spec, {}), true);
  });

  it('does not match inherited spec', function() {
    function Spec() { this.y = R.equals(6); }
    Spec.prototype.x = R.equals(5);
    var spec = new Spec();

    assert.strictEqual(R.where(spec, {y: 6}), true);
    assert.strictEqual(R.where(spec, {x: 5}), false);
  });

});
