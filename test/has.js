var R = require('../source');
var eq = require('./shared/eq');


describe('has', function() {
  var fred = {name: 'Fred', age: 23};
  var anon = {age: 99};

  it('returns true if the specified property is present', function() {
    eq(R.has('name', fred), true);
  });

  it('returns false if the specified property is absent', function() {
    eq(R.has('name', anon), false);
  });

  it('does not check properties from the prototype chain', function() {
    var Person = function() {};
    Person.prototype.age = function() {};

    var bob = new Person();
    eq(R.has('age', bob), false);
  });

  it('returns false for non-objects', function() {
    eq(R.has('a', undefined), false);
    eq(R.has('a', null), false);
    eq(R.has('a', true), false);
    eq(R.has('a', ''), false);
    eq(R.has('a', /a/), false);
  });

  it('tests currying', function() {
    eq(R.has('a')({ a: { b: 1 } }), true);
  });
});
