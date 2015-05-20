var assert = require('assert');

var R = require('..');


describe('eqProps', function() {
  it('reports whether two objects have the same value for a given property', function() {
    assert.strictEqual(R.eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    assert.strictEqual(R.eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.eqProps('value', {value: 0}, {value: -0}), false);
    assert.strictEqual(R.eqProps('value', {value: -0}, {value: 0}), false);
    assert.strictEqual(R.eqProps('value', {value: NaN}, {value: NaN}), true);
    assert.strictEqual(R.eqProps('value', {value: new Just([42])}, {value: new Just([42])}), true);
  });

  it('is curried', function() {
    var sameName = R.eqProps('name');
    assert.strictEqual(sameName({name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
  });
});
