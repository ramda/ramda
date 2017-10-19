export default function object_concat(a, b) {
  var c = {};
  for (var k in a) {
    c[k] = a[k];
  }
  for (var k in b) {
    c[k] = b[k];
  }
  return c;
};
