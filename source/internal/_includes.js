import _indexOf from './_indexOf';


export default function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
