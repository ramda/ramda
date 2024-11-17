import _dispatchable from './_dispatchable.js';
import _makeFlat from './_makeFlat.js';
import _xchain from './_xchain.js';
import map from '../map.js';


export default _dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function(x) { return fn(monad(x))(x); };
  }
  return _makeFlat(false)(map(fn, monad));
});
