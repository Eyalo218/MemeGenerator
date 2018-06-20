'used strict'

function openEditor(photo){
    var elMain = document.querySelector('main');
    var elEditor = document.querySelector('editor');
    elMain.classList.toggle('hidden');
    elEditor.classList.toggle('hidden');

    
}

function closeEditor(){
    var elMain = document.querySelector('main');
    var elEditor = document.querySelector('editor');
    elMain.classList.toggle('hidden');
    elEditor.classList.toggle('hidden');
    
}

function renderGallery(){
    var elGallery = document.querySelector('.meme-container');
    elGallery.innerHTML = setImagesForRendering();
}


