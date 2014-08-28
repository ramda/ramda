var assert = require('assert');
var R = require('../../..');
var Random = require('../random');

describe('Random', function() {
    it('is a function', function()  {
        assert.equal(typeof Random, 'function');
    });

    it('returns a function', function() {
        assert.equal(typeof Random(), 'function');
    });

    it('returns consistent results for the same seeds', function() {
        var random = new Random('my', 3, 'seeds');
        assert.equal(random(), 0.30802189325913787);
        assert.equal(random(), 0.5190450621303171);
        assert.equal(random(), 0.43635262292809784);
    });

    it('but returns entirely different results for even slightly different seeds', function() {
        var random = new Random('my', 3, 'weeds');
        assert.equal(random(),  0.7021001486573368);
        assert.equal(random(), 0.6134823360480368);
        assert.equal(random(), 0.6507473199162632);
    });
});

describe('shuffle', function() {
    var random;

    beforeEach(function() {
        random = Random('my', 3, 'seeds');
    });

    it('returns a shuffled copy of a list', function() {
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        assert.deepEqual(R.shuffle(random, list), [6, 3, 4, 8, 5, 1, 7, 10, 2, 9]);
    });

});
