var R = require('..');
var eq = require('./shared/eq');

describe('rename', function() {
  var user = { firstName: 'Wax', lastName: 'Mannequin', age: 25 };

  it('renames properties provided', function() {
    eq(R.rename({firstName: 'first_name', lastName: 'last_name'}, user), {first_name: 'Wax', last_name: 'Mannequin', age: 25});
  });

  it('does not rename other properties', function() {
    var u = R.rename({firstName: 'first_name', lastName: 'last_name'}, user);
    eq(R.has('age', u), true);
  });

  it('should not mutate the original object', function() {
    R.rename({firstName: 'first_name', lastName: 'last_name'}, user);
    eq(R.has('firstName', user), true);
    eq(R.has('first_name', user), false);
  });

  it('does not add unnecessary properties', function() {
    eq(R.rename({firstName: 'first_name', lastName: 'last_name', something: 'else'}, user), {first_name: 'Wax', last_name: 'Mannequin', age: 25});
  });

  it('should rename keys to empty strings', function() {
    eq(R.rename({age: ''}, user), {firstName: 'Wax', lastName: 'Mannequin', '': 25});
  });

  it('should rename keys to 0', function() {
    eq(R.rename({age: 0}, user), {firstName: 'Wax', lastName: 'Mannequin', 0: 25});
  });
});
