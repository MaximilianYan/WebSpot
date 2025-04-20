function rangeSlider2Main() {
    let rangeSliders = [
        document.getElementById("rs-range-x"),
        document.getElementById("rs-range-y"),
        document.getElementById("rs-range-size"),
    ];
    let rangeBullets = [
        document.getElementById("rs-bullet-x"),
        document.getElementById("rs-bullet-y"),
        document.getElementById("rs-bullet-size"),
    ];


    function calculateValue(x) {
        // return Math.pow(4.773 * 100000, Math.sign(x - 0.5) * Math.pow(Math.abs(x - 0.5), 2.50558));
        return 2*x;
    }

    // function setSpeedNormal() {
    //     rangeSlider.classList.add('rs-input-normal');
    //     rangeBullet.classList.add('rs-input-normal');
    //     rangeSlider.classList.remove('rs-input-fast');
    //     rangeBullet.classList.remove('rs-input-fast');
    //     rangeSlider.classList.remove('rs-input-slow');
    //     rangeBullet.classList.remove('rs-input-slow');
    // }
    // function setSpeedFast() {
    //     rangeSlider.classList.remove('rs-input-normal');
    //     rangeBullet.classList.remove('rs-input-normal');
    //     rangeSlider.classList.add('rs-input-fast');
    //     rangeBullet.classList.add('rs-input-fast');
    //     rangeSlider.classList.remove('rs-input-slow');
    //     rangeBullet.classList.remove('rs-input-slow');
    // }
    // function setSpeedSlow() {
    //     rangeSlider.classList.remove('rs-input-normal');
    //     rangeBullet.classList.remove('rs-input-normal');
    //     rangeSlider.classList.remove('rs-input-fast');
    //     rangeBullet.classList.remove('rs-input-fast');
    //     rangeSlider.classList.add('rs-input-slow');
    //     rangeBullet.classList.add('rs-input-slow');
    // }

    function updateSliderValue() {
        let i = this;
        var bulletPart = (+rangeSliders[i].value / +rangeSliders[i].max);
        rangeSliders[i].calculatedResult = +calculateValue(bulletPart).toFixed(3);
        rangeBullets[i].innerHTML = "x" + rangeSliders[i].calculatedResult;
        rangeBullets[i].style.left = +rangeSliders[i].offsetLeft + 11 + (bulletPart * (rangeSliders[i].offsetWidth - 22)) + "px";

        // if (+rangeSlider.calculatedResult == 1) {
        //     setSpeedNormal();
        // }
        // if (+rangeSlider.calculatedResult > 1) {
        //     setSpeedFast();
        // }
        // if (+rangeSlider.calculatedResult < 1) {
        //     setSpeedSlow();
        // }
    }

    for (let i = 0; i < rangeSliders.length; i++) {
        rangeSliders[i].addEventListener("input", updateSliderValue.bind(i), false);
        window.addEventListener("DOMContentLoaded", updateSliderValue.bind(i), "once");
    }
}

rangeSlider2Main();
