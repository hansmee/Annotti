const {file, label, projectManager} = require("./base-classes.js")

class detectionFileInfo extends file{
    constructor(path){
        super(path)
        //this.checked = false

        this.image = new Image()
        this.image.src = path
        
        this.w = null
        this.h = null
        this.tabShow = false
        this.tabIndex = -1
        this.edit = false

        this.labels = new Array()
    }

    append_label(label){
        this.labels.push(label)
    }
}

class detectionLabel extends label{
    constructor(name, color, hotKey){
        super(name, color, hotKey)
        this.blink = false
        this.box = new Array()
    }

    append_odBox(x1, y1, x2, y2){
        this.box.push(detectionBox(x1, y1, x2, y2))
    }
}

class detectionBox{
    constructor(x1, y1, x2, y2){
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }
}

class detectionLabelForSearch extends label{
    constructor(name, color, hotKey){
        super(name, color, hotKey)
    }
}

class detectionProjectManager extends projectManager{
    constructor(){
        super("OD")
        this.odLabels = new Array()
        this.odFileInfos = new Array()
    }

    append_odLabel(path, label){
        //this.odFileInfos[this.odFileInfos.indexOf(path)].labels.push(label)
        this.odLabels.push(label)
    }
}

module.exports = { detectionFileInfo, detectionLabel, detectionProjectManager }
