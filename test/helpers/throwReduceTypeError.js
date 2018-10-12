export default function throwReduceTypeError(err) {
  return err.constructor === TypeError &&
    err.message === 'reduce: list must be array or iterable';
}
