"use strict";

function togglePages(photoId) {
  var elMain = document.querySelector("main");
  var elEditor = document.querySelector("editor");
  elMain.classList.toggle("hidden");
  elEditor.classList.toggle("hidden");
  if (photoId !== undefined) {
    setCurrMeme(photoId);
    renderEditingCanvas(photoId);
  } else {
    document.querySelector(".text-insertion").value = "";
    clearMeme();
  }
}

function renderGallery() {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForRendering();
}

// ****************************** RENDER TEXT ************
function renderText() {
  var elCanvas = document.querySelector("#canvas");
  var ctx = elCanvas.getContext("2d");

  var currMeme = getCurrMeme();
  for (let i = 0; i < currMeme.txts.length; i++) {
    var txt = currMeme.txts[i];
    ctx.font = txt.fontSize + "px " + txt.fontFamily;
    var posHor = txt.posHor * elCanvas.width;
    if (txt.shadow === "yes") {
      ctx.fillStyle = "black";
      ctx.fillText(txt.content, posHor + 3, elCanvas.height * txt.posVert + 3);
    }
    ctx.fillStyle = txt.color;
    ctx.fillText(txt.content, posHor, elCanvas.height * txt.posVert);
  }
}

function renderEditingCanvas(id) {
  document.querySelector(".text-insertion").focus();
  var img = new Image();
  img.src = getImageById(id).url;
  var elCanvas = document.querySelector("#canvas");
  var elCanvasContainer = document.querySelector(".canvas-container");
  var ctx = elCanvas.getContext("2d");

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

function onTextInsertion() {
  var currMeme = getCurrMeme();
  var inputTxt = document.querySelector(".text-insertion");
  currMeme.txts[currMeme.selectedLineIdx].content = inputTxt.value;
  renderEditingCanvas(currMeme.selectedImgId);
  return;
}

function onButtonA() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].shadow === "no") {
    currMeme.txts[currMeme.selectedLineIdx].shadow = "yes";
  } else {
    currMeme.txts[currMeme.selectedLineIdx].shadow = "no";
  }
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonAdd() {
  var currMeme = getCurrMeme();
  addLine();
  document.querySelector(".text-insertion").value = '';
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonPlus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize < 90) currMeme.txts[currMeme.selectedLineIdx].fontSize *= 1.1;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonMinus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize > 9) currMeme.txts[currMeme.selectedLineIdx].fontSize /= 1.1;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onColorChange(val) {
  var currMeme = getCurrMeme();
  currMeme.txts[currMeme.selectedLineIdx].color = val;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonLeft() {
  var currMeme = getCurrMeme();
  var posHor = currMeme.txts[currMeme.selectedLineIdx].posHor - 0.08;
  if (posHor < 0.01) posHor = 0.01;
  currMeme.txts[currMeme.selectedLineIdx].posHor = posHor;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonRight() {
  var currMeme = getCurrMeme();
  var posHor = currMeme.txts[currMeme.selectedLineIdx].posHor + 0.08;
  if (posHor > 0.9) posHor = 0.9;
  currMeme.txts[currMeme.selectedLineIdx].posHor = posHor;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonDown() {
  var currMeme = getCurrMeme();
  var posVert = currMeme.txts[currMeme.selectedLineIdx].posVert + 0.05;
  if (posVert > 1) posVert = 1;
  currMeme.txts[currMeme.selectedLineIdx].posVert = posVert;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonUp() {
  var currMeme = getCurrMeme();
  var posVert = currMeme.txts[currMeme.selectedLineIdx].posVert - 0.05;
  if (posVert < 0.05) posVert = 0.05;
  currMeme.txts[currMeme.selectedLineIdx].posVert = posVert;
  renderEditingCanvas(currMeme.selectedImgId);
}
