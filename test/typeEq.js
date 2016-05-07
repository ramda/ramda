var R = require('..');

var eq = require('./shared/eq');


describe('typeEq', function() {

  it('indicates whether a value is a member of a specified type', function() {
    function Foo() {}
    eq(R.typeEq('Array', [1, 2, 3]), true);
    eq(R.typeEq('Object', [1, 2, 3]), false);
    eq(R.typeEq('Object', new Foo()), true);
    eq(R.typeEq('Number', 42), true);
    eq(R.typeEq('Number', new Number(42)), true);
  });

});
