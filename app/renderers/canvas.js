const fabric = require('fabric').fabric;

function getThumbnailId() {
  if (location.href === undefined) return;
  var tmp = location.href.split('?');
  if (tmp.length <= 1) return;
  var data = tmp[1].split('=');
  id = data[1];
  getImageCanvas(id);
}

function getImageCanvas(thumbnailId) {
  var filePath = remote.getGlobal('projectManager').dataPaths[thumbnailId];
  img = new Image();
  drawImageOnCanvas(filePath);
}

$(document).ready(getThumbnailId);

function drawImageOnCanvas(filePath) {
  var imgURL = filePath;
  var canvas = new fabric.Canvas('img-canvas');
  var image = new Image();

  var w = $('#tab-image').width();
  var h = $('#tab-image').height();
  canvas.setWidth(w);
  canvas.setHeight(h);

  image.onload = function (img) {
    var fabricImg = new fabric.Image(image);
    fabricImg.scaleToWidth(w, false);
    canvas.setBackgroundImage(fabricImg, canvas.renderAll.bind(canvas));
  };
  image.src = imgURL;

  canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.shiftKey) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  });
  canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
      var e = opt.e;
      var vpt = this.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });
  canvas.on('mouse:up', function (opt) {
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
  });

  $(window).resize(() => {
    w = $('#tab-image').width();
    h = $('#tab-image').height();
    canvas.setWidth(w);
    canvas.setHeight(h);
    $('.canvas-container').width = w;
    $('.canvas-container').height = h;
    canvas.renderAll();
    canvas.calcOffset();
  });
}