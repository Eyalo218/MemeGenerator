'use strict'

var gImgs = [
    { id: 1, url: 'img/2.jpg', keywords: ['happy','look at all'] },
    { id: 2, url: 'img/003.jpg', keywords: ['stupid'] },
    { id: 3, url: 'img/004.jpg', keywords: ['happy', 'animal','cute'] },
    { id: 4, url: 'img/005.jpg', keywords: ['animal', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy', 'success'] },
    { id: 6, url: 'img/006.jpg', keywords: ['cute', 'animal'] },
    { id: 7, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/9.jpg', keywords: ['evil', 'cute'] },
    { id: 9, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/19.jpg', keywords: ['angry','wtf'] },
    { id: 11, url: 'img/Ancient-Aliens.jpg', keywords: ['aliens'] },
    { id: 12, url: 'img/drevil.jpg', keywords: ['evil'] },
    { id: 13, url: 'img/img2.jpg', keywords: ['happy', 'cute'] },
    { id: 14, url: 'img/img4.jpg', keywords: ['happy','stupid'] },
    { id: 15, url: 'img/img5.jpg', keywords: ['happy','cute'] },
    { id: 16, url: 'img/img6.jpg', keywords: ['cute','animal'] },
    { id: 17, url: 'img/img11.jpg', keywords: ['happy','stupid'] },
    { id: 18, url: 'img/img12.jpg', keywords: ['happy'] },
    { id: 19, url: 'img/leo.jpg', keywords: ['happy'] },
    { id: 20, url: 'img/meme1.jpg', keywords: ['matrix'] },
    { id: 21, url: 'img/One-Does-Not-Simply.jpg', keywords: ['lotr'] },
    { id: 22, url: 'img/Oprah-You-Get-A.jpg', keywords: ['happy'] },
    { id: 23, url: 'img/patrick.jpg', keywords: ['happy'] },
    { id: 24, url: 'img/putin.jpg', keywords: ['evil'] },
    { id: 25, url: 'img/X-Everywhere.jpg', keywords: ['happy','cute '] }
];

var gMeme = {
    selectedImgId: 5,
    txts: [
        { line: 'I never eat Falafel', fontFamily: 'impact', fontSize: 40, alignHor: 'center', posVert: 0.13, color: 'red' },
        { line: 'But Im Hungry', fontFamily: 'arial', fontSize: 50, alignHor: 'center', posVert: 0.9, color: 'yellow' }
    ]
}


function setImagesForRendering() {

    //i need to add the sorting render .. will do it later
    var strHTML = '';
    for (let i = 0; i < gImgs.length; i++) {
        let img = gImgs[i];
        strHTML += `<img id="${img.id}" src="${img.url}" onclick="togglePages(${img.id})"/>`
    }
    return strHTML;

}

function getImageById(id) {
    for (let i = 0; i < gImgs.length; i++) {
        if (gImgs[i].id === id) return gImgs[i];
    }
    return null;
}

function setImagesForSorting(sortBy) {
    var strHTML = '';
    for (let i = 0; i < gImgs.length; i++) {
        var currImg = gImgs[i];
        for (let j = 0; j < currImg.keywords.length; j++) {
            if (currImg.keywords[j].indexOf(sortBy) !== -1) {
                strHTML += `<img id="${currImg.id}" src="${currImg.url}" onclick="togglePages(${currImg.id})"/>`
                break;
            }
        }
    }
    return strHTML;
}

function getCurrMeme(){
    return gMeme;
}
