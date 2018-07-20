var listXf = require('./helpers/listXf');

var R = require('../source');
var eq = require('./shared/eq');


describe('any', function() {
  var odd = function(n) {return n % 2 === 1;};
  var T = function() {return true;};
  var intoArray = R.into([]);

  it('returns true if any element satisfies the predicate', function() {
    eq(R.any(odd, [2, 4, 6, 8, 10, 11, 12]), true);
  });

  it('returns false if all elements fails to satisfy the predicate', function() {
    eq(R.any(odd, [2, 4, 6, 8, 10, 12]), false);
  });

  it('returns true into array if any element satisfies the predicate', function() {
    eq(intoArray(R.any(odd), [2, 4, 6, 8, 10, 11, 12]), [true]);
  });

  it('returns false if all elements fails to satisfy the predicate', function() {
    eq(intoArray(R.any(odd), [2, 4, 6, 8, 10, 12]), [false]);
  });

  it('works with more complex objects', function() {
    var people = [{first: 'Paul', last: 'Grenier'}, {first:'Mike', last: 'Hurley'}, {first: 'Will', last: 'Klein'}];
    var alliterative = function(person) {return person.first.charAt(0) === person.last.charAt(0);};
    eq(R.any(alliterative, people), false);
    people.push({first: 'Scott', last: 'Sauyet'});
    eq(R.any(alliterative, people), true);
  });

  it('can use a configurable function', function() {
    var teens = [{name: 'Alice', age: 14}, {name: 'Betty', age: 18}, {name: 'Cindy', age: 17}];
    var atLeast = function(age) {return function(person) {return person.age >= age;};};
    eq(R.any(atLeast(16), teens), true);
    eq(R.any(atLeast(21), teens), false);
  });

  it('returns false for an empty list', function() {
    eq(R.any(T, []), false);
  });

  it('returns false into array for an empty list', function() {
    eq(intoArray(R.any(T), []), [false]);
  });

  it('dispatches when given a transformer in list position', function() {
    eq(R.any(odd, listXf), {
      any: false,
      f: odd,
      xf: listXf
    });
  });

});
