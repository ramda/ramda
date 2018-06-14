var R = require('..');
var eq = require('./shared/eq');


describe('evolveKeys', function() {
  it('creates a new object by evolving the `object` according to the `transformation` functions', function() {
    var transf   = {firstName: R.toUpper, lastName: R.toLower};
    var object   = {firstName: 'John', lastName: 'Smith', emailAddress: 'foo@BAR.com'};
    var expected = {FIRSTNAME: 'John', lastname: 'Smith', emailAddress: 'foo@BAR.com'};
    eq(R.evolveKeys(transf, object), expected);
  });

  it('does not invoke function if object does not contain the key', function() {
    var transf   = {firstName: R.toUpper, lastName: R.toLower};
    var object   = {firstName: 'John'};
    var expected = {FIRSTNAME: 'John'};
    eq(R.evolveKeys(transf, object), expected);
  });

  it('is not destructive', function() {
    var transf   = {firstName: R.toUpper, lastName: R.toLower};
    var object   = {firstName: 'John', lastName: 'Smith', emailAddress: 'foo@BAR.com'};
    var expected = {firstName: 'John', lastName: 'Smith', emailAddress: 'foo@BAR.com'};
    R.evolveKeys(transf, object);
    eq(object, expected);
  });

  it('is recursive', function() {
    var transf   = { name: { firstName: R.toUpper, lastName: R.toLower }, emailAddress: 'foo@BAR.com' };
    var object   = { name: { firstName: 'John', lastName: 'Smith' }, emailAddress: 'foo@BAR.com' };
    var expected = { name: { FIRSTNAME: 'John', lastname: 'Smith' }, emailAddress: 'foo@BAR.com' };

    eq(R.evolveKeys(transf, object), expected);
  });

  it('ignores primitive value transformations', function() {
    var transf   = {a: 'b', c: 'd'};
    var object   = {a: 0, c: 1};
    var expected = {a: 0, c: 1};
    eq(R.evolveKeys(transf, object), expected);
  });

  it('ignores null transformations', function() {
    var transf   = {a: null};
    var object   = {a: 0};
    var expected = {a: 0};
    eq(R.evolveKeys(transf, object), expected);
  });

});
