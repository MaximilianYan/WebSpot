'use stick'

class PlayAgent {
    arias = new Array();
    ariaNum = -1;

    spotNode;

    timerUpdateFrame;

    spotTrapRatio = 2;

    constructor() {
        this.spotNode = document.getElementById("spot");

        this.spotNode.normalSize = parseFloat(window.getComputedStyle(this.spotNode).height) / window.innerHeight * 100;

        this.spotNode.windowInnerRatio = window.innerHeight / window.innerWidth;
        window.addEventListener("resize", () => {
            this.spotNode.windowInnerRatio = window.innerHeight / window.innerWidth;
        });
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
        let trapMul = 1 + data.y / 2 * (this.spotTrapRatio - 1);

        this.spotNode.style.height = this.spotNode.normalSize * data.size * trapMul + "%";
        this.spotNode.style.top = (data.y / 2) * (100 - parseFloat(this.spotNode.style.height)) + "%";
        this.spotNode.style.left = (data.x / 2) * (100 - parseFloat(this.spotNode.style.height) * this.spotNode.windowInnerRatio) + "%";
        this.spotNode.style.opacity = data.op / 2;

        // console.log("h: " + window.getComputedStyle(this.spotNode).height + " w:" + this.spotNode.style.width);
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
