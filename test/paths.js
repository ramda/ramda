var assert = require('assert');

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
    assert.throws(function() {
      R.paths([['a', 'b', 'd'], ['p', 'q']], obj);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });
  });

  it('takes a paths that contains indices into arrays', function() {
    eq(R.paths([['p', 0, 'q'], ['x', 'z', 0, 0]], obj), [3, {}]);
  });

  it('takes a path that contains negative indices into arrays', function() {
    eq(R.paths([['p', -2, 'q'], ['p', -1]], obj), [3, 'Hi']);
  });

  it("gets a deep property's value from objects", function() {
    eq(R.paths([['a', 'b']], obj), [obj.a.b]);
    eq(R.paths([['p', 0]], obj), [obj.p[0]]);
  });

  it('throws an error for items not found in an object', function() {
    assert.throws(function() {
      R.paths([['a', 'x', 'y']], obj);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });

    assert.throws(function() {
      R.paths([['p', 0, 'q'], ['x', 'z', 2, 1]], obj);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });

    assert.throws(function() {
      R.paths([['p', -4, 'q'], ['x', 'z', -1, 0]], obj);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });
  });

  it('does not index into strings values', function() {
    assert.throws(function() {
      R.paths([['x', 'y', 1]], obj);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });
  });

  it('raises an error for items not found in a list', function() {
    assert.throws(function() {
      eq(R.paths([['p', 2]], obj), [undefined]);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Specified path not in object');
    });
  });

});
