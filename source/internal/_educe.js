import _isIterator from './_isIterator';
import _stepCat from './_stepCat';

const toArray = _stepCat([]);

export default function _educe(td1, input) {
  if (_isIterator(input)) {
    throw new TypeError('Iterator input');
  }
  return {
    transduce: td2 => _educe(xf => td1(td2(xf)), input),
    *[Symbol.iterator]() {
      const transformer = td1(toArray);
      for (const item of input) {
        const result = transformer['@@transducer/step']([], item);
        if (result && result['@@transducer/reduced']) {
          yield * result['@@transducer/value'];
          break;
        } else {
          yield * result;
        }
      }
      yield * transformer['@@transducer/result']([]);
    }
  };
}
