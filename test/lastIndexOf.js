var R = require('../source');
var eq = require('./shared/eq');


describe('lastIndexOf', function() {
  it("returns a number indicating an object's last position in a list", function() {
    var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
    eq(R.lastIndexOf(30, list), 7);
  });
  it('returns -1 if the object is not in the list', function() {
    var list = [0, 10, 20, 30];
    eq(R.lastIndexOf(40, list), -1);
  });

  var input = [1, 2, 3, 4, 5, 1];
  it('returns the last index of the first item', function() {
    eq(R.lastIndexOf(1, input), 5);
  });
  it('returns the index of the last item', function() {
    eq(R.lastIndexOf(5, input), 4);
  });

  var list = ['a', 1, 'a'];
  list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('finds a', function() {
    eq(R.lastIndexOf('a', list), 2);
  });
  it('does not find c', function() {
    eq(R.lastIndexOf('c', list), -1);
  });
  it('does not consider "1" equal to 1', function() {
    eq(R.lastIndexOf('1', list), -1);
  });
  it('returns -1 for an empty array', function() {
    eq(R.lastIndexOf('x', []), -1);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.lastIndexOf(0, [-0]), -1);
    eq(R.lastIndexOf(-0, [0]), -1);
    eq(R.lastIndexOf(NaN, [NaN]), 0);
    eq(R.lastIndexOf(new Just([42]), [new Just([42])]), 0);
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
                new Empty()
              )
            )
          )
        )
      )
    );

    eq(R.lastIndexOf('a', 'banana'), 5);
    eq(R.lastIndexOf('x', 'banana'), -1);
    eq(R.lastIndexOf('a', list), 5);
    eq(R.lastIndexOf('x', list), -1);
  });

  it('finds function, compared by identity', function() {
    var f = function() {};
    var g = function() {};
    var list = [g, f, g, f];
    eq(R.lastIndexOf(f, list), 3);
  });

  it('does not find function, compared by identity', function() {
    var f = function() {};
    var g = function() {};
    var h = function() {};
    var list = [g, f];
    eq(R.lastIndexOf(h, list), -1);
  });

});
