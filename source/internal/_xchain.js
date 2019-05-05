import _curry2 from './_curry2';
import _flatCat from './_flatCat';
import _xmap from './_xmap';


var _xchain = _curry2(function _xchain(f, xf) {
  return _xmap(f, _flatCat(xf));
});
export default _xchain;
