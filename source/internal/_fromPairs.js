
export default function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    var key = pairs[idx][0];
    if (key === '__proto__' || (key !== null && (typeof key === 'object' || typeof key === 'function'))) {
      Object.defineProperty(result, key, {
        value: pairs[idx][1], enumerable: true, writable: true, configurable: true
      });
    } else {
      result[key] = pairs[idx][1];
    }
    idx += 1;
  }
  return result;
}
