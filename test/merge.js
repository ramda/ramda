var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('merge', function() {
  it('takes two objects, merges their own properties and returns a new object', function() {
    var a = {w: 1, x: 2};
    var b = {y: 3, z: 4};
    eq(R.merge(a, b), {w: 1, x: 2, y: 3, z: 4});
  });

  it('overrides properties in the first object with properties in the second object', function() {
    var a = {w: 1, x: 2};
    var b = {w: 100, y: 3, z: 4};
    eq(R.merge(a, b), {w: 100, x: 2, y: 3, z: 4});
  });

  it('is not destructive', function() {
    var a = {w: 1, x: 2};
    var res = R.merge(a, {x: 5});
    assert.notStrictEqual(a, res);
    eq(res, {w: 1, x: 5});
  });

  it('reports only own properties', function() {
    var a = {w: 1, x: 2};
    function Cla() {}
    Cla.prototype.x = 5;
    eq(R.merge(new Cla(), a), {w: 1, x: 2});
    eq(R.merge(a, new Cla()), {w: 1, x: 2});
  });

});
