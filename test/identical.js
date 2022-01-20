var R = require('../source');
var eq = require('./shared/eq');
var assert = require('assert');

// see https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_script_api_access
const allowedCrossOriginProperties = ['blur', 'close', 'focus', 'postMessage', 'closed', 'frames', 'length', 'location', 'opener', 'parent', 'top', 'window'];


describe('identical', function() {
  var a = [];
  var b = a;
  it('has Object.is semantics', function() {
    eq(R.identical(100, 100), true);
    eq(R.identical(100, '100'), false);
    eq(R.identical('string', 'string'), true);
    eq(R.identical([], []), false);
    eq(R.identical(a, b), true);
    eq(R.identical(undefined, undefined), true);
    eq(R.identical(null, undefined), false);

    eq(R.identical(-0, 0), false);
    eq(R.identical(0, -0), false);
    eq(R.identical(NaN, NaN), true);

    eq(R.identical(NaN, 42), false);
    eq(R.identical(42, NaN), false);

    eq(R.identical(0, new Number(0)), false);
    eq(R.identical(new Number(0), 0), false);
    eq(R.identical(new Number(0), new Number(0)), false);
  });

  it('is auto-curried', function() {
    assert.strictEqual(R.identical.length, 2);
    var unaryFn = R.identical('foo');
    assert.strictEqual(unaryFn.length, 1);
    eq(unaryFn('bar'), false);
    eq(unaryFn('foo'), true);
  });

  it('does not access the placeholder property of its arguments which is forbidden for cross-origin browser windows', function() {
    // mock cross origin window object
    // Access is just to a few properties allowed
    // See https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_script_api_access

    function CrossOriginWindow() {}

    // disallow instanceof
    Object.defineProperty(
      CrossOriginWindow,
      Symbol.hasInstance,
      { value: function() { throw new Error('Not allowed instanceof!'); } }
    );

    const crossOriginWindowObject = new Proxy(
      new CrossOriginWindow(),
      {
        get(target, key, context) {
          if (allowedCrossOriginProperties.includes(key)) {
            return Reflect.get(target, key, context);
          }
          throw new Error(`Not allowed property "${key}" access!`);
        }
      }
    );

    assert.doesNotThrow(
      () => R.identical(crossOriginWindowObject, {}),
      Error
    );

    assert.doesNotThrow(
      () => R.identical({}, crossOriginWindowObject),
      Error
    );

    eq(R.identical(crossOriginWindowObject, crossOriginWindowObject), true);
    eq(R.identical(crossOriginWindowObject, {}), false);
  });

});
