console.time('load');
var root = {};
root.filter = ko.observable('');
root.docs = ko.observableArray();
root.filteredDocs = ko.computed(function() {
    return root.docs().filter(function(d) {
        var filter = root.filter().toLowerCase();
        return d.name.toLowerCase().indexOf(filter) >= 0 ||
            d.category.toLowerCase() === filter;
    });
});

function start(data) {
    root.docs(data);
    ko.applyBindings(root);
    console.timeEnd('load');
}

$.getJSON('data.json').then(start);
