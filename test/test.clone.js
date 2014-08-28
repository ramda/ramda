var assert = require('assert');
var R = require('..');

describe('clone', function() {
    it('returns a copy of an array', function() {
      var input = [1, 2, 3, 4, 5];
      var output = R.clone(input);
      assert.deepEqual(output, input);
      assert.notStrictEqual(output, input);
    });

    it('copies objects in the array by reference', function() {
      var o1 = {x: 1};
      var o2 = {x: 2};
      var o3 = {x: 3};
      var c = R.clone([o1, o2, o3]);
      assert.equal(c[0], o1);
    });
});
