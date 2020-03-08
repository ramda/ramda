var R = require('../source');
var eq = require('./shared/eq');

describe('paths', function() {
  var obj = {
    a: {
      b: {
        c: 1,
        d: 2
      }
    },
    p: [{q: 3}, 'Hi'],
    x: {
      y: 'Alice',
      z: [[{}]]
    }
  };
  it('takes paths and returns values at those paths', function() {
    eq(R.paths([['a', 'b', 'c'], ['x', 'y']], obj), [1, 'Alice']);
    eq(R.paths([['a', 'b', 'd'], ['p', 'q']], obj), [2, undefined]);
  });

  it('takes a paths that contains indices into arrays', function() {
    eq(R.paths([['p', 0, 'q'], ['x', 'z', 0, 0]], obj), [3, {}]);
    eq(R.paths([['p', 0, 'q'], ['x', 'z', 2, 1]], obj), [3, undefined]);
  });

  it('takes a path that contains negative indices into arrays', function() {
    eq(R.paths([['p', -2, 'q'], ['p', -1]], obj), [3, 'Hi']);
    eq(R.paths([['p', -4, 'q'], ['x', 'z', -1, 0]], obj), [undefined, {}]);
  });

  it("gets a deep property's value from objects", function() {
    eq(R.paths([['a', 'b']], obj), [obj.a.b]);
    eq(R.paths([['p', 0]], obj), [obj.p[0]]);
  });

  it('returns undefined for items not found', function() {
    eq(R.paths([['a', 'x', 'y']], obj), [undefined]);
    eq(R.paths([['p', 2]], obj), [undefined]);
  });

});
