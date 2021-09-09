import { fold } from './fold.js'

// addWithMaxOf10 function in functional program
const loop = (acc,seed) => {
    if (seed.length > 0) {
        let nextAcc = acc + seed[0]
        let nextSeed = seed.slice(1)
        return nextAcc > 10 ?
            acc                       // * difference with iterator.
            : loop(nextAcc, nextSeed) // *
    }
    return null
}

describe('fold', function () {
    let source = [1, 2, 3, 4, 5, 6, 7]

    it('before last', function () {
        var addWithMaxOf10 = function (acc, seed) {
            if (seed.length > 0) {
                let nextAcc = acc + seed[0]
                let nextSeed = seed.slice(1)
                return nextAcc > 10 ?
                    [] // last acc is `acc` to return caller
                    : [nextAcc, nextSeed]
            }
            return null
        };

        let y = fold(addWithMaxOf10, 0, source)
        expect(y).toEqual(10)
    });

    it('include last', function () {
        var addWithMaxOf10 = function (acc, seed) {
            if (seed.length > 0) {
                let nextAcc = acc + seed[0]
                let nextSeed = seed.slice(1)
                return nextAcc > 10 ? 
                [nextAcc] // last acc is `nextAcc` to return caller
                : [nextAcc, nextSeed]
            }
            return null
        };

        let y = fold(addWithMaxOf10, 0, source)
        expect(y).toEqual(15)

    });

});
