'use stick'

class Controller {
    controlFormID;
    fileInputID;
    startInputID;
    filesListID;
    displayStatusID;

    dataManager;
    playControl;


    constructor(controlFormID, fileInputID, startInputID, filesListID, displayStatusID, sliderInputIDs) {
        this.controlFormID = controlFormID;
        this.fileInputID = fileInputID;
        this.startInputID = startInputID;
        this.filesListID = filesListID;
        this.displayStatusID = displayStatusID;

        this.dataManager = new DataManager(
            document.forms[this.controlFormID].elements[this.fileInputID],
            document.getElementById(this.filesListID),
        );

        this.playControl = new PlayControl(
            document.forms[this.controlFormID].elements[this.startInputID],
            this.dataManager.getRawData.bind(this.dataManager),
            document.getElementById(this.displayStatusID),
            sliderInputIDs.map(id => document.getElementById(id)),
        );

        sliderInputIDs.map(id => document.getElementById(id).addEventListener('input', this.playControl.synchronizeSpotAct.bind(this.playControl)));
        // window.addEventListener('keydown', this.playControl.synchronizeAct.bind(this.playControl));

    }

    processFeedback(feedback) {
        this.playControl.processFeedback(feedback);
    }
}
