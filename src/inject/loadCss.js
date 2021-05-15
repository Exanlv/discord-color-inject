var element = document.getElementById('exan');

if (!element) {
    element = document.createElement('style');
    element.id = "exan";
    document.head.appendChild(element);
}

element.innerHTML = css;
