function require(path) {
  switch (path.substr(path.lastIndexOf('/') + 1)) {
    case 'assert':
      return assert;
    case '..':
      return R;
    default:
      throw new Error('Unexpected require path "' + path + '"');
  }
}
