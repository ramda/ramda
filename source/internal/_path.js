import prop from '../prop.js';

export default function _path(pathAr, obj) {
  var val = obj;
  for (var i = 0; i < pathAr.length; i += 1) {
    if (val == null) {
      return undefined;
    }
    val = prop(pathAr[i], val);
  }
  return val;
}
