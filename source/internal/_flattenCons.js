// flattens [a, [b, [c, []]]] to [a, b, c]
export default function _flattenCons(xs) {
  var flattened = [];
  while (xs.length > 0) {
    flattened.push(xs[0]);
    xs = xs[1];
  }
  return flattened;
}
