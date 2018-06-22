"use strict";

function togglePages(photoId) {
  var elMain = document.querySelector("main");
  var elEditor = document.querySelector("editor");
  elMain.classList.toggle("hidden");
  elEditor.classList.toggle("hidden");
  if (photoId !== undefined) renderEditingCanvas(photoId);
  else document.querySelector('.text-insertion').value = '';
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



function sortBy(elListItem){
  let size = elListItem.style.fontSize
  if (size === '') size='large';
  else if (size === 'large') size='x-large';
  else if (size === 'x-large') size='xx-large';
  elListItem.style.fontSize = size;
}
function onTextInsertion(ev){
  var currMeme = getCurrMeme();
  var inputTxt = document.querySelector('.text-insertion');
  currMeme.txts[0].line = inputTxt.value;
  console.log(currMeme);
  
  renderEditingCanvas(currMeme.selectedImgId);
return;
}
var x
function downloadMeme(){
  var elWE = document.querySelector('#canvas');
  x = elWE.toDataURL();
  var imgOrURL= x;
  window.win - open(imgOrURL);
  setTimeout('win.document.execCommand("SaveAs")', 0);
}


