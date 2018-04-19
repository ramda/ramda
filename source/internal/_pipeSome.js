import complement from '../complement';
import isNil from '../isNil';
import when from '../when';

export default function _pipeSome(f, g) {
  return function() {
    if (isNil(g) || !g.call) { return null; }

    var result = f.apply(this, arguments);
    return when(
      complement(isNil),
      function(result) { return g.call(this, result); }
    )(result);
  };
}
