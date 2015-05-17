var assert = require('assert');

var R = require('..');


describe('contains', function() {
  it('returns true if an element is in a list', function() {
    assert.strictEqual(R.contains(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
  });

  it('returns false if an element is not in a list', function() {
    assert.strictEqual(R.contains(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
  });

  it('returns false for the empty list', function() {
    assert.strictEqual(R.contains(1, []), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.contains(0, [-0]), false);
    assert.strictEqual(R.contains(-0, [0]), false);
    assert.strictEqual(R.contains(NaN, [NaN]), true);
    assert.strictEqual(R.contains(new Just([42]), [new Just([42])]), true);
  });

  it('dispatches to `contains` method', function() {
    function Empty() {}
    Empty.prototype.contains = R.always(false);

    function List(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    List.prototype.contains = function(x) {
      return this.head === x || this.tail.contains(x);
    };

    var list = new List('foo', new List('bar', new List('baz', new Empty())));

    assert.strictEqual(R.contains('foo', list), true);
    assert.strictEqual(R.contains('bar', list), true);
    assert.strictEqual(R.contains('baz', list), true);
    assert.strictEqual(R.contains('quux', list), false);
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

    assert.strictEqual(R.contains('a', list), true);
    assert.strictEqual(R.contains('b', list), true);
    assert.strictEqual(R.contains('c', list), false);
    assert.strictEqual(R.contains('a', 'banana'), true);
    assert.strictEqual(R.contains('b', 'banana'), true);
    assert.strictEqual(R.contains('c', 'banana'), false);
    assert.strictEqual(R.contains('nana', 'banana'), true);
  });

  it('does not dispatch to `indexOf` if `contains` is defined', function() {
    function Empty() {}
    Empty.prototype.contains = R.always(false);
    Empty.prototype.indexOf = R.always(42);

    assert.strictEqual(R.contains('foo', new Empty()), false);
  });

  it('is curried', function() {
    assert.strictEqual(typeof R.contains(7), 'function');
    assert.strictEqual(R.contains(7)([1, 2, 3]), false);
    assert.strictEqual(R.contains(7)([1, 2, 7, 3]), true);
  });

  it('is curried like a binary operator, that accepts an inital placeholder', function() {
    var isDigit = R.contains(R.__, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    assert.strictEqual(typeof isDigit, 'function');
    assert.strictEqual(isDigit('0'), true);
    assert.strictEqual(isDigit('1'), true);
    assert.strictEqual(isDigit('x'), false);
  });
});
