var assert = require('assert');

var R = require('..');


describe('lastIndexOf', function() {
  it("returns a number indicating an object's last position in a list", function() {
    var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
    assert.strictEqual(R.lastIndexOf(30, list), 7);
  });
  it('returns -1 if the object is not in the list', function() {
    var list = [0, 10, 20, 30];
    assert.strictEqual(R.lastIndexOf(40, list), -1);
  });

  var input = [1, 2, 3, 4, 5, 1];
  it('returns the last index of the first item', function() {
    assert.strictEqual(R.lastIndexOf(1, input), 5);
  });
  it('returns the index of the last item', function() {
    assert.strictEqual(R.lastIndexOf(5, input), 4);
  });

  var list = ['a', 1, 'a'];
  list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('finds a', function() {
    assert.strictEqual(R.lastIndexOf('a', list), 2);
  });
  it('does not find c', function() {
    assert.strictEqual(R.lastIndexOf('c', list), -1);
  });
  it('does not consider "1" equal to 1', function() {
    assert.strictEqual(R.lastIndexOf('1', list), -1);
  });
  it('returns -1 for an empty array', function() {
    assert.strictEqual(R.lastIndexOf('x', 2, []), -1);
    assert.strictEqual(R.lastIndexOf('x', -5, []), -1);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.lastIndexOf(0, [-0]), -1);
    assert.strictEqual(R.lastIndexOf(-0, [0]), -1);
    assert.strictEqual(R.lastIndexOf(NaN, [NaN]), 0);
    assert.strictEqual(R.lastIndexOf(new Just([42]), [new Just([42])]), 0);
  });

  it('dispatches to `lastIndexOf` method', function() {
    function Empty() {}
    Empty.prototype.lastIndexOf = R.always(-1);

    function List(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    List.prototype.lastIndexOf = function(x) {
      var idx = this.tail.lastIndexOf(x);
      return idx >= 0 ? 1 + idx : this.head === x ? 0 : -1;
    };

    var list = new List('b',
               new List('a',
               new List('n',
               new List('a',
               new List('n',
               new List('a',
               new Empty()))))));

    assert.strictEqual(R.lastIndexOf('a', 'banana'), 5);
    assert.strictEqual(R.lastIndexOf('x', 'banana'), -1);
    assert.strictEqual(R.lastIndexOf('a', list), 5);
    assert.strictEqual(R.lastIndexOf('x', list), -1);
  });

  it('is curried', function() {
    var curried = R.lastIndexOf('a');
    assert.strictEqual(curried(list), 2);
  });
});
