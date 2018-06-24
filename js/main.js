"use strict";

createEditableSelect(document.forms[0].myText);
var gIsMarked = false;
var gTimeout;
var gMarkInterval;

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
  setkeyWordsMap();
  var keywords = getPopularKeyWordlist();
  var elKeywords = document.querySelector('.tags');
  elKeywords.innerHTML = setKeyWordsForRendering(keywords)

}

// ****************************** RENDER TEXT ************
function renderText() {
  var elCanvas = document.querySelector("#canvas");
  var ctx = elCanvas.getContext("2d");
  ctx.textAlign = "center";
  var currMeme = getCurrMeme();
  for (let i = 0; i < currMeme.txts.length; i++) {
    var txt = currMeme.txts[i];
    var posHor = txt.posHor * elCanvas.width;
    // render black shadow under the text
    ctx.font = txt.fontSize + "px " + txt.fontFamily;
    if (txt.shadow === "yes") {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillText(txt.content, posHor + 3, elCanvas.height * txt.posVert + 3);
    }
    // render colored text, mark it using "difference" if it was clicked with mouse
    ctx.fillStyle = txt.color;
    if (gIsMarked && currMeme.selectedLineIdx === txt.lineIdx)
      ctx.globalCompositeOperation = "difference";
    else ctx.globalCompositeOperation = "source-over";
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

  img.onload = function () {
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
  var elButton = document.querySelector(".menu-toggle");
  elMenu.classList.toggle("menu-hidden");
  elButton.classList.toggle("hidden");
}

function renderByTag(elText) {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForSorting(elText.value);
}

function filterBy(elListItem) {
  elListItem.value++
  let searchAmount = elListItem.value;
  let size;
  if (searchAmount >= 1 && searchAmount < 5) size = "large";
  else if (searchAmount >= 5 && searchAmount < 10) size = "x-large";
  else size = "xx-large";
  elListItem.style.fontSize = size;
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForSorting(elListItem.innerText);
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
  document.querySelector(".text-insertion").value = "";
  renderEditingCanvas(currMeme.selectedImgId);
  return;
}

function downloadMeme() {
  window.open(canvas.toDataURL("image/png"));
  var imageData = canvas.toDataURL("png");
  var link = document.createElement("a");
  link.href = imageData;
  link.download = "image.png";
  link.click();
}

function onCanvasClicked(ev) {
  var canvasHeight = document.querySelector("#canvas").height;
  var posVert = ev.offsetY / canvasHeight;
  var currMeme = getCurrMeme();
  for (let i = 0; i < currMeme.txts.length; i++) {
    var currLine = currMeme.txts[i];
    if (
      currLine.posVert - posVert < currLine.fontSize / canvasHeight &&
      currLine.posVert - posVert > 0
    ) {
      currMeme.selectedLineIdx = currLine.lineIdx;
      document.querySelector(".text-insertion").value = currLine.content;
      markLine();
    }
  }
}

function markLine() {
  gIsMarked = true;
  renderEditingCanvas(getCurrMeme().selectedImgId);

  gMarkInterval = setInterval(function () {
    gIsMarked = !gIsMarked;
    renderEditingCanvas(getCurrMeme().selectedImgId);
  }, 70);

  gTimeout = setTimeout(function () {
    clearInterval(gMarkInterval);
    gIsMarked = false;
    renderEditingCanvas(getCurrMeme().selectedImgId);
    clearTimeout(gTimeout);
  }, 520);
}

function onButtonPlus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize < 90)
    currMeme.txts[currMeme.selectedLineIdx].fontSize *= 1.1;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonMinus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize > 9)
    currMeme.txts[currMeme.selectedLineIdx].fontSize /= 1.1;
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
