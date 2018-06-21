'use strict'

function openEditor(photoId) {
    var elMain = document.querySelector('main');
    var elEditor = document.querySelector('editor');
    elMain.classList.toggle('hidden');
    elEditor.classList.toggle('hidden');
    renderEditingCanvas(photoId);
}

function closeEditor() {
    var elMain = document.querySelector('main');
    var elEditor = document.querySelector('editor');
    elMain.classList.toggle('hidden');
    elEditor.classList.toggle('hidden');
}

function renderGallery() {
    var elGallery = document.querySelector('.meme-container');
    elGallery.innerHTML = setImagesForRendering();
}

var gsizetest;
function renderEditingCanvas(id) {
    var elCanvasContainer = document.querySelector('.canvas-container');
    var img = document.createElement('img');
    img.src = getImageById(id).url;
    img.onload = function() {
        var elCanvas = document.getElementById('canvas');
        elCanvas.width = elCanvasContainer.offsetWidth;
        elCanvas.height = elCanvasContainer.offsetHeight;
        gsizetest = elCanvasContainer;
        var ctx = elCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, elCanvas.width-2, elCanvas.height-2);
    }
    // var img = new Image ();
    // img.src = getImageById(id).url;
    // console.log('img.src=',img.src);
    // var elCanvas = document.querySelector('#canvas');
    // var elCanvasContainer = document.querySelector('.canvas-container');
    // var ctx = elCanvas.getContext('2d');
    // // img.onload = function () {
    //     console.log('canvas container = ', elCanvasContainer.offsetWidth);

    //     elCanvas.width = elCanvasContainer.offsetWidth;
    //     elCanvas.height = img.height;
    //     // ctx.drawImage(img, 0, 0,elCanvas.width, elCanvas.height);
    //     var pat=ctx.createPattern(img,'no-repeat');
    //     ctx.rect(0,0,elCanvas.width,elCanvas.height);
    //     ctx.fillStyle=pat;
    //     ctx.fill();

    // ctx.scale(2);
    // }
    // ctx.drawImage(img,0,0);
}

