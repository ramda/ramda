export default function _coerceString(x) {
  const INFINITY = 1 / 0;
  const EMPTY = '';

  switch (Object.prototype.toString.call(x)) {
    case '[object Number]':
      const stringVal = x.toString();
      return (stringVal === '0' && (1 / x) === -INFINITY) ? '-0' : stringVal;
    case '[object Date]':
      const dateString = x.toDateString();
      return dateString === 'Invalid Date' ? EMPTY : dateString;
    case '[object Object]':
      return JSON.stringify(x);
    case '[object String]':
      return x;
    case '[object Null]':
    case '[object Undefined]':
      return EMPTY;
    default:
      return x.toString();
  }
}
