import _fromPairs from './_fromPairs.js';
import _toPairs from './_toPairs.js';
import _chain from './_chain.js';

var rebuild = function(convert, obj) {
  return _fromPairs(_chain(
    function(pair) {return convert(pair[0], pair[1]);},
    _toPairs(obj)
  ));
};
export default rebuild;
