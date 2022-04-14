var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('indexBy', function() {
  it('indexes list by the given property', function() {
    var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
    var indexed = R.indexBy(R.prop('id'), list);
    eq(indexed, {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}});
  });

  it('indexes list by the given property upper case', function() {
    var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
    var indexed = R.indexBy(R.compose(R.toUpper, R.prop('id')), list);
    eq(indexed, {ABC: {id: 'abc', title: 'B'}, XYZ: {id: 'xyz', title: 'A'}});
  });

  it('can act as a transducer', function() {
    var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
    var transducer = R.compose(
      R.indexBy(R.prop('id')),
      R.map(R.pipe(
        R.adjust(0, R.toUpper),
        R.adjust(1, R.omit(['id']))
      )));
    var expected = {ABC: {title: 'B'}, XYZ: {title: 'A'}};
    eq(R.into({}, transducer, list), expected);
    eq(R.transduce(transducer, (result, input) => {result[input[0]] = input[1]; return result;}, {}, list), expected);
  });

});
