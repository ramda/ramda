function require(path) {
  switch (path) {
    case 'assert':  return assert;
    case 'q':       return Q;
    case '..':      return R;
    default:        console.log('Unexpected require path "' + path + '"');
  }
}
