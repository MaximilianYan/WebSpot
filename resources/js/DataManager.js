'use stick'

class DataManager {

    fileInputNode;
    filesListNode;

    arias = new Array();
    rawData = new Array();

    constructor(fileInputNode, filesListNode) {
        this.fileInputNode = fileInputNode;
        this.filesListNode = filesListNode;

        this.fileInputNode.addEventListener('input', this.readData.bind(this));
    }

    readData() {
        while (this.filesListNode.firstChild != null) {
            this.filesListNode.firstChild.remove();
        }

        this.rawData = [];

        for (let file of this.fileInputNode.files) {
            this.filesListNode.insertAdjacentHTML('beforeend',
                '<li>' +

                '<div class="timeDisplay" id=timeDisplay-' + this.rawData.length + '>' +
                '000.0' +
                '</div>' +

                file.name +
                '</li>'
            );

            this.rawData.push(new RawData(file.name, "потом"))
        }

        let readFilePromises = new Array();

        let index = 0;
        for (let file of this.fileInputNode.files) {
            readFilePromises.push(this.readFile(file, index));
            index++;
        }

        Promise.all(readFilePromises).then(
            ((result) => { this.arias = result; }).bind(this),
            (error) => { alert("error: in readFile " + error); }
        );

    }

    async readFile(file, index) {
        let fileReader = new FileReader();
        let fileContent = await (
            new Promise(function (resolve, reject) {
                fileReader.onerror = function () { alert('"file.name: "' + file.name); reject(fileReader.error); };
                fileReader.onload = function () { resolve(fileReader.result); };

                fileReader.readAsText(file);
                // }.bind(this)));
            }));


        fileReader.onerror = undefined;
        fileReader.onload = undefined;

        // в fileContent большая строка
        this.rawData[index].data = fileContent;
        // alert("index: " + index);

        return new AriaContent(fileContent);
    }

    getRawData() {
        return this.rawData;
    }
}
