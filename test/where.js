var R = require('../source');
var eq = require('./shared/eq');


describe('where', function() {

  it('returns true if the test object satisfies the spec', function() {
    var spec = {x: R.equals(1), y: R.equals(2)};
    var test1 = {x: 0, y: 200};
    var test2 = {x: 0, y: 10};
    var test3 = {x: 1, y: 101};
    var test4 = {x: 1, y: 2};
    eq(R.where(spec, test1), false);
    eq(R.where(spec, test2), false);
    eq(R.where(spec, test3), false);
    eq(R.where(spec, test4), true);
  });

  it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
    var spec = {x: R.equals(100)};
    var test1 = {x: 20, y: 100, z: 100};
    var test2 = {w: 1, x: 100, y: 100, z: 100};

    eq(R.where(spec, test1), false);
    eq(R.where(spec, test2), true);
  });

  it('matches specs that have undefined properties', function() {
    var spec = {x: R.equals(undefined)};
    var test1 = {};
    var test2 = {x: null};
    var test3 = {x: undefined};
    var test4 = {x: 1};
    eq(R.where(spec, test1), true);
    eq(R.where(spec, test2), false);
    eq(R.where(spec, test3), true);
    eq(R.where(spec, test4), false);
  });

  it('is true for an empty spec', function() {
    eq(R.where({}, {a: 1}), true);
  });

  it('matches inherited properties', function() {
    var spec = {
      toString: R.equals(Object.prototype.toString),
      valueOf: R.equals(Object.prototype.valueOf)
    };
    eq(R.where(spec, {}), true);
  });

  it('does not match inherited spec', function() {
    function Spec() { this.y = R.equals(6); }
    Spec.prototype.x = R.equals(5);
    var spec = new Spec();

    eq(R.where(spec, {y: 6}), true);
    eq(R.where(spec, {x: 5}), false);
  });

});
