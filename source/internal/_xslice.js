import _curry3 from './_curry3';
import _xdrop from './_xdrop';
import _xtake from './_xtake';

function _xslice(from, to, xf) {
  if (!(from >= 0 && to >= 0)) {
    throw new RangeError(`_xslice: expected positive integers, got <${from}, ${to})`);
  }
  return _xtake(to, _xdrop(from, xf));
}

export default _curry3(_xslice);
