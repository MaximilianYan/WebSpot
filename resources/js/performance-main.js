'use stick'

let playAgent = new PlayAgent();


function main() {

    window.addEventListener("message", function (event) {
        let msg = JSON.parse(event.data);

        // console.log(event.source);
        // this.alert(event.data);
        if (msg.type == "start") {

            playAgent.synchronizeAct();
            return;
        }

        if (msg.type == "uploadData") {

            console.log("Important! Check that this message is visible in console or increase delay in PlayControl!");

            playAgent.startPlay(msg.data);

            console.log("вот: " + playAgent.arias.length);

            return;
        }

        if (msg.type == "updateSpot") {
            playAgent.synchronizeSpotAct(msg.data);
            return;
        }
    });

    console.log("main done");
}


document.addEventListener("DOMContentLoaded", main, { once: true });
// main();
