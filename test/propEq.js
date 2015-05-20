var assert = require('assert');

var R = require('..');


describe('propEq', function() {
  var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
  var obj2 = {name: 'Fred', age: 12, hair: 'brown'};
  var obj3 = {name: 'Rusty', age: 10, hair: 'brown'};
  var obj4 = {name: 'Alois', age: 15, disposition: 'surly'};

  it('determines whether a particular property matches a given value for a specific object', function() {
    assert.strictEqual(R.propEq('name', 'Abby', obj1), true);
    assert.strictEqual(R.propEq('hair', 'brown', obj2), true);
    assert.strictEqual(R.propEq('hair', 'blond', obj2), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.propEq('value', 0, {value: -0}), false);
    assert.strictEqual(R.propEq('value', -0, {value: 0}), false);
    assert.strictEqual(R.propEq('value', NaN, {value: NaN}), true);
    assert.strictEqual(R.propEq('value', new Just([42]), {value: new Just([42])}), true);
  });

  it('is curried', function() {
    var kids = [obj1, obj2, obj3, obj4];
    var hairMatch = R.propEq('hair');
    assert.strictEqual(typeof hairMatch, 'function');
    var brunette = hairMatch('brown');
    assert.deepEqual(R.filter(brunette, kids), [obj2, obj3]);
    // more likely usage:
    assert.deepEqual(R.filter(R.propEq('hair', 'brown'), kids), [obj2, obj3]);
  });

});
