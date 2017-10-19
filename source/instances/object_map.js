import _reduce from '../internal/_reduce';
import keys from '../keys';

export default function object_map(f, obj) {
  return _reduce(function(acc, key) {
    acc[key] = f(obj[key]);
    return acc;
  }, {}, keys(obj));
};
