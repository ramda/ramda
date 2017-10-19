import curryN from '../curryN';

export default function function_map(f, g) {
  return curryN(g.length, function() {
    return f.call(this, g.apply(this, arguments));
  });
};
