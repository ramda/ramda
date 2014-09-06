function require(path) {
  switch (path.substr(path.lastIndexOf('/') + 1)) {
    case 'assert':
      return assert;
    case '..':
      return this.R ? this.R : this.ramda;
    case 'lazylist':
      return this.R ? this.R.lazylist : this.ramda.lazylist;
    default:
      throw new Error('Unexpected require path "' + path + '"');
  }
}
