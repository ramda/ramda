(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root);} else if (typeof define === 'function' && define.amd) {define(factory);} else {root.farm = factory(root);}}(this, function (global) {
    return {
        horses: [
            {name: 'Dakota', paddock: 'Bad Boys'},
            {name: 'Sandy', paddock: 'Up Top'},
            {name: 'Halley', paddock: 'Bad Boys'},
            {name: 'Aladdin', paddock: 'Up Top'},
            {name: 'Toby', paddock: 'Down Low'},
            {name: 'Obie', paddock: 'Big Boys'},
            {name: 'Pumpkin', paddock: 'Down Low'},
            {name: 'Tyler', paddock: 'Down Low'},
            {name: 'Jem', paddock: 'Isolation'},
            {name: 'Lucy', paddock: 'Down Low'},
            {name: 'Kirby', paddock: 'Big Boys'},
            {name: 'Zippy', paddock: 'Bad Boys'},
            {name: 'Indy', paddock: 'Up Top'},
            {name: 'Levi', paddock: 'Bad Boys'},
            {name: 'Mac', paddock: 'Big Boys'},
            {name: 'Bob', paddock: 'Big Boys'},
            {name: 'Batman', paddock: 'Bad Boys'}
        ],
        paddocks: [
            {name: 'Bad Boys', acres: 2, capacity: 9, fence: 'portable metal', electrified: false},
            {name: 'Up Top', acres:.5, capacity: 3, fence: 'vinyl tape', electrified: true},
            {name: 'Down Low', acres: 1, capacity: 5, fence: 'wood', electrified: true},
            {name: 'Big Boys', acres: 1.5, capacity: 7, fence: 'vinyl tape', electrified: true},
            {name: 'Isolation', acres: .1, capacity: 1, fence: 'wood', electrified: true},
            {name: 'Kennel', acres: .75, capacity: 4, fence: 'wood', electrified: false},
            {name: 'Front Ring', acres:.5, capacity: 3, fence: 'wood', electrified: false}
        ]
    };
}));
