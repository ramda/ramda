var assert = require('assert');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commute', function() {
  it('"pivots" a list (list of functors => functor of a list)', function() {
    assert.deepEqual(R.commute(R.of, as), [[1, 3], [1, 4]]);
    assert.deepEqual(R.commute(R.of, bs), [[1, 3], [2, 3]]);
    assert.deepEqual(R.commute(R.of, cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);
  });

  it('works on Algebraic Data Types such as "Maybe"', function() {
    function Nothing() {
      if (!(this instanceof Nothing)) {
        return new Nothing();
      }
    }
    Nothing.prototype.ap = function() {
      return this;
    };
    Nothing.prototype.map = function() {
      return this;
    };
    Nothing.prototype.toString = function() {
      return 'Nothing()';
    };

    function Just(x) {
      if (!(this instanceof Just)) {
        return new Just(x);
      }
      this.value = x;
    }
    Just.prototype.ap = function(x) {
      return Just(this.value(x.value));
    };
    Just.prototype.map = function(f) {
      return Just(f(this.value));
    };
    Just.prototype.toString = function() {
      return 'Just(' + R.toString(this.value) + ')';
    };

    assert.strictEqual(R.toString(R.commute(Just, [Just(3), Just(4), Just(5)])), 'Just([3, 4, 5])');
    assert.strictEqual(R.toString(R.commute(Just, [Just(3), Just(4), Nothing()])), 'Nothing()');
  });

  it('is curried', function() {
    var cmtArr = R.commute(R.of);
    assert.strictEqual(typeof cmtArr, 'function');
    assert.deepEqual(cmtArr(as), [[1, 3], [1, 4]]);
    assert.deepEqual(cmtArr(bs), [[1, 3], [2, 3]]);
    assert.deepEqual(cmtArr(cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);

  });
});
