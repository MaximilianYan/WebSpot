'use stick'

function main() {
    let timerUpdateFrame;

    // function updateFrame() {
    // }

    function processKeydown(event) {
        // verses.at(-1).activate();
        // alert(event);
        // window.open('index.html')
    }


    // timerUpdateFrame = setInterval(updateFrame, 5);
    window.addEventListener('keydown', processKeydown);

    let controller = new Controller('controlForm', 'fileInput', 'startInput', 'filesList', 'displayStatus');

    // window.addEventListener("beforeunload", function () {
    //     return false;
    // });
    window.onbeforeunload = function () {
        return false;
    };


    window.addEventListener("message", function (event) {
        let msg = JSON.parse(event.data);

        if (msg.type == "feedback") {
            // console.log(msg.data);
            controller.processFeedback(msg.data);
        }
    });
}



main();
