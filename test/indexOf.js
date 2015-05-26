var assert = require('assert');

var R = require('..');


describe('indexOf', function() {
  it("returns a number indicating an object's position in a list", function() {
    var list = [0, 10, 20, 30];
    assert.strictEqual(R.indexOf(30, list), 3);
  });
  it('returns -1 if the object is not in the list', function() {
    var list = [0, 10, 20, 30];
    assert.strictEqual(R.indexOf(40, list), -1);
  });

  var input = [1, 2, 3, 4, 5];
  it('returns the index of the first item', function() {
    assert.strictEqual(R.indexOf(1, input), 0);
  });
  it('returns the index of the last item', function() {
    assert.strictEqual(R.indexOf(5, input), 4);
  });

  var list = [1, 2, 3];
  list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('finds 1', function() {
    assert.strictEqual(R.indexOf(1, list), 0);
  });
  it('finds 1 and is result strictly it', function() {
    assert.strictEqual(R.indexOf(1, list), 0);
  });
  it('does not find 4', function() {
    assert.strictEqual(R.indexOf(4, list), -1);
  });
  it('does not consider "1" equal to 1', function() {
    assert.strictEqual(R.indexOf('1', list), -1);
  });

  it('returns -1 for an empty array', function() {
    assert.strictEqual(R.indexOf('x', []), -1);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.indexOf(0, [-0]), -1);
    assert.strictEqual(R.indexOf(-0, [0]), -1);
    assert.strictEqual(R.indexOf(NaN, [NaN]), 0);
    assert.strictEqual(R.indexOf(new Just([42]), [new Just([42])]), 0);
  });

  it('dispatches to `indexOf` method', function() {
    function Empty() {}
    Empty.prototype.indexOf = R.always(-1);

    function List(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    List.prototype.indexOf = function(x) {
      var idx = this.tail.indexOf(x);
      return this.head === x ? 0 : idx >= 0 ? 1 + idx : -1;
    };

    var list = new List('b',
               new List('a',
               new List('n',
               new List('a',
               new List('n',
               new List('a',
               new Empty()))))));

    assert.strictEqual(R.indexOf('a', 'banana'), 1);
    assert.strictEqual(R.indexOf('x', 'banana'), -1);
    assert.strictEqual(R.indexOf('a', list), 1);
    assert.strictEqual(R.indexOf('x', list), -1);
  });

  it('is curried', function() {
    var curried = R.indexOf(3);
    assert.strictEqual(curried(list), 2);
  });
});
