var R = require('..');
var eq = require('./shared/eq');


describe('boundProp', function() {
  function createScaleFactor(factor) {
    return {
      factor: factor,
      scale: function(value) {
        return this.factor * value;
      }
    };
  }

  it('returns a function that fetches the appropriate property and binds it to the object', function() {
    var scaleGetter = R.boundProp('scale');
    eq(typeof scaleGetter, 'function');
    eq(scaleGetter(createScaleFactor(10))(7), 70);
  });

  it('returns undefined if the specified property does not exist', function() {
    var p = R.boundProp('does-not-exist', {});
    eq(typeof p, 'undefined');
  });

});
