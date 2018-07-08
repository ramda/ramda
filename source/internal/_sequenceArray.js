import _flattenCons from './_flattenCons';
import ap from '../ap';
import map from '../map';
import pair from '../pair';
import reduceRight from '../reduceRight';


export default function _sequenceArray(of, xs) {
  return map(_flattenCons, reduceRight(function(x, acc) {
    return ap(map(pair, x), acc);
  }, of([]), xs));
}
