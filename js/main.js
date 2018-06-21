"use strict";

function togglePages(photoId) {
  var elMain = document.querySelector("main");
  var elEditor = document.querySelector("editor");
  elMain.classList.toggle("hidden");
  elEditor.classList.toggle("hidden");
  if (photoId !== undefined) renderEditingCanvas(photoId);
}

function renderGallery() {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForRendering();
}

function renderText() {
  var elCanvas = document.querySelector("#canvas");
  var ctx = elCanvas.getContext("2d");

  var currMeme = getCurrMeme();
  for (let i = 0; i < currMeme.txts.length; i++) {
    var txt = currMeme.txts[i];
    ctx.font = txt.fontSize + "px " + txt.fontFamily;
    ctx.textAlign = txt.alignHor;
    ctx.fillStyle = "black";
    ctx.fillText(
      txt.line,
      elCanvas.width / 2 + 3,
      elCanvas.height * txt.posVert + 3
    );
    ctx.fillStyle = txt.color;
    ctx.fillText(txt.line, elCanvas.width / 2, elCanvas.height * txt.posVert);
  }
}

function renderEditingCanvas(id) {
  var img = new Image();
  img.src = getImageById(id).url;
  var elCanvas = document.querySelector("#canvas");
  var elCanvasContainer = document.querySelector(".canvas-container");
  var ctx = elCanvas.getContext("2d");
  var elEditor = document.querySelector(".editor.flex");
  // elEditor.style.height = '100vh';
  // var h = elEditor.height - 63;
  // elEditor.style.height = h + 'px';

  img.onload = function() {
    var aspect = img.width / img.height;
    elCanvas.width = elCanvasContainer.clientWidth;
    elCanvas.height = elCanvas.width / aspect;
    elCanvasContainer.height = elCanvas.height + 4;
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    renderText();
  };
}

function toggleMenu(ev) {
  ev.stopPropagation();
  var elMenu = document.querySelector(".menu");
  elMenu.classList.toggle("hidden");
}

function renderByTag(elText) {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForSorting(elText.value);
}
