var R = require('../source');
var eq = require('./shared/eq');


describe('lensEq', function() {
  var obj = {name: 'Abby', age: 7, hair: 'blond', family: { father: 'Jones' }};
  var array = [1, 2, 3, 4];

  it('able to use with lens', function() {
    var ageLens = R.lens(R.prop('age'), R.assoc('age'));

    eq(R.lensEq(ageLens, 7, obj), true);
    eq(R.lensEq(ageLens, 6, obj), false);
  });

  it('able to use with lensProp', function() {
    var namePropLens = R.lensProp('name');

    eq(R.lensEq(namePropLens, 'Abby', obj), true);
    eq(R.lensEq(namePropLens, 'Silly', obj), false);
  });

  it('able to use with lensPath', function() {
    var fatherPathLens = R.lensPath(['family', 'father']);

    eq(R.lensEq(fatherPathLens, 'Jones', obj), true);
    eq(R.lensEq(fatherPathLens, 'Tom', obj), false);
  });

  it('able to use with lensIndex', function() {
    var indexLens = R.lensIndex(1);

    eq(R.lensEq(indexLens, 2, array), true);
    eq(R.lensEq(indexLens, 1, array), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };
    var valuePropLens = R.lensProp('value');

    eq(R.lensEq(valuePropLens, 0, {value: -0}), false);
    eq(R.lensEq(valuePropLens, -0, {value: 0}), false);
    eq(R.lensEq(valuePropLens, NaN, {value: NaN}), true);
    eq(R.lensEq(valuePropLens, new Just([42]), {value: new Just([42])}), true);
  });

  it('returns false if called with a null or undefined object', function() {
    var namePropLens = R.lensProp('name');

    eq(R.lensEq(namePropLens, 'Abby', null), false);
    eq(R.lensEq(namePropLens, 'Abby', undefined), false);
  });

});
