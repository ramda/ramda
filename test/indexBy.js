var R = require('..');
var eq = require('./shared/eq');


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


  it('is curried', function() {
    var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
    var indexed = R.indexBy(R.prop('id'))(list);
    eq(indexed, {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}});
  });

  it('can act as a transducer', function() {
    var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
    var transducer = R.compose(
      R.indexBy(R.prop('id')),
      R.map(R.pipe(
        R.adjust(R.toUpper, 0),
        R.adjust(R.omit(['id']), 1)
      )));
    var result = R.into({}, transducer, list);
    eq(result, {ABC: {title: 'B'}, XYZ: {title: 'A'}});
  });

});
