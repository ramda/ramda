export default function _filterMap(fn, map) {
  var result = new Map();

  map.forEach((value, key) => {
    if (fn(value)) {
      result.set(key, value);
    }
  });
  return result;
}
