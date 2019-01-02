import _curry2 from './internal/_curry2';

var omitArgs = _curry2(function omitArgs(n, fn) {
  if (n < 0) {
    throw new Error('First argument to omitArgs must be a non-negative integer');
  }
  return function () { fn.apply(this, Array.from(arguments).slice(n)) }
});

export default omitArgs;
