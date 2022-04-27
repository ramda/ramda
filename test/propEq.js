var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var {Just} = require('./shared/Maybe.js');


describe('propEq', function() {
  var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
  var obj2 = {name: 'Fred', age: 12, hair: 'brown'};

  it('determines whether a particular property matches a given value for a specific object', function() {
    eq(R.propEq('Abby', 'name', obj1), true);
    eq(R.propEq('brown', 'hair', obj2), true);
    eq(R.propEq('blond', 'hair', obj2), false);
  });

  it('handles number as property', function() {
    var deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth'];
    eq(R.propEq('Cthulhu', 0, deities), true);
    eq(R.propEq('Dagon', 1, deities), true);
    eq(R.propEq('Yog-Sothoth', 2, deities), true);
    eq(R.propEq('Yog-Sothoth', -1, deities), true);
    eq(R.propEq(undefined, 3, deities), true);
  });

  it('has R.equals semantics', function() {
    eq(R.propEq(0, 'value', {value: -0}), false);
    eq(R.propEq(-0, 'value', {value: 0}), false);
    eq(R.propEq(NaN, 'value', {value: NaN}), true);
    eq(R.propEq(new Just([42]), 'value', {value: new Just([42])}), true);
  });

  it('returns false if called with a null or undefined object', function() {
    eq(R.propEq('Abby', 'name', null), false);
    eq(R.propEq('Abby', 'name', undefined), false);
  });

});
