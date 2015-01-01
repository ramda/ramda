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

function scrollToTop() {
    var main = document.querySelector('main');
    main.scrollTop = 0;
}

function toggleCollapse(elem) {
    var sel = elem.getAttribute('data-collapser')
    document
        .querySelector(sel)
        .classList
        .toggle('in');
}

function dispatchEvent(event) {
    var target = event.target;
    if (target.tagName === 'A' && target.getAttribute('href') === '#') {
        scrollToTop(target);
    } else if (target.getAttribute('data-collapser')) {
        toggleCollapse(target);
    }
}

document.body.addEventListener('click', dispatchEvent, false);
ko.applyBindings(root);
