var _compose = require('./_compose');
var lens = require('../lens');

module.exports = function _composeL(innerLens, outerLens) {
  return lens(_compose(innerLens, outerLens), function(x, source) {
    var newInnerValue = innerLens.set(x, outerLens(source));
    return outerLens.set(newInnerValue, source);
  });
};
