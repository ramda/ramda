var assert = require('assert');

var R = require('..');


describe('propEq', function() {

  var abby = {name: 'Abby', age: 7, hair: 'blond'};
  var fred = {name: 'Fred', age: 12, hair: 'brown'};

  it('determines whether a particular property matches a given value for a specific object', function() {
    assert.strictEqual(R.propEq('Abby', 'name', abby), true);
    assert.strictEqual(R.propEq('brown', 'hair', fred), true);
    assert.strictEqual(R.propEq('blond', 'hair', fred), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.propEq(0, 'value', {value: -0}), false);
    assert.strictEqual(R.propEq(-0, 'value', {value: 0}), false);
    assert.strictEqual(R.propEq(NaN, 'value', {value: NaN}), true);
    assert.strictEqual(R.propEq(new Just([42]), 'value', {value: new Just([42])}), true);
  });

  it('is curried', function() {
    assert.strictEqual(R.propEq('Abby')('name')(abby), true);
  });

});
