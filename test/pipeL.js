var assert = require('assert');

var R = require('..');

describe('pipeL', function() {

  var headLens = R.lensIndex(0);
  var xLens = R.lensProp('x');

  var headThenXLens = R.pipeL(headLens, xLens);
  var xThenHeadLens = R.pipeL(xLens, headLens);
  var headXHeadLens = R.pipeL(headLens, xLens, headLens);

  var objWithList = {x: [1, 2, 3]};
  var listOfObjs = [{x: 4}, {x: 5}, {x: 6}];

  it('composes gets from left to right', function() {
    assert.strictEqual(xThenHeadLens(objWithList), 1);
    assert.strictEqual(headThenXLens(listOfObjs), 4);
  });

  it('composes sets from left to right', function() {
    assert.deepEqual(xThenHeadLens.set(10, objWithList), {x: [10, 2, 3]});
    assert.deepEqual(headThenXLens.set(10, listOfObjs), [{x: 10}, {x: 5}, {x: 6}]);
  });

  it('does not mutate the source when setting', function() {
    assert.deepEqual(xThenHeadLens.set(10, objWithList), {x: [10, 2, 3]});
    assert.deepEqual(objWithList, {x: [1, 2, 3]});
  });

  it('can compose multiple lenses', function() {
    var source = [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}];
    assert.strictEqual(headXHeadLens(source), 0);
    assert.deepEqual(headXHeadLens.set(8, source), [{x: [8, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]);
    assert.deepEqual(source, [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]);
  });

});
