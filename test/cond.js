var R = require('../source');
var eq = require('./shared/eq');


describe('cond', function() {
  it('returns a function', function() {
    eq(typeof R.cond([]), 'function');
  });

  it('returns a conditional function', function() {
    var fn = R.cond([
      [R.equals(0),   R.always('water freezes at 0°C')],
      [R.equals(100), R.always('water boils at 100°C')],
      [R.T,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
    ]);
    eq(fn(0), 'water freezes at 0°C');
    eq(fn(50), 'nothing special happens at 50°C');
    eq(fn(100), 'water boils at 100°C');
  });

  it('returns a function which returns undefined if none of the predicates matches', function() {
    var fn = R.cond([
      [R.equals('foo'), R.always(1)],
      [R.equals('bar'), R.always(2)]
    ]);
    eq(fn('quux'), undefined);
  });

  it('predicates are tested in order', function() {
    var fn = R.cond([
      [R.T, R.always('foo')],
      [R.T, R.always('bar')],
      [R.T, R.always('baz')]
    ]);
    eq(fn(), 'foo');
  });

  it('forwards all arguments to predicates and to transformers', function() {
    var fn = R.cond([
      [function(_, x) { return x === 42; }, function() { return arguments.length; }]
    ]);
    eq(fn(21, 42, 84), 4);  // transformer.arguments = ( 21, 42, 84, true )
  });

  it('retains highest predicate arity', function() {
    var fn = R.cond([
      [R.nAry(2, R.T), R.T],
      [R.nAry(3, R.T), R.T],
      [R.nAry(1, R.T), R.T]
    ]);
    eq(fn.length, 3);
  });

});

describe('cond new featrues', function () {

  it('just predicate and return result', function () {
    let fmt = cond([trim]);
    let x = fmt(" ")
    expect(x).toEqual(undefined)
    let y = fmt("  x  ")
    expect(y).toEqual("x")
    let z = fmt("")
    expect(z).toEqual(undefined)
  });

  it('cache predicate result', function () {
    let fmt = cond([
      [trim, (_, res) => ({ res })],
    ]);
    let y = fmt("  x  ")
    expect(y).toEqual({ res: "x" })
    let z = fmt("")
    expect(z).toEqual(undefined)
    let x = fmt(" ")
    expect(x).toEqual(undefined)
  });

  it('an example in world', function () {
    let token = cond([
      input => {
        let mtch = /^\d+/.exec(input)
        if (mtch && mtch.length > 0) {
          let lexeme = mtch[0]
          let restInput = input.slice(lexeme.length)
          return { token: { number: parseInt(lexeme) }, restInput }
        } else {
          return null
        }
      }
    ]);
    let y = token("123+234")
    expect(y).toEqual({ "restInput": "+234", "token": { "number": 123 } })
  });

});