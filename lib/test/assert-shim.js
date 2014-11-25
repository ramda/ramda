var assert = (function() {
  var module = {};

  var assert = module.exports = ok;

  // 4. Pure assertion tests whether a value is truthy, as determined
  // by !!guard.
  // assert.ok(guard, message_opt);
  // This statement is equivalent to assert.equal(true, !!guard,
  // message_opt);. To test strictly for the value true, use
  // assert.strictEqual(true, guard, message_opt);.

  function ok(value, message) {
    expect(value).to.be.ok(message);
  }
  assert.ok = ok;

  assert.deepEqual = function deepEqual(actual, expected, message) {
    expect(actual).to.eql(expected, message);
  };

  // 8. The non-equivalence assertion tests for any deep inequality.
  // assert.notDeepEqual(actual, expected, message_opt);

  assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
    expect(actual).to.not.eql(expected, message);
  };

  // 9. The strict equality assertion tests strict equality, as determined by ===.
  // assert.strictEqual(actual, expected, message_opt);

  assert.strictEqual = function strictEqual(actual, expected, message) {
    expect(actual).to.equal(expected, message);
  };

  // 10. The strict non-equality assertion tests for strict inequality, as
  // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

  assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
    expect(actual).to.not.equal(expected, message);
  };

  // 11. Expected to throw an error:
  // assert.throws(block, Error_opt, message_opt);

  assert.throws = function(block, /*optional*/ error, /*optional*/ message) {
    expect(block).to.throwError(function(e) {
      if (error) expect(e instanceof error).ok();
    }, message);
  };

  // EXTENSION! This is annoying to write outside this module.
  assert.doesNotThrow = function(block, /*optional*/ message) {
    expect(block).to.not.throwError(message);
  };

  return module.exports;
}());
