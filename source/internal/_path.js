import prop from '../prop.js';

export default function _path(pathAr, obj) {
  var val = obj;

  if (val == null) {
    return undefined;
  }

  for (var i = 0; i < pathAr.length; i += 1) {
    val = prop(pathAr[i], val);
  }
  return val;
}
