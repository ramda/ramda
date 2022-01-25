export default function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.flags ?  pattern.flags : (pattern.global     ? 'g' : '') +
                                                                      (pattern.ignoreCase ? 'i' : '') +
                                                                      (pattern.multiline  ? 'm' : '') +
                                                                      (pattern.sticky     ? 'y' : '') +
                                                                      (pattern.unicode    ? 'u' : '') +
                                                                      (pattern.dotAll     ? 's' : '')));
}
