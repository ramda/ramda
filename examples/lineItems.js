var R = require('..');

// ============================================================================
// First, some setup:
// ============================================================================

var prices = {
    'rubber ball': 1.00,
    doll: 3.50,
    tiddlywinks: 0.25,
    'chess board': 2.75,
    jumprope: 1.00
};

var stock = {
    'rubber ball': 4,
    doll: 27,
    tiddlywinks: 0,
    'chess board': 5,
    jumprope: 7
};

// ============================================================================
// Then our test data:
// ============================================================================

var order = [
    {item: 'rubber ball', qty: 3},
    {item: 'jumprope', qty: 8},
    {item: 'doll', qty: 5},
    {item: 'tiddlywinks', qty: 12},
    {item: 'slinky', qty: 3}
];

// ============================================================================
// Two helper functions:
// ============================================================================

var checkLine = function(line) {
    return (line.item in prices) && (line.item in stock) && stock[line.item] >= line.qty;
};

var buildLineItem = function(line) {
    return {item: line.item, price: prices[line.item], qty: line.qty, cost: line.qty * prices[line.item]};
};


// ============================================================================
// The required output:
// ============================================================================

//  {
//      lineItems: [
//          {
//              item: "rubber ball",
//              price: 1.00,
//              qty: 3,
//              cost: 3.00
//          },
//          {
//              item: "doll",
//              price: 3.50,
//              qty: 5,
//              cost: 17.50
//          }
//      ],
//      total: 20.50
//  }

// (Note that items are only selected if there is enough inventory to fill the
// entire request, and if we have both stock and price entries for the item.
// [So no slinky.])


// ============================================================================
// And a naive version of the code:
// ============================================================================

var processOrder1 = function(order) {
    var lineItems = [], line, price, item, qty, idx, len, cost;
    var total = 0;
    for (idx = 0, len = order.length; idx < len; idx++) {
        line = order[idx];
        item = line.item;
        qty = line.qty;
        if (checkLine(line)) {
            lineItems.push(buildLineItem(line));
            price = prices[item];
            cost = qty * price;
            total += cost;
        }
    }
    return {
        lineItems: lineItems,
        total: total
    };
};

processOrder1(order);

// ============================================================================
// Certainly this code might be tightened up.  But here it is with eweda:
// ============================================================================

var processOrder2 = function(order) {
    var lineItems = R.map(buildLineItem, R.filter(checkLine, order));
    return {
        lineItems: lineItems,
        total: R.reduce(R.sum, 0, R.map(R.prop('cost'), lineItems))
    };
};

processOrder2(order);
