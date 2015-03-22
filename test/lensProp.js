var assert = require('assert');

var R = require('..');


describe('lensProp', function() {

  var phraseLens = R.lensProp('catchphrase');
  var xLens = R.lensProp('x');
  var obj = {x: 100, y: 200, catchphrase: 'zing!'};
  function uc(s) { return s.toUpperCase(); }

  it('retrieves values from inside an object as defined by the `k` parameter', function() {
    assert.strictEqual(phraseLens(obj), 'zing!');
  });

  it('"sets" properties on an object and return the new object', function() {
    assert.deepEqual(phraseLens.set('cow', obj), {x: 100, y: 200, catchphrase: 'cow'});
  });

  it('the setter should not mutate the object', function() {
    assert.deepEqual(phraseLens.set('kapow!', obj), {x: 100, y: 200, catchphrase: 'kapow!'});
    assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
  });

  it('maps a property from getter to setter', function() {
    assert.deepEqual(phraseLens.map(uc, obj), {x: 100, y: 200, catchphrase: 'ZING!'});
  });

  it('the modifier should not mutate the object', function() {
    var obj = {x: 100, y: 200, catchphrase: 'zing!'};
    assert.deepEqual(phraseLens.map(uc, obj), {x: 100, y: 200, catchphrase: 'ZING!'});
    assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
  });

  it('curries map and set and modifies with composed lens', function() {
    var xPlus3 = R.compose(xLens.map(R.add(1)), xLens.map(R.add(2)));
    assert.deepEqual(xPlus3(obj), {x: 103, y: 200, catchphrase: 'zing!'});
    var set0Plus1 = R.compose(xLens.map(R.add(1)), xLens.set(0));
    assert.deepEqual(set0Plus1(obj), {x: 1, y: 200, catchphrase: 'zing!'});
  });
});
