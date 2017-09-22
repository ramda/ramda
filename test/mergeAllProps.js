var R = require('..');
var eq = require('./shared/eq');


describe('mergeAllProps', function() {
  it('does the same as object spread', function() {
    const obj = {
      foo: { fooinner: 1 },
      bar: { barinner: 2 }
    };
    const expected = { fooinner: 1, barinner: 2 };

    // uncurried version
    eq(R.mergeAllProps(['foo', 'bar'], obj), expected);

    // curried version
    const getFooBar = R.mergeAllProps(['foo', 'bar']);
    eq(getFooBar(obj), expected);
  });

  it('returns {} if object props are numbers', function() {
    const obj = { foo: 1, bar: 2 };
    const expected = {};
    eq(R.mergeAllProps(['foo', 'bar'], obj), expected);
  });
});
