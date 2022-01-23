var R = require('../../source/index.js');


function Pair(left, right) {
  return {
    '@@type': 'ramda/Pair',
    'fantasy-land/equals': function equals(pair) {
      return pair != null
        && pair['@@type'] === this['@@type']
        && R.equals(left, pair.left)
        && R.equals(right, pair.right);
    },
    'fantasy-land/concat': function concat(pair) {
      return Pair(R.concat(left, pair.left), R.concat(right, pair.right));
    },
    'fantasy-land/map': function map(f) { return Pair(left, f(right)); },
    'fantasy-land/ap': function ap(pair) {
      return Pair(R.concat(left, pair.left), right(pair.right));
    },
    'fantasy-land/reduce': function reduce(f, x) { return f(x, right); },
    'fantasy-land/traverse': function traverse(of, f) {
      return R.map(
        function(x) { return Pair(left, x); },
        of(f(right))
      );
    },
    'fantasy-land/chain': function chain(f) {
      var pair = f(right);
      return Pair(R.concat(left, pair.left), pair.right);
    },
    'fantasy-land/bimap': function bimap(f, g) { return Pair(f(left), g(right)); },
    'fantasy-land/promap': function promap(f, g) {
      return Pair(R.promap(f, g, left), R.promap(f, g, right));
    },
    merge: function merge(f) { return f(left, right); },
    toString: function toString() {
      return `Pair(${R.toString(left)}, ${R.toString(right)})`;
    },
    toArray: function toArray() { return [left, right]; },
    left: left,
    right: right
  };
}

module.exports = Pair;
