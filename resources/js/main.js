'use stick'

function main() {
    let timerUpdateFrame;

    let controller = new Controller('controlForm', 'fileInput', 'startInput', 'filesList', 'displayStatus', ['rs-range-x', 'rs-range-y', 'rs-range-size', 'rs-range-op']);

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
