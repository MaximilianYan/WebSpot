'use stick'

for (let button of document.forms['controlForm'].elements) {
    // for (let button of document.getElementById('controlForm').children) {
    let spanNode = button.nextElementSibling;

    button.addEventListener('click', (e) => {
        button.blur();
        spanNode.classList.remove('hoveredButton');
    });

    button.addEventListener('focus', (e) => {
        spanNode.classList.add('focusedButton');
    });

    button.addEventListener('blur', (e) => {
        spanNode.classList.remove('focusedButton');
    });

    spanNode.addEventListener('mouseenter', (e) => {
        spanNode.classList.add('hoveredButton');
    });

    spanNode.addEventListener('mouseout', (e) => {
        spanNode.classList.remove('hoveredButton');
    });
}

