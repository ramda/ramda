var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('propEq', function() {
  var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
  var obj2 = {name: 'Fred', age: 12, hair: 'brown'};

  it('determines whether a particular property matches a given value for a specific object', function() {
    eq(R.propEq('name', 'Abby', obj1), true);
    eq(R.propEq('hair', 'brown', obj2), true);
    eq(R.propEq('hair', 'blond', obj2), false);
  });

  it('has R.equals semantics', function() {
    eq(R.propEq('value', 0, {value: -0}), false);
    eq(R.propEq('value', -0, {value: 0}), false);
    eq(R.propEq('value', NaN, {value: NaN}), true);
    eq(R.propEq('value', Maybe.Just([42]), {value: Maybe.Just([42])}), true);
  });

});
