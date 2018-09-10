var R = require('../source');
var eq = require('./shared/eq');


describe('eqProps', function() {
  it('reports whether two objects have the same value for a given property', function() {
    eq(R.eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    eq(R.eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.eqProps('value', {value: 0}, {value: -0}), false);
    eq(R.eqProps('value', {value: -0}, {value: 0}), false);
    eq(R.eqProps('value', {value: NaN}, {value: NaN}), true);
    eq(R.eqProps('value', {value: new Just([42])}, {value: new Just([42])}), true);
  });

});
