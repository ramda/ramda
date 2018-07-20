var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('mergeDeepWith', function() {
  function last(x, y) { return y; }

  it('takes two objects, recursively merges their own properties and returns a new object', function() {
    var a = { w: 1, x: 2, y: { z: 3 }};
    var b = { a: 4, b: 5, c: { d: 6 }};
    eq(R.mergeDeepWith(last, a, b), { w: 1, x: 2, y: { z: 3 }, a: 4, b: 5, c: { d: 6 }});
  });

  it('applies the provided function to the value from the first object and the' +
    ' value from the second object to determine the value for keys that exist in' +
    ' both objects', function() {
    var a = { a: { b: 'B1', c: 'C' }, y: 'Y' };
    var b = { a: { b: 'B2', d: 'D' }, z: 'Z' };
    var c = R.mergeDeepWith(function(a, b) { return a + b; }, a, b);
    eq(c, { a: { b: 'B1B2', c: 'C', d: 'D' }, y: 'Y', z: 'Z' });
  });

  it('is not destructive', function() {
    var a = { w: 1, x: { y: 2 }};
    var res = R.mergeDeepWith(last, a, { x: { y: 3 }});
    assert.notStrictEqual(a, res);
    assert.notStrictEqual(a.x, res.x);
    eq(res, { w: 1, x: { y: 3 }});
  });

  it('reports only own properties', function() {
    var a = { w: 1, x: { y: 2 }};
    function Cla() {}
    Cla.prototype.y = 5;
    eq(R.mergeDeepWith(last, { x: new Cla() }, a), { w: 1, x: { y: 2 }});
    eq(R.mergeDeepWith(last, a, { x: new Cla() }), { w: 1, x: { y: 2 }});
  });

});
