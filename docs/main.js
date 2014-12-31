ko.bindingHandlers.markdown = {
    update: function(elem, get) {
        $(elem).html(marked(get()));
    }
};

ko.bindingHandlers.code = {
    update: function(elem, get) {
        $(elem).text(get());
        hljs.highlightBlock(elem);
    }
};

ko.bindingHandlers.signature = {
    update: function(elem, get) {
        $(elem).text(get().replace(/->/g, '\u2192'));
    }
};

var root = {};
root.version = '0.8.0';
root.filter = ko.observable('');
root.docs = ko.observableArray();
root.filteredDocs = ko.computed(function() {
    return root.docs().filter(function(d) {
        return d.name.indexOf(root.filter()) >= 0;
    });
});

function start(data) {
    root.docs(data);
    ko.applyBindings(root);
}

$.getJSON('data.json').then(start);
