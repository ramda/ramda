var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('modifyPath', function() {
  it('creates a new object by applying the `transformation` function to the given `properties` of the `object`', function() {
    var object   = {a: 'Tomato', b: { c: { d: [100, 101, 102] } }, e: { f: 'g', h: [1, 2, 3]  }};
    var expected = {a: 'Tomato', b: { c: { d: [100, 102, 102] } }, e: { f: 'g', h: [1, 2, 3] }};
    var created  = R.modifyPath(['b', 'c', 'd', 1], R.add(1), object);
    eq(created, expected);
    // Note: reference equality below!
    assert.strictEqual(object.a, created.a);
    assert.strictEqual(object.e, created.e);
    assert.strictEqual(object.e.h, created.e.h);
  });

  it('returns the original object if object does not contain the key', function() {
    var object  = {a: 'Tomato', b: { c: { d: [100, 101, 102] } }, e: { f: 'g', h: [1, 2, 3]  }};
    var created = R.modifyPath(['b', 'nonexistent', 'd', 1], R.add(1), object);
    eq(created, object);
    // Note: reference equality below!
    assert.strictEqual(object, created);
  });

  it('is not destructive', function() {
    var object   = {a: 'Tomato', b: { c: { d: [100, 101, 102] } }, e: { f: 'g', h: [1, 2, 3]  }};
    var expected = {a: 'Tomato', b: { c: { d: [100, 101, 102] } }, e: { f: 'g', h: [1, 2, 3]  }};
    R.modifyPath(['b', 'c', 'd', 1], R.add(1), object);
    eq(object, expected);
  });

  it('throws error for non-function transformations', function() {
    var object   = {a: 'Tomato', b: { c: { d: [100, 101, 102] } }, e: { f: 'g', h: [1, 2, 3]  }};
    assert.throws(
      function() { R.modifyPath(['b', 'c', 'd', 1], 2, object) ;},
      function(err) {
        return err.constructor === TypeError &&
               err.message === 'fn is not a function';
      }
    );
  });

});
