'use stick'

class PlayControl {
    startInputNode;
    displayStatusNode;
    timerUpdateStatus;

    sliderInputNodes;

    rawDataGetter;

    performanceWin;

    feedbackCounter = 0;

    constructor(startInputNode, rawDataGetter, displayStatusNode, sliderInputNodes) {
        this.startInputNode = startInputNode;
        this.rawDataGetter = rawDataGetter;
        this.displayStatusNode = displayStatusNode;

        this.sliderInputNodes = sliderInputNodes;

        this.startInputNode.addEventListener('click', this.startPlay.bind(this));

        this.setStatus("no");
    }

    startPlay() {
        this.performanceWin = window.open('resources/html/performance-index.html', 'performancePage');

        let msg = new Message();
        msg.type = "uploadData";
        msg.data = this.rawDataGetter();


        setTimeout((() => {
            this.performanceWin.postMessage(JSON.stringify(msg), "*");

            this.setStatus("ok");
            this.timerUpdateStatus = setInterval(this.updateStatus.bind(this), 5);

        }).bind(this), 100); // important fix!!!

        // this.performanceWin.addEventListener("onload", main, { once: true }); // НЕ РАБОТАЕТ

    }

    synchronizeSpotAct() {
        let msg = new Message();
        msg.type = "updateSpot";
        msg.data = {
            "x": this.sliderInputNodes[0].calculatedResult,
            "y": this.sliderInputNodes[1].calculatedResult,
            "size": this.sliderInputNodes[2].calculatedResult,
            "op": this.sliderInputNodes[3].calculatedResult,
        };
        this.performanceWin.postMessage(JSON.stringify(msg), "*");
        // console.log(msg);
    }

    synchronizeAct() {
        let msg = new Message();
        msg.type = "start";
        this.performanceWin.postMessage(JSON.stringify(msg), "*");
    }

    updateStatus() {
        if (this.performanceWin.closed) {
            clearInterval(this.timerUpdateStatus);
            this.setStatus("no");
            return;
        }

        this.feedbackCounter++;
        // console.log(this.feedbackCounter);

        if (this.feedbackCounter > 20) {
            this.setStatus("noInfo");
        } else {
            this.setStatus("ok");
        }
    }

    setStatus(status) {
        if (status == "ok") {
            this.displayStatusNode.classList.add('good');
            this.displayStatusNode.innerHTML = '';
        } else {
            this.displayStatusNode.classList.remove('good');

        }

        if (status == "no") {
            this.displayStatusNode.classList.add('bad');
            this.displayStatusNode.innerHTML = '<div>no performance</div>';
        } else {
            this.displayStatusNode.classList.remove('bad');
        }

        if (status == "noInfo") {
            this.displayStatusNode.classList.add('noInfo');
            this.displayStatusNode.innerHTML = '<div>no feedback</div>';
        } else {
            this.displayStatusNode.classList.remove('noInfo');
        }

    }

    processFeedback(feedback) {
        this.feedbackCounter = 0;

        for (let index = 0; index < feedback.currentTimes.length; ++index) {
            document.getElementById('timeDisplay-' + index).innerHTML = feedback.currentTimes[index];
        }
    }

}
