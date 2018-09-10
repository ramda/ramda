var R = require('../source');
var eq = require('./shared/eq');


describe('toPairsIn', function() {
  it('converts an object into an array of two-element [key, value] arrays', function() {
    eq(R.toPairsIn({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
  });

  it("iterates properties on the object's prototype chain", function() {
    function sortPairs(a, b) {
      return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
    }
    var F = function() {
      this.x = 1;
      this.y = 2;
    };
    F.prototype.protoProp = 'you can see me';
    var f = new F();
    eq(R.toPairsIn(f).sort(sortPairs), [['protoProp', 'you can see me'], ['x', 1], ['y', 2]]);
  });

});
