function require(path) {
  switch (path.substr(path.lastIndexOf('/') + 1)) {
    case 'assert':
      return assert;
    case '..':
      return R;
    case 'lazylist':
      return R.lazylist;
    default:
      throw new Error('Unexpected require path "' + path + '"');
  }
}
