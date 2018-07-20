var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('mergeLeft', function() {
  it('takes two objects, merges their own properties and returns a new object', function() {
    var a = {w: 1, x: 2};
    var b = {y: 3, z: 4};
    eq(R.mergeLeft(a, b), {w: 1, x: 2, y: 3, z: 4});
  });

  it('overrides properties in the second object with properties in the first object', function() {
    var a = {w: 1, x: 2};
    var b = {w: 100, y: 3, z: 4};
    eq(R.mergeLeft(a, b), {w: 1, x: 2, y: 3, z: 4});
  });

  it('is not destructive', function() {
    var a = {w: 1, x: 2};
    var res = R.mergeLeft(a, {x: 3, y: 4});
    assert.notStrictEqual(a, res);
    eq(res, {w: 1, x: 2, y: 4});
  });

  it('reports only own properties', function() {
    var a = {w: 1, x: 2};
    function Cla() {}
    Cla.prototype.x = 5;
    eq(R.mergeLeft(new Cla(), a), {w: 1, x: 2});
    eq(R.mergeLeft(a, new Cla()), {w: 1, x: 2});
  });

  it('is shallow', function() {
    var a = { x: { u: 1, v: 2 }, y: 0 };
    var b = { x: { u: 3, w: 4 }, z: 0 };
    var res = R.mergeLeft(a, b);
    assert.strictEqual(a.x, res.x);
    eq(res, { x: { u: 1, v: 2 }, y: 0, z: 0 });
  });

});
