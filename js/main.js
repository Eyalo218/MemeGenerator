'use strict'


function togglePages(photoId) {
  var elMain = document.querySelector("main");
  var elEditor = document.querySelector("editor");
  elMain.classList.toggle("hidden");
  elEditor.classList.toggle("hidden");
  if (photoId!==undefined) renderEditingCanvas(photoId);
}



function renderGallery() {
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForRendering();
}

//need to add the text rendering seperatly.

function renderText(){}

function renderEditingCanvas(id) {
  var img = new Image();
  img.src = getImageById(id).url;
  console.log("img.src=", img.src);
  var elCanvas = document.querySelector("#canvas");
  var elCanvasContainer = document.querySelector(".canvas-container");
  var ctx = elCanvas.getContext("2d");
  img.onload = function () {
    if (img.width > window.innerWidth ) {
      var oversized = img.width / (window.innerWidth );
      img.height = img.height / oversized;
      img.width = img.width / oversized;
    }

    elCanvas.height = img.height;
    elCanvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    ctx.font = '48px impact';
    ctx.fillStyle = '#7f0f0f';
    ctx.textAlign = 'center';
    ctx.fillText('Hello world...', canvas.width / 2, canvas.height * 0.2);
    ctx.fillText('I\'ll Be Back...', canvas.width / 2, canvas.height * 0.85);

    ctx.fillStyle = 'yellow';
    ctx.fillText('Hello world...', canvas.width / 2 - 3, canvas.height * 0.2 - 4);
    ctx.fillText('I\'ll Be Back...', canvas.width / 2 - 3, canvas.height * 0.85 - 4);
  }
}

function toggleMenu(ev) {
  ev.stopPropagation();
  var elMenu = document.querySelector('.menu');
  elMenu.classList.toggle('hidden');
}


function renderByTag(elText){
  var elGallery = document.querySelector(".meme-container");
  elGallery.innerHTML = setImagesForSorting(elText.value);
}