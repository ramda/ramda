var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('whereEq', function() {

  it('returns true if the test object satisfies the spec', function() {
    var spec = {x: 1, y: 2};
    var test1 = {x: 0, y: 200};
    var test2 = {x: 0, y: 10};
    var test3 = {x: 1, y: 101};
    var test4 = {x: 1, y: 2};
    eq(R.whereEq(spec, test1), false);
    eq(R.whereEq(spec, test2), false);
    eq(R.whereEq(spec, test3), false);
    eq(R.whereEq(spec, test4), true);
  });

  it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
    var spec = {x: 100};
    var test1 = {x: 20, y: 100, z: 100};
    var test2 = {w: 1, x: 100, y: 100, z: 100};

    eq(R.whereEq(spec, test1), false);
    eq(R.whereEq(spec, test2), true);
  });

  it('matches specs that have undefined properties', function() {
    var spec = {x: undefined};
    var test1 = {};
    var test2 = {x: null};
    var test3 = {x: undefined};
    var test4 = {x: 1};
    eq(R.whereEq(spec, test1), true);
    eq(R.whereEq(spec, test2), false);
    eq(R.whereEq(spec, test3), true);
    eq(R.whereEq(spec, test4), false);
  });

  it('is true for an empty spec', function() {
    eq(R.whereEq({}, {a: 1}), true);
  });

  it('reports true when the object equals the spec', function() {
    eq(R.whereEq(R, R), true);
  });

  it('compares an own map method as a value without calling it', function() {
    var calls = 0;
    var map = function() { calls += 1; return {}; };
    var spec = {map: map, status: 'ready'};
    eq(R.whereEq(spec, {map: map, status: 'ready'}), true);
    eq(R.whereEq(spec, {map: map, status: 'failed'}), false);
    eq(R.whereEq(spec, {}), false);
    eq(R.whereEq(spec, {map: R.identity, status: 'ready'}), false);
    eq(calls, 0);
  });

  it('compares an own fantasy-land/map method as a value', function() {
    var calls = 0;
    var map = function() { calls += 1; return {}; };
    var spec = {'fantasy-land/map': map, status: 'ready'};
    eq(R.whereEq(spec, {'fantasy-land/map': map, status: 'ready'}), true);
    eq(R.whereEq(spec, {'fantasy-land/map': map, status: 'failed'}), false);
    eq(R.whereEq(spec, {'fantasy-land/map': R.identity, status: 'ready'}), false);
    eq(calls, 0);
  });

  it('does not dispatch to inherited mapping methods', function() {
    ['map', 'fantasy-land/map'].forEach(function(key) {
      var calls = 0;
      var prototype = {};
      prototype[key] = function() { calls += 1; return {}; };
      var spec = Object.create(prototype);
      spec.status = 'ready';
      eq(R.whereEq(spec, {status: 'ready'}), true);
      eq(R.whereEq(spec, {status: 'failed'}), false);
      eq(calls, 0);
    });
  });

  it('rejects missing properties from a namespace spec', function() {
    eq(R.whereEq(R, {}), false);
  });

  it('preserves array specs, currying and placeholders', function() {
    eq(R.whereEq([1, 2], [1, 2]), true);
    eq(R.whereEq([1, 2], [1, 3]), false);
    eq(R.whereEq({x: 1})({x: 1}), true);
    eq(R.whereEq(R.__, {x: 1})({x: 1}), true);
    eq(R.whereEq(R.__, {x: 2})({x: 1}), false);
  });

  function Parent() {
    this.y = 6;
  }
  Parent.prototype.a = undefined;
  Parent.prototype.x = 5;
  var parent = new Parent();

  it('matches inherited props', function() {
    eq(R.whereEq({y: 6}, parent), true);
    eq(R.whereEq({x: 5}, parent), true);
    eq(R.whereEq({x: 5, y: 6}, parent), true);
    eq(R.whereEq({x: 4, y: 6}, parent), false);
  });

  it('does not match inherited spec', function() {
    eq(R.whereEq(parent, {y: 6}), true);
    eq(R.whereEq(parent, {x: 5}), false);
  });

});
