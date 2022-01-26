var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('propEq', function() {
  var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
  var obj2 = {name: 'Fred', age: 12, hair: 'brown'};

  it('determines whether a particular property matches a given value for a specific object', function() {
    eq(R.propEq('name', 'Abby', obj1), true);
    eq(R.propEq('hair', 'brown', obj2), true);
    eq(R.propEq('hair', 'blond', obj2), false);
  });

  it('handles number as property', function() {
    var deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth'];
    eq(R.propEq(0, 'Cthulhu', deities), true);
    eq(R.propEq(1, 'Dagon', deities), true);
    eq(R.propEq(2, 'Yog-Sothoth', deities), true);
    eq(R.propEq(-1, 'Yog-Sothoth', deities), true);
    eq(R.propEq(3, undefined, deities), true);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.propEq('value', 0, {value: -0}), false);
    eq(R.propEq('value', -0, {value: 0}), false);
    eq(R.propEq('value', NaN, {value: NaN}), true);
    eq(R.propEq('value', new Just([42]), {value: new Just([42])}), true);
  });

  it('returns false if called with a null or undefined object', function() {
    eq(R.propEq('name', 'Abby', null), false);
    eq(R.propEq('name', 'Abby', undefined), false);
  });

});
