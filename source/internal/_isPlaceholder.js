export default function _isPlaceholder(a) {
  return a !== null && a !== undefined &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
}
