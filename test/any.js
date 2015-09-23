var assert = require('assert');

var R = require('..');


describe('any', function() {
  var odd = function(n) {return n % 2 === 1;};
  var T = function() {return true;};
  var intoArray = R.into([]);

  it('returns true if any element satisfies the predicate', function() {
    assert.strictEqual(R.any(odd, [2, 4, 6, 8, 10, 11, 12]), true);
  });

  it('returns false if all elements fails to satisfy the predicate', function() {
    assert.strictEqual(R.any(odd, [2, 4, 6, 8, 10, 12]), false);
  });

  it('returns true into array if any element satisfies the predicate', function() {
    assert.deepEqual(intoArray(R.any(odd), [2, 4, 6, 8, 10, 11, 12]), [true]);
  });

  it('returns false if all elements fails to satisfy the predicate', function() {
    assert.deepEqual(intoArray(R.any(odd), [2, 4, 6, 8, 10, 12]), [false]);
  });

  it('works with more complex objects', function() {
    var people = [{first: 'Paul', last: 'Grenier'}, {first:'Mike', last: 'Hurley'}, {first: 'Will', last: 'Klein'}];
    var alliterative = function(person) {return person.first.charAt(0) === person.last.charAt(0);};
    assert.strictEqual(R.any(alliterative, people), false);
    people.push({first: 'Scott', last: 'Sauyet'});
    assert.strictEqual(R.any(alliterative, people), true);
  });

  it('can use a configurable function', function() {
    var teens = [{name: 'Alice', age: 14}, {name: 'Betty', age: 18}, {name: 'Cindy', age: 17}];
    var atLeast = function(age) {return function(person) {return person.age >= age;};};
    assert.strictEqual(R.any(atLeast(16), teens), true, 'Some can legally drive');
    assert.strictEqual(R.any(atLeast(21), teens), false, 'None can legally drink');
  });

  it('returns false for an empty list', function() {
    assert.strictEqual(R.any(T, []), false);
  });

  it('returns false into array for an empty list', function() {
    assert.deepEqual(intoArray(R.any(T), []), [false]);
  });

  it('dispatches when given a transformer in list position', function() {
    var listXf = {
      '@@transducer/init': function() { return []; },
      '@@transducer/step': function(acc, x) { return acc.concat([x]); },
      '@@transducer/result': function(x) { return x; }
    };
    assert.deepEqual(R.any(odd, listXf), {
      any: false,
      f: odd,
      xf: listXf
    });
  });

  it('is curried', function() {
    var count = 0;
    var test = function(n) {count += 1; return odd(n);};
    assert.strictEqual(R.any(test)([2, 4, 6, 7, 8, 10]), true);
  });
});
