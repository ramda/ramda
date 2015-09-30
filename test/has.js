var R = require('..');
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

  it('is curried, op-style', function() {
    var hasName = R.has('name');
    eq(hasName(fred), true);
    eq(hasName(anon), false);

    var point = {x: 0, y: 0};
    var pointHas = R.has(R.__, point);
    eq(pointHas('x'), true);
    eq(pointHas('y'), true);
    eq(pointHas('z'), false);
  });
});
