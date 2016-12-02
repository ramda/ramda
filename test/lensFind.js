var R = require('..');
var eq = require('./shared/eq');


describe('lensFind', function() {
  var list1 = ['a', 'b', 'c'];
  var obj1 = {a: 1};
  var obj2 = {b: list1};
  var testList = [10, obj1, obj2, 100];
  var even = function(x) { return x % 2 === 0; };

  describe('view', function() {
    it('focuses the first list element found by the predicate', function() {
      eq(R.view(R.lensFind(R.propEq('a', 1)), testList), obj1);
      eq(R.view(R.lensFind(even), testList), 10);
      eq(R.view(R.lensFind(R.lt(99)), testList), 100);
    });
    it('returns undefined if the element is not found', function() {
      eq(R.view(R.lensFind(R.equals(1000)), testList), undefined);
    });
  });

  describe('set', function() {
    it('sets the list value found by the predicate and returns a new list', function() {
      var newObj1 = {a:0};
      var newList = R.update(R.findIndex(R.propEq('a', 1), testList), newObj1, testList);

      eq(
        R.set(
          R.lensFind(R.propEq('a', 1)),
          newObj1,
          testList
        ),
        newList
      );

      eq(testList, [10, obj1, obj2, 100]);
    });

    it('when the value is not found it returns the list', function() {
      eq(R.set(R.lensFind(R.equals(1000)), 3000, testList), testList);
    });

    it('putting back what you got does not change anything', function() {
      eq(R.set(R.lensFind(R.propEq('a', 1)), obj1, testList), testList);
    });

    it('setting twice is the same as setting once', function() {
      var newObj1 = {a: 4000};
      eq(R.set(R.lensFind(R.propEq('a', 5000)), newObj1, R.set(R.lensFind(R.propEq('a', 1)), {a:5000}, testList)), [10, newObj1, obj2, 100]);
    });
  });

  describe('over', function() {
    it('applies function to the value found by the predicate', function() {
      var newObj1 = {a:6};
      eq(R.over(R.lensFind(R.propEq('a', 1)), R.always(newObj1), testList), [10, newObj1, obj2, 100]);
      eq(R.over(R.lensFind(R.equals(10)), R.add(32), testList), [42, obj1, obj2, 100]);
    });

    it('when the value is not found it returns the list', function() {
      eq(R.over(R.lensFind(R.equals(1000)), R.add(1), testList), testList);
    });

    it('putting back what you got does not change anything', function() {
      eq(R.over(R.lensFind(R.equals(obj1)), R.identity, testList), testList);
    });
  });

  describe('composability', function() {
    it('can be composed', function() {
      var nestedList = [0, testList, 1, 2];
      var composedLens = R.compose(R.lensFind(R.isArrayLike), R.lensFind(R.has('b')), R.lensProp('b'), R.lensFind(R.equals('c')));

      eq(R.view(composedLens, nestedList), 'c');
    });
  });

  describe('well behaved lens', function() {
    it('set s (get s) === s', function() {
      eq(R.set(R.lensFind(R.propEq('a', 1)), R.view(R.lensFind(R.propEq('a', 1)), testList), testList), testList);
    });
    it('get (set s v) === v', function() {
      eq(R.view(R.lensFind(R.equals(10)), R.set(R.lensFind(R.equals(10)), 10, testList)), 10);
    });
    it('get (set(set s v1) v2) === v2', function() {
      eq(R.view(R.lensFind(R.equals(300)), R.set(R.lensFind(R.equals(200)), 300, R.set(R.lensFind(R.equals(100)), 200, testList))),
         300);
    });
  });
});
