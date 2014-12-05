var assert = require('assert');

var R = require('..');


describe('construct', function() {
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('turns a constructor function into one that can be called without `new`', function() {
        var rect = R.construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word', 'gi');
        assert(word instanceof RegExp);
        assert.strictEqual(word.source, 'word');
        assert.strictEqual(word.global, true);
    });

    it('returns a curried function', function() {
        var rect = R.construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.height, 4);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word');
        var complete = word('gi');
        assert(complete instanceof RegExp);
        assert.strictEqual(complete.source, 'word');
        assert.strictEqual(complete.global, true);
    });
});
