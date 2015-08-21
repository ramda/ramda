var assert = require('assert');

var R = require('..');


var eq = function(actual, expected) {
  assert.strictEqual(R.toString(actual), R.toString(expected));
};


describe('lensProp', function() {

  it('handles non-existent path', function() {
    //  inc :: Number? -> Number
    var inc = R.compose(R.inc, R.defaultTo(0));
    var lens = R.compose(R.lensProp('a'), R.lensProp('b'), R.lensProp('c'));

    eq(R.view(lens, {$: 0, a: {b: {c: 42}}}),       42);
    eq(R.view(lens, {$: 0, a: {b: {}}}),            undefined);
    eq(R.view(lens, {$: 0, a: {}}),                 undefined);
    eq(R.view(lens, {$: 0}),                        undefined);

    eq(R.over(lens, inc, {$: 0, a: {b: {c: 42}}}),  {$: 0, a: {b: {c: 43}}});
    eq(R.over(lens, inc, {$: 0, a: {b: {}}}),       {$: 0, a: {b: {c: 1}}});
    eq(R.over(lens, inc, {$: 0, a: {}}),            {$: 0, a: {b: {c: 1}}});
    eq(R.over(lens, inc, {$: 0}),                   {$: 0, a: {b: {c: 1}}});

    eq(R.set(lens, 99, {$: 0, a: {b: {c: 42}}}),    {$: 0, a: {b: {c: 99}}});
    eq(R.set(lens, 99, {$: 0, a: {b: {}}}),         {$: 0, a: {b: {c: 99}}});
    eq(R.set(lens, 99, {$: 0, a: {}}),              {$: 0, a: {b: {c: 99}}});
    eq(R.set(lens, 99, {$: 0}),                     {$: 0, a: {b: {c: 99}}});
  });

});
