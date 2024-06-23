export default function _nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return list[idx];
}
