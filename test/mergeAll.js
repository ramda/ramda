var R = require('../source');
var eq = require('./shared/eq');


describe('mergeAll', function() {
  it('merges a list of objects together into one object', function() {
    eq(R.mergeAll([{foo:1}, {bar:2}, {baz:3}]), {foo:1, bar:2, baz:3});
  });

  it('gives precedence to later objects in the list', function() {
    eq(R.mergeAll([{foo:1}, {foo:2}, {bar:2}]), {foo:2, bar:2});
  });

  it('ignores inherited properties', function() {
    function Foo() {}
    Foo.prototype.bar = 42;
    var foo = new Foo();
    var res = R.mergeAll([foo, {fizz: 'buzz'}]);
    eq(res, {fizz: 'buzz'});
  });

});
