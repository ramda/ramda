export default function array_map(f, a) {
  var b = [];
  for (var i = 0; i < a.length; ++i) {
    b.push(f(a[i]));
  }
  return b;
};
