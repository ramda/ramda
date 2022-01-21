var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('mergeWith', function() {
  function last(x, y) { return y; }

  it('takes two objects, merges their own properties and returns a new object', function() {
    var a = {w: 1, x: 2};
    var b = {y: 3, z: 4};
    eq(R.mergeWith(last, a, b), {w: 1, x: 2, y: 3, z: 4});
  });

  it('applies the provided function to the value from the first object and the' +
    ' value from the second object to determine the value for keys that exist in' +
    ' both objects', function() {
    var a = {x: 'a', y: 'c'};
    var b = {x: 'b', z: 'd'};
    var c = R.mergeWith(function(a, b) { return a + b; }, a, b);
    eq(c, {x: 'ab', y: 'c', z: 'd'});
  });

  it('is not destructive', function() {
    var a = {w: 1, x: 2};
    var res = R.mergeWith(last, a, {x: 5});
    assert.notStrictEqual(a, res);
    eq(res, {w: 1, x: 5});
  });

  it('reports only own properties', function() {
    function Cla() {}
    Cla.prototype.x = 5;
    eq(R.mergeWith(last, new Cla(), {w: 1, x: 2}), {w: 1, x: 2});
    eq(R.mergeWith(last, {w: 1, x: 2}, new Cla()), {w: 1, x: 2});
    eq(R.mergeWith(last, new Cla(), {w: 1}), {w: 1});
  });

  describe('acts as if nil values are simply empty objects', function() {
    it('... if the first object is nil and the second empty', function() {
      eq(R.mergeWith(R.concat, undefined, {}), {});
    });

    it('... if the first object is empty and the second nil', function() {
      eq(R.mergeWith(R.concat, {}, null), {});
    });

    it('... if both objects are nil', function() {
      eq(R.mergeWith(R.concat, undefined, null), {});
    });

    it('... if the first object is not empty and the second is nil', function() {
      eq(R.mergeWith(R.concat, {a: 'a'}, null), {a: 'a'});
    });

    it('... if the first object is nil and the second is not empty', function() {
      eq(R.mergeWith(R.concat, undefined, {a: 'a'}), {a: 'a'});
    });
  });

});
