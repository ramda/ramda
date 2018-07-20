var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('mergeDeepLeft', function() {
  it('takes two objects, recursively merges their own properties and returns a new object', function() {
    var a = { w: 1, x: 2, y: { z: 3 }};
    var b = { a: 4, b: 5, c: { d: 6 }};
    eq(R.mergeDeepLeft(a, b), { w: 1, x: 2, y: { z: 3 }, a: 4, b: 5, c: { d: 6 }});
  });

  it('overrides properties in the second object with properties in the first object', function() {
    var a = { a: { b: 1, c: 2 }, y: 0 };
    var b = { a: { b: 3, d: 4 }, z: 0 };
    eq(R.mergeDeepLeft(a, b), { a: { b: 1, c: 2, d: 4 }, y: 0, z: 0 });
  });

  it('is not destructive', function() {
    var a = { w: 1, x: { y: 2 }};
    var res = R.mergeDeepLeft(a, { x: { y: 3 }});
    assert.notStrictEqual(a, res);
    assert.notStrictEqual(a.x, res.x);
    eq(res, { w: 1, x: { y: 2 }});
  });

  it('reports only own properties', function() {
    var a = { w: 1, x: { y: 2 }};
    function Cla() {}
    Cla.prototype.y = 5;
    eq(R.mergeDeepLeft({ x: new Cla() }, a), { w: 1, x: { y: 2 }});
    eq(R.mergeDeepLeft(a, { x: new Cla() }), { w: 1, x: { y: 2 }});
  });

});
