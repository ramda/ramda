export default function _unreduced(x) {
  return x && x['@@transducer/reduced'] ? x['@@transducer/value'] : x;
}
