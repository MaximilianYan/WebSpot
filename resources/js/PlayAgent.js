'use stick'

class PlayAgent {
    arias = new Array();
    ariaNum = -1;

    spotNode;

    timerUpdateFrame;


    constructor() {
        this.spotNode = document.getElementById("spot");
    }

    startPlay(data) {
        this.arias = [];

        for (let rawData of data) {
            // alert(rawData.data);
            this.arias.push(new AriaContent(rawData.data, true, rawData.name));

        }

        // alert(this.arias.length);

    }

    synchronizeAct() {
        this.timerUpdateFrame = setInterval(this.updateFrame.bind(this), 5);
        this.ariaNum++;
        this.arias[this.ariaNum].start();
    }

    synchronizeSpotAct(data) {
        let normalSize = 40;

        this.spotNode.style.height = normalSize * data.size + "%";
        this.spotNode.style.marginTop = (100) / 2 * data.y + "%";
        this.spotNode.style.marginLeft = (50) * (data.x - 1) - normalSize * data.size / 2 + "%";
    }


    updateFrame() {
        let msg = new Message();
        msg.type = "feedback";
        msg.data = new FeedbackData();

        // this.arias.at(-1).updateFrame();
        for (let ariaI = 0; ariaI <= this.ariaNum; ++ariaI) {
            this.arias[ariaI].updateFrame();
            msg.data.currentTimes.push(this.arias[ariaI].getFeedback());
        }

        window.opener.postMessage(JSON.stringify(msg), "*");
    }

}
