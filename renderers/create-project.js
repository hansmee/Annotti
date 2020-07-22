// Create project

let $ = require('jquery')
const {remote, ipcRenderer} = require('electron')
const { alertError } = require('../commons/utils.js')

//let workingDirectory =  ["/Users/yeon/Downloads/bwh", "/Users/yeon/Downloads/modify_bwh_w"]
//let workingDirectory =  ["/Users/hansangmee/Desktop/AnnottiTestData", "/Users/hansangmee/Desktop/AnnottiTestData"]
let workingDirectory = ["C:\\Users\\user\\Desktop\\배경화면\\bts", "C:\\Users\\user\\Desktop\\배경화면\\bts"]

// Click select directory button
$('#select-dir').on('click', () => {
  workingDirectory = ipcRenderer.sendSync('selectDir')
  if(workingDirectory!="None")
    $('#selected-dirs').text(workingDirectory)
});

// Click create project button
$('#create-project').on('click', () => {
  let taskId = $('#select-task option:selected').val()
  if(taskId=="None"&&workingDirectory=="None")
    alertError('Task and directory not selected error', 'Select task and at least one working directory')
  else if(workingDirectory=="None")
    alertError('Directory not selected error', 'Select at least one working directory')
  else if(taskId=="None")
    alertError('Task not selected error', 'Select task')
  else{
    ipcRenderer.sendSync('setProjectManager', taskId)
    remote.getGlobal('projectManager').setWorkingDirectory(workingDirectory)
    if(taskId == 0) remote.getCurrentWindow().loadURL(`file://${__dirname}/../templates/default.html`)
    else remote.getCurrentWindow().loadURL(`file://${__dirname}/../templates/tab-default.html`)
  }
}) 