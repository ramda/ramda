var R = require('..');
var eq = require('./shared/eq');


describe('mergeSpec', function() {

  it('works with empty spec', function() {
    eq(R.mergeSpec({})(), {});
  });

  it('works with unary functions', function() {
    eq(R.mergeSpec({ v: R.inc, u: R.dec })(1), { v: 2, u: 0 });
  });

  it('works with binary functions', function() {
    eq(R.mergeSpec({ sum: R.add })(1, 2), { sum: 3 });
  });

  it('works with nested specs', function() {
    eq(R.mergeSpec({ unnested: R.always(0), nested: { sum: R.add } })(1, 2),
       { unnested: 0, nested: { sum: 3 } });
  });

  it('retains the highest arity', function() {
    var f = R.mergeSpec({ f1: R.nAry(2, R.T), f2: R.nAry(5, R.T) });
    eq(f.length, 5);
  });

  it('returns a curried function', function() {
    eq(R.mergeSpec({ sum: R.add })(1)(2), { sum: 3 });
  });

  it('merges new props onto the original object', function() {
    eq(R.mergeSpec({
      fullName: R.compose(R.join(' '), R.values, R.pick(['firstName', 'lastName'])),
      address: R.pipe(
        R.prop('address'),
        R.evolve({
          street: R.trim,
          city: R.compose(str => str.replace(/(?:^|\s)\S/g, R.toUpper), R.trim),
          state: R.toUpper,
          zip: R.compose(R.trim, R.when(R.is(Number), R.toString))
        })
      )
    })({
      firstName: 'Montgomery',
      lastName: 'Burns',
      address: {
        street: '1000 Mammon Lane, ',
        city: 'springfield',
        state: 'or',
        zip: 97403
      }
    }), {
      firstName: 'Montgomery',
      lastName: 'Burns',
      address: {
        street: '1000 Mammon Lane,',
        city: 'Springfield',
        state: 'OR',
        zip: '97403'
      },
      fullName: 'Montgomery Burns'
    });
  });

});

