function require(path) {
  switch (path.substr(path.lastIndexOf('/') + 1)) {
    case 'assert':
      return assert;
    case '..':
      return R;
    case 'lazylist':
      return R.lazylist;
    case 'random':
      return R.Random;
    default:
      throw new Error('Unexpected require path "' + path + '"');
  }
}
