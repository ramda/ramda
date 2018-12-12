import _flatCat from './_flatCat';
import XMap from './_xmap';


const _xchain = function _xchain(f, xf) {
  return new XMap(f, _flatCat(xf));
};
export default _xchain;
