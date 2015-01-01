var root = {};
root.filter = ko.observable('');
root.docs = this.DOC_DATA || {};
root.filteredDocs = ko.computed(function() {
    return root.docs.filter(function(d) {
        return strIn(root.filter(), d.name);
    });
});

function strIn(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return b.indexOf(a) >= 0;
}

ko.applyBindings(root);
