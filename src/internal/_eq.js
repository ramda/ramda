module.exports = function _eq(a, b) {
  if (a === 0) {
    return 1 / a === 1 / b;
  } else {
    return a === b || (a !== a && b !== b);
  }
};
