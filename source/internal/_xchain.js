import _curry2 from './_curry2.js';
import _flatCat from './_flatCat.js';
import _xmap from './_xmap.js';


var _xchain = _curry2(function _xchain(f, xf) {
  return _xmap(f, _flatCat(xf));
});
export default _xchain;
