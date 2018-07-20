var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('mergeWithKey', function() {
  function last(k, x, y) { return y; }

  it('takes two objects, merges their own properties and returns a new object', function() {
    var a = {w: 1, x: 2};
    var b = {y: 3, z: 4};
    eq(R.mergeWithKey(last, a, b), {w: 1, x: 2, y: 3, z: 4});
  });

  it('applies the provided function to the key, the value from the first object' +
    ' and the value from the second object to determine the value for keys that' +
    ' exist in both objects', function() {
    var a = {a: 'b', x: 'd'};
    var b = {a: 'c', y: 'e'};
    var c = R.mergeWithKey(function(k, a, b) { return k + a + b; }, a, b);
    eq(c, {a: 'abc', x: 'd', y: 'e'});
  });

  it('is not destructive', function() {
    var a = {w: 1, x: 2};
    var res = R.mergeWithKey(last, a, {x: 5});
    assert.notStrictEqual(a, res);
    eq(res, {w: 1, x: 5});
  });

  it('reports only own properties', function() {
    var a = {w: 1, x: 2};
    function Cla() {}
    Cla.prototype.x = 5;
    eq(R.mergeWithKey(last, new Cla(), a), {w: 1, x: 2});
    eq(R.mergeWithKey(last, a, new Cla()), {w: 1, x: 2});
  });

});
