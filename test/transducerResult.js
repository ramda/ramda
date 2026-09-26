var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('transducer result', function() {
  ['all', 'any', 'find', 'findIndex', 'findLast', 'findLastIndex'].forEach(function(name) {
    describe(name, function() {
      it('unwraps a reduced result emitted during completion', function() {
        [[], [1, 2]].forEach(function(input) {
          [R.always(false), R.always(true)].forEach(function(predicate) {
            var expected = [R[name](predicate, input)];
            eq(R.into([], R.compose(R[name](predicate), R.take(1)), input), expected);
          });
        });
      });

      it('can discard the result emitted during completion', function() {
        [[], [1, 2]].forEach(function(input) {
          [R.always(false), R.always(true)].forEach(function(predicate) {
            eq(R.into([], R.compose(R[name](predicate), R.take(0)), input), []);
          });
        });
      });

      it('completes a reducing transformer once with its unwrapped accumulator', function() {
        [null, undefined, false, 0, '', 'done'].forEach(function(accumulator) {
          var steps = 0;
          var results = 0;
          var xf = {
            '@@transducer/step': function() {
              steps += 1;
              return R.reduced(accumulator);
            },
            '@@transducer/result': function(result) {
              results += 1;
              eq(result, accumulator);
              return 'complete';
            }
          };

          eq(R.transduce(R[name](R.always(false)), xf, [], []), 'complete');
          eq(steps, 1);
          eq(results, 1);
        });
      });

      it('preserves a non-reducing accumulator emitted during completion', function() {
        [null, undefined, false, 0, '', 'done'].forEach(function(accumulator) {
          var xf = {
            '@@transducer/step': R.always(accumulator),
            '@@transducer/result': R.identity
          };

          eq(R.transduce(R[name](R.always(false)), xf, [], []), accumulator);
        });
      });
    });
  });
});
