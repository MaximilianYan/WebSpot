function rangeSliderMain() {
    let rangeSlider = document.getElementById("rs-range-line");
    let rangeBullet = document.getElementById("rs-bullet");


    function calculateValue(x) {
        return Math.pow(4.773 * 100000, Math.sign(x - 0.5) * Math.pow(Math.abs(x - 0.5), 2.50558));
    }

    function setSpeedNormal() {
        rangeSlider.classList.add('rs-input-normal');
        rangeBullet.classList.add('rs-input-normal');
        rangeSlider.classList.remove('rs-input-fast');
        rangeBullet.classList.remove('rs-input-fast');
        rangeSlider.classList.remove('rs-input-slow');
        rangeBullet.classList.remove('rs-input-slow');
    }
    function setSpeedFast() {
        rangeSlider.classList.remove('rs-input-normal');
        rangeBullet.classList.remove('rs-input-normal');
        rangeSlider.classList.add('rs-input-fast');
        rangeBullet.classList.add('rs-input-fast');
        rangeSlider.classList.remove('rs-input-slow');
        rangeBullet.classList.remove('rs-input-slow');
    }
    function setSpeedSlow() {
        rangeSlider.classList.remove('rs-input-normal');
        rangeBullet.classList.remove('rs-input-normal');
        rangeSlider.classList.remove('rs-input-fast');
        rangeBullet.classList.remove('rs-input-fast');
        rangeSlider.classList.add('rs-input-slow');
        rangeBullet.classList.add('rs-input-slow');
    }

    function updateSliderValue() {
        var bulletPart = (+rangeSlider.value / +rangeSlider.max);
        rangeSlider.calculatedResult = +calculateValue(bulletPart).toFixed(3);
        rangeBullet.innerHTML = "x" + rangeSlider.calculatedResult;
        rangeBullet.style.left = +rangeSlider.offsetLeft + 11 + (bulletPart * (rangeSlider.offsetWidth - 22)) + "px";

        if (+rangeSlider.calculatedResult == 1) {
            setSpeedNormal();
        }
        if (+rangeSlider.calculatedResult > 1) {
            setSpeedFast();
        }
        if (+rangeSlider.calculatedResult < 1) {
            setSpeedSlow();
        }
    }

    rangeSlider.addEventListener("input", updateSliderValue, false);
    window.addEventListener("DOMContentLoaded", updateSliderValue, "once");
}

rangeSliderMain();
