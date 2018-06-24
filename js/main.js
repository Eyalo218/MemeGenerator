"use strict";

// createEditableSelect(document.forms[0].myText);
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
    document.querySelector(".menu-toggle").classList.toggle('hidden');
    document.querySelector(".input-color").value = '#ffffff';
  } else {
    document.querySelector(".text-insertion").value = "";
    clearMeme();
    document.querySelector(".menu-toggle").classList.toggle('hidden');
  }
}

function renderGallery() {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForRendering();
  setkeyWordsMap();
  var keywords = getPopularKeyWordlist();
  var elKeywords = document.querySelector(".tags");
  elKeywords.innerHTML = setKeyWordsForRendering(keywords);
  var elSearchWords = document.querySelector("#search-keywords");
  elSearchWords.innerHTML = setSearchKeysForRendering();
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
    var posVert = txt.posVert * elCanvas.height;
    // render black shadow under the text
    ctx.font = txt.fontSize + "px " + txt.fontFamily;
    if (txt.shadow === "yes") {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillText(
        txt.content,
        posHor + txt.fontSize * 0.1,
        posVert + txt.fontSize * 0.12
      );
    }
    // render colored text, make it flashing if it was clicked on
    ctx.fillStyle = txt.color;
    if (gIsMarked && currMeme.selectedLineIdx === txt.lineIdx) continue;

    if (txt.stroke === "yes") {
      ctx.lineWidth = txt.fontSize * 0.06;
      ctx.strokeText(txt.content, posHor, posVert);
    }
    ctx.fillText(txt.content, posHor, posVert);
  }
}

function renderEditingCanvas(id) {
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
  var elButton = document.querySelector(".menu-toggle");
  elMenu.classList.toggle("menu-hidden");
  elButton.classList.toggle("hidden");
}

function renderByTag(elText) {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForSorting(elText.value);
}

function filterBy(elListItem) {
  elListItem.value++;
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

function onButtonShadow() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].shadow === "no") {
    currMeme.txts[currMeme.selectedLineIdx].shadow = "yes";
  } else {
    currMeme.txts[currMeme.selectedLineIdx].shadow = "no";
  }
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonStroke() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].stroke === "no") {
    currMeme.txts[currMeme.selectedLineIdx].stroke = "yes";
  } else {
    currMeme.txts[currMeme.selectedLineIdx].stroke = "no";
  }
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonAdd() {
  var currMeme = getCurrMeme();
  addLine();
  var el = document.querySelector(".text-insertion");
  el.value = "";
  el.focus();
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
  if (gMarkInterval) clearInterval(gMarkInterval);
  gMarkInterval = setInterval(function() {
    // makes the text flashing
    gIsMarked = !gIsMarked;
    renderEditingCanvas(getCurrMeme().selectedImgId);
  }, 70);

  gTimeout = setTimeout(function() {
    clearInterval(gMarkInterval);
    gIsMarked = false;
    renderEditingCanvas(getCurrMeme().selectedImgId);
    clearTimeout(gTimeout);
  }, 520);
}

function onButtonDel() {
  var currMeme = getCurrMeme();

  if (currMeme.txts.length > 0) {
    currMeme.txts[currMeme.selectedLineIdx].content = "";
    document.querySelector(".text-insertion").value = "";
    renderEditingCanvas(currMeme.selectedImgId);
  }
}

function onButtonPlus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize < 90)
    currMeme.txts[currMeme.selectedLineIdx].fontSize *= 1.1;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onButtonMinus() {
  var currMeme = getCurrMeme();
  if (currMeme.txts[currMeme.selectedLineIdx].fontSize > 12)
    currMeme.txts[currMeme.selectedLineIdx].fontSize /= 1.1;
  renderEditingCanvas(currMeme.selectedImgId);
}

function onColorChange(val) {
  var currMeme = getCurrMeme();
  currMeme.txts[currMeme.selectedLineIdx].color = val;
  renderEditingCanvas(currMeme.selectedImgId);
  document.querySelector(".input-color").value = val;
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

function onFontSelection(el) {
  var idx = el.selectedIndex;
  var fonts = [
    "Impact",
    "Roboto",
    "Arimo",
    "Rubik",
    "Gloria Hallelujah",
    "Russo One",
    "Roboto Mono",
    "Shrikhand",
    "Varela Round",
    "Indie Flower",
    "Eater",
    "Anton",
    "Lobster",
    "Pacifico",
    "Paytone One",
    "Shadows Into Light",
    "Dancing Script",
    "Acme",
    "Arial",
    "Times New Roman",
    "David"
  ];
  var currMeme = getCurrMeme();
  currMeme.txts[currMeme.selectedLineIdx].fontFamily = fonts[idx];
  renderEditingCanvas(currMeme.selectedImgId);
}

function onContactSend() {
  var name = document.querySelector(".contact-me .name").value;
  var email = document.querySelector(".contact-me .email").value;
  var subject = document.querySelector(".contact-me .subject").value;
  var message = document.querySelector(".contact-me .message").value;
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`
  );
}
