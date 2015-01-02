/* global document */

function toArray(xs) {
    return Array.prototype.slice.call(xs);
}

function filterToc() {
    var f = filterElement.bind(null, nameFilter.value, '');
    funcs.forEach(f);
}

function filterElement(nameFilter, categoryFilter, elem) {
    var name = elem.getAttribute('data-name');
    var category = elem.getAttribute('data-category');
    var matches = strIn(nameFilter, name) || category === categoryFilter;
    elem.style.display = matches ? '' : 'none';
}

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
    var sel = elem.getAttribute('data-collapser');
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

var nameFilter = document.getElementById('name-filter');
var funcs = toArray(document.querySelectorAll('.toc .func'));

document.body.addEventListener('click', dispatchEvent, false);
nameFilter.addEventListener('input', filterToc, false);
