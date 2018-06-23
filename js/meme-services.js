'use strict'
var gKeyWords = []
var gImgs = [
    { id: 1, url: 'img/2.jpg', keywords: ['happy', 'look at all'] },
    { id: 2, url: 'img/003.jpg', keywords: ['stupid'] },
    { id: 3, url: 'img/004.jpg', keywords: ['happy', 'animal', 'cute'] },
    { id: 4, url: 'img/005.jpg', keywords: ['animal', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy', 'success'] },
    { id: 6, url: 'img/006.jpg', keywords: ['cute', 'animal'] },
    { id: 7, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/9.jpg', keywords: ['evil', 'cute'] },
    { id: 9, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/19.jpg', keywords: ['angry', 'wtf'] },
    { id: 11, url: 'img/Ancient-Aliens.jpg', keywords: ['aliens'] },
    { id: 12, url: 'img/drevil.jpg', keywords: ['evil'] },
    { id: 13, url: 'img/img2.jpg', keywords: ['happy', 'cute'] },
    { id: 14, url: 'img/img4.jpg', keywords: ['happy', 'stupid'] },
    { id: 15, url: 'img/img5.jpg', keywords: ['happy', 'cute'] },
    { id: 16, url: 'img/img6.jpg', keywords: ['cute', 'animal'] },
    { id: 17, url: 'img/img11.jpg', keywords: ['happy', 'stupid'] },
    { id: 18, url: 'img/img12.jpg', keywords: ['happy'] },
    { id: 19, url: 'img/leo.jpg', keywords: ['happy'] },
    { id: 20, url: 'img/meme1.jpg', keywords: ['matrix'] },
    { id: 21, url: 'img/One-Does-Not-Simply.jpg', keywords: ['lotr'] },
    { id: 22, url: 'img/Oprah-You-Get-A.jpg', keywords: ['happy'] },
    { id: 23, url: 'img/patrick.jpg', keywords: ['happy'] },
    { id: 24, url: 'img/putin.jpg', keywords: ['evil'] },
    { id: 25, url: 'img/X-Everywhere.jpg', keywords: ['happy', 'cute '] },
    { id: 26, url: 'img/ca02.jpg', keywords: ['happy'] },
    { id: 27, url: 'img/ca03.jpg', keywords: ['happy'] },
    { id: 28, url: 'img/ca04.jpg', keywords: ['happy'] },
    { id: 29, url: 'img/ca05.jpg', keywords: ['happy'] },
    { id: 30, url: 'img/ca06.jpg', keywords: ['happy'] },
    { id: 31, url: 'img/ca07.jpg', keywords: ['happy'] },
    { id: 32, url: 'img/ca01.jpg', keywords: ['happy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    txts: [
        { lineIdx: 0, content: '', fontFamily: 'impact', fontSize: 35, posHor: 0.5,
         posVert: 0.55, color: 'yellow', shadow: 'no', stroke: 'no'
         }
    ]
}


function setImagesForRendering() {

    var strHTML = '';
    for (let i = 0; i < gImgs.length; i++) {
        let img = gImgs[i];
        strHTML += `<div id="${img.id}" data-src="${img.url}" onclick="togglePages(${img.id})" 
        style="background-image:url(${img.url})"''/></div>`
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

function getCurrMeme() {
    return gMeme;
}

// need to sort this out.

// function getKeyWords() {
//     console.log('llala');
//     for (let i = 0; i < gImgs.length; i++) {
//         let currImg = gImgs[i];
//         for (let j = 0; j < currImg.keywords; j++) {
//             console.log(currImg.keywords[j]);
//             if (gKeyWords.indexOf(currImg.keywords[j] === -1))
//                 gKeyWords.push(currImg.keywords[j]);
//         }
//     }
// }


function setCurrMeme(imageId) {
    gMeme.selectedImgId = imageId;
}

function clearMeme(){
gMeme.txts = [
        { lineIdx: 0, content: '', fontFamily: 'impact', fontSize: 35, posHor: 0.5,
         posVert: 0.55, color: 'red', shadow: 'no', stroke: 'no'
         }
    ]
    gMeme.selectedLineIdx = 0;
}

function addLine(){
    var currColor = gMeme.txts[gMeme.selectedLineIdx].color;
    var currFontSize = gMeme.txts[gMeme.selectedLineIdx].fontSize;
    var lineIdx = gMeme.txts.length;
    gMeme.txts.push(
        { lineIdx: lineIdx, content: '--New Line--', fontFamily: 'impact', fontSize: currFontSize, posHor: 0.5,
         posVert: 0.55, color: currColor, shadow: 'no', stroke: 'no'
         }
    );
    gMeme.selectedLineIdx = lineIdx;
}
