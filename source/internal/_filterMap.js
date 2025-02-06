export default function _filterMap(fn, map) {
  var result = new Map();
  var iterator = map.entries();
  var current = iterator.next();
  while (!current.done) {
    if (fn(current.value[1])) {
      result.set(current.value[0], current.value[1]);
    }
    current = iterator.next();
  }
  return result;
}
