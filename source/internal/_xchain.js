import _flatCat from './_flatCat.js';
import _xmap from './_xmap.js';


export default function _xchain(f) {
  return function(xf) { return _xmap(f)(_flatCat(xf)); };
}
