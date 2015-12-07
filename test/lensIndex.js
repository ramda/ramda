var assert = require('assert');

var R = require('..');


var eq = function(actual, expected) {
  assert.strictEqual(R.toString(actual), R.toString(expected));
};


describe('lensIndex', function() {

  it('handles non-existent path', function() {
    //  inc :: Number? -> Number
    var inc = R.compose(R.inc, R.defaultTo(0));
    var lens = R.compose(R.lensIndex(1), R.lensIndex(1));

    eq(R.view(lens, [[1, 2], [3, 4]]),      4);
    eq(R.view(lens, [[1, 2], [3]]),         undefined);
    eq(R.view(lens, [[1, 2], []]),          undefined);
    eq(R.view(lens, [[1, 2]]),              undefined);
    eq(R.view(lens, []),                    undefined);

    eq(R.over(lens, inc, [[1, 2], [3, 4]]), [[1, 2], [3, 5]]);
    eq(R.over(lens, inc, [[1, 2], [3]]),    [[1, 2], [3, 1]]);
    eq(R.over(lens, inc, [[1, 2], []]),     [[1, 2], [undefined, 1]]);
    eq(R.over(lens, inc, [[1, 2]]),         [[1, 2], [undefined, 1]]);
    eq(R.over(lens, inc, []),               [undefined, [undefined, 1]]);

    eq(R.set(lens, 9, [[1, 2], [3, 4]]),    [[1, 2], [3, 9]]);
    eq(R.set(lens, 9, [[1, 2], [3]]),       [[1, 2], [3, 9]]);
    eq(R.set(lens, 9, [[1, 2], []]),        [[1, 2], [undefined, 9]]);
    eq(R.set(lens, 9, [[1, 2]]),            [[1, 2], [undefined, 9]]);
    eq(R.set(lens, 9, []),                  [undefined, [undefined, 9]]);
  });

});
