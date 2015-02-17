/* global document */

function toArray(xs) {
    return Array.prototype.slice.call(xs);
}

function filterTocType(category) {
    nameFilter.value = category;
    filterToc();
}

function filterToc() {
    var f = filterElement.bind(null, nameFilter.value);
    funcs.forEach(f);
}

function filterElement(nameFilter, elem) {
    var name = elem.getAttribute('data-name');
    var category = elem.getAttribute('data-category');
    var matches = strIn(nameFilter, name) || strIn(nameFilter, category);
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

function tryToggleCollapse(elem) {
    var sel = elem && elem.getAttribute('data-collapser');
    if (!sel) { return; }
    elem
        .classList
        .toggle('open');
    document
        .querySelector(sel)
        .classList
        .toggle('in');
}

function isTopLink(elem) {
    return elem.getAttribute('href') === '#';
}

function dispatchEvent(event) {
    var target = event.target;
    var parent = target.parentNode;
    var category = target.getAttribute('data-category');
    if (category) {
        filterTocType(category);
    }
    if (isTopLink(target)) {
        scrollToTop(target);
    } else {
        tryToggleCollapse(target);
        tryToggleCollapse(parent);
    }
}

var nameFilter = document.getElementById('name-filter');
var funcs = toArray(document.querySelectorAll('.toc .func'));
filterToc();

document.body.addEventListener('click', dispatchEvent, false);
nameFilter.addEventListener('input', filterToc, false);
