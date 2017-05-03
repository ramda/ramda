var R = require('..');
var eq = require('./shared/eq');

describe('reduce', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('folds simple functions over arrays with the supplied accumulator', function() {
    eq(R.reduce(add, 0, [1, 2, 3, 4]), 10);
    eq(R.reduce(mult, 1, [1, 2, 3, 4]), 24);
  });

  it('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.reduce(add, 0, obj), 'override');
    eq(R.reduce(add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.reduce(add, 0, []), 0);
    eq(R.reduce(mult, 1, []), 1);
    eq(R.reduce(R.concat, [], []), []);
  });

  it('is curried', function() {
    var addOrConcat = R.reduce(add);
    var sum = addOrConcat(0);
    var cat = addOrConcat('');
    eq(sum([1, 2, 3, 4]), 10);
    eq(cat(['1', '2', '3', '4']), '1234');
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.reduce(add, 0);
    eq(sum.length, 1);
  });

  it('Prefers the use of the iterator of an object over reduce (and handles short-circuits)', function() {
    var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

    function Reducible(arr) {
      this.arr = arr;
    }

    Reducible.prototype.reduce = function(f, init) {
      var acc = init;
      for (var i = 0; i < this.arr.length; i += 1) {
        acc = f(acc, this.arr[i]);
      }
      return acc;
    };

    Reducible.prototype[symIterator] = function() {
      var a = this.arr;
      return {
        _pos: 0,

        next: function() {
          if (this._pos < a.length) {
            var v = a[this._pos];
            this._pos += 1;
            return {
              value: v,
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        }
      };
    };

    var xf = R.take(2);
    var apendingT = { };
    apendingT['@@transducer/result'] = R.identity;
    apendingT['@@transducer/step'] = R.flip(R.append);

    var rfn = xf(apendingT);
    var list = new Reducible([1, 2, 3, 4, 5, 6]);

    eq(R.reduce(rfn, [], list), [1, 2]);
  });
});
