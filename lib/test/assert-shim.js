var assert = function(value, message) {
  expect(value).to.be.ok(message);
};

assert.deepEqual = function(actual, expected, message) {
  expect(actual).to.eql(expected, message);
};

assert.notDeepEqual = function(actual, expected, message) {
  expect(actual).to.not.eql(expected, message);
};

assert.strictEqual = function(actual, expected, message) {
  expect(actual).to.equal(expected, message);
};

assert.notStrictEqual = function(actual, expected, message) {
  expect(actual).to.not.equal(expected, message);
};

assert.throws = function(thunk, pred) {
  try {
    thunk();
    assert(false);
  } catch (err) {
    assert(pred(err));
  }
};
