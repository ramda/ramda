var assert = require('assert');
var Immutable = require('immutable');
var thirdPartyTransducers = require('transducers-js')
var R = require('..');


describe('transduce', function() {
    var even = function(x) {return x % 2 === 0;};
    var divis3 = function(x) {return x % 3 === 0;};
    var inc = function(x) {return x + 1;};
    var square = function(x) {return x * x;};
    
    var list = R.range(0, 5);
    var obj = R.zipObj(
        R.map(R.unary(String.fromCharCode), R.range(65, 70)),
        R.range(0, 5)
    );
    var nested = [
        R.range(0, 5),
        R.range(5, 10)
    ];
    
    it('maps', function(){
        assert.deepEqual(R.map(inc, list), [ 1, 2, 3, 4, 5 ]);
        assert.deepEqual(R.map(inc, obj), { A: 1, B: 2, C: 3, D: 4, E: 5 });
    });
    
    it('can use key and collection', function(){
        var weirdMap = R.map(function(val, key, coll) { return val + key + coll.length; });
        assert.deepEqual(weirdMap(list), [ 5, 7, 9, 11, 13 ]);
    })
    
    it('composes consecutive transducers', function() {
        var filterMap = R.pipe(R.filter(even), R.map(inc));
        assert.deepEqual(filterMap(list), [ 1, 3, 5 ]);
        assert.deepEqual(filterMap(obj), { A: 1, C: 3, E: 5 });
    });
    
    it('composes consecutive transducers and then calls non-transducer', function() {
        assert.deepEqual(R.pipe(R.filter(even), R.map(inc), R.sum, square)(list), 81);
    });
    
    it('pipes pipe', function() {
        var even_inc = R.pipe(R.filter(even), R.map(inc));
        var divis3_square_inc = R.pipe(R.filter(divis3), R.map(square), R.map(inc));
        var pipes = R.pipe(even_inc, divis3_square_inc);
        assert.deepEqual(pipes(list), [ 10 ]);
    });
    
    it('works with nested data', function() {
        assert.deepEqual(R.map(R.pipe(R.filter(even), R.map(square)), nested), [ [ 0, 4, 16 ], [ 36, 64 ] ]);
    });
    
    it('nests and pipes', function() {
        var even_square = R.pipe(R.filter(even), R.map(square));
        var sum_too = R.pipe(even_square, R.sum);
        assert.deepEqual(R.map(sum_too, nested), [ 20, 100 ]);
    });
    
    it('terminates early if we tell it to', function() {
        var taken = R.pipe(R.filter(even), R.take(2), R.map(square));
        assert.deepEqual(taken(list), [ 0 , 4 ]);
    });
    
    it('reduces over objects', function(){
        assert.deepEqual(R.reduce(R.add, 0, obj), 10);
    });
    
    it('works with objects that support the iterator protocol', function(){
        var ilist = Immutable.List(R.range(0, 5));
        var imap = Immutable.Map(obj);
        var pipe = R.pipe(R.filter(even), R.map(inc));
        assert.deepEqual(pipe(ilist).toJS(), [ 1, 3, 5 ]);
        assert.deepEqual(pipe(imap).toJS(), { A: 1, C: 3, E: 5 });
    });
    
    it('can make our own transducers', function(){
        var doubleFn = R.makeXf({
            init:function doubleFnInit() {
                return this.xf.init();
            },
            result:function doubleFnResult(result) {
                return this.xf.result(result);
            },
            step:function doubleFnStep(result, val, key, coll) {
                return this.xf.step(result, this.f(this.f(val, key, coll), key, coll), key, coll);
            }
        });
        
        assert.deepEqual(doubleFn(square, list), [ 0, 1, 16, 81, 256 ]);
    });
    
    it('works with third party transducers', function(){
        var dropWhile = R.makeXf(thirdPartyTransducers.DropWhile);
        
        assert.deepEqual(dropWhile(function(x) { return x < 3; }, list), [ 3, 4 ]);
    });
    
    it('does not harm pipes that do not use transducers', function(){
        var obj = {
            a:'hello'
        };
        var objPipe = R.pipe(
            R.get('a'),
            R.toUpper
        );
        assert.deepEqual(objPipe(obj), 'HELLO');
    });
});
