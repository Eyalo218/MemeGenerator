"use strict";
var gKeyWords = []; //i dont need that, will only need the map and use function to render it automaticly
var gKeyWordsMap = {};
var gImgs = [
  { id: 1, url: "img/2.jpg", keyWords: ["happy", "look at all"] },
  { id: 2, url: "img/003.jpg", keyWords: ["stupid"] },
  { id: 3, url: "img/004.jpg", keyWords: ["happy", "animal", "cute"] },
  { id: 4, url: "img/005.jpg", keyWords: ["animal", "cute"] },
  { id: 5, url: "img/5.jpg", keyWords: ["happy", "success"] },
  { id: 6, url: "img/006.jpg", keyWords: ["cute", "animal"] },
  { id: 7, url: "img/8.jpg", keyWords: ["happy"] },
  { id: 8, url: "img/9.jpg", keyWords: ["evil", "cute"] },
  { id: 9, url: "img/12.jpg", keyWords: ["happy"] },
  { id: 10, url: "img/19.jpg", keyWords: ["angry", "wtf"] },
  { id: 11, url: "img/Ancient-Aliens.jpg", keyWords: ["aliens"] },
  { id: 12, url: "img/drevil.jpg", keyWords: ["evil"] },
  { id: 13, url: "img/img2.jpg", keyWords: ["happy", "cute"] },
  { id: 14, url: "img/img4.jpg", keyWords: ["happy", "stupid"] },
  { id: 15, url: "img/img5.jpg", keyWords: ["happy", "cute"] },
  { id: 16, url: "img/img6.jpg", keyWords: ["cute", "animal"] },
  { id: 17, url: "img/img11.jpg", keyWords: ["happy", "stupid"] },
  { id: 18, url: "img/img12.jpg", keyWords: ["happy"] },
  { id: 19, url: "img/leo.jpg", keyWords: ["happy"] },
  { id: 20, url: "img/meme1.jpg", keyWords: ["matrix"] },
  { id: 21, url: "img/One-Does-Not-Simply.jpg", keyWords: ["lotr"] },
  { id: 22, url: "img/Oprah-You-Get-A.jpg", keyWords: ["happy"] },
  { id: 23, url: "img/patrick.jpg", keyWords: ["happy"] },
  { id: 24, url: "img/putin.jpg", keyWords: ["evil"] },
  { id: 25, url: "img/X-Everywhere.jpg", keyWords: ["happy", "cute "] },
  { id: 26, url: "img/ca02.jpg", keyWords: ["happy"] },
  { id: 27, url: "img/ca03.jpg", keyWords: ["happy"] },
  { id: 28, url: "img/ca04.jpg", keyWords: ["happy"] },
  { id: 29, url: "img/ca05.jpg", keyWords: ["happy"] },
  { id: 30, url: "img/ca06.jpg", keyWords: ["happy"] },
  { id: 31, url: "img/ca07.jpg", keyWords: ["happy"] },
  { id: 32, url: "img/ca01.jpg", keyWords: ["happy"] }
];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  txts: [
    {
      lineIdx: 0,
      content: "",
      fontFamily: "impact",
      fontSize: 35,
      posHor: 0.5,
      posVert: 0.2,
      color: "white",
      shadow: "no",
      stroke: "yes"
    }
  ]
};

function setSearchKeysForRendering() {
  var htmlSTR = '<option value="all">';
  var keywords = [];
  for (let key in gKeyWordsMap) {
    if (keywords.indexOf(key) === -1) keywords.push[key];
    htmlSTR += `<option value="${key}">`;
  }
  return htmlSTR;
}

function setImagesForRendering() {
  var strHTML = "";
  for (let i = 0; i < gImgs.length; i++) {
    let img = gImgs[i];
    strHTML += `<div id="${img.id}" data-src="${
      img.url
    }" onclick="togglePages(${img.id})" 
        style="background-image:url(${img.url})"''/></div>`;
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
  var strHTML = "";
  if (sortBy !== "all") {
    for (let i = 0; i < gImgs.length; i++) {
      var currImg = gImgs[i];
      for (let j = 0; j < currImg.keyWords.length; j++) {
        if (currImg.keyWords[j].indexOf(sortBy) !== -1) {
          strHTML += `<div id="${currImg.id}" data-src="${
            currImg.url
          }" onclick="togglePages(${currImg.id})" 
                             style="background-image:url(${
                               currImg.url
                             })"''/></div>`;
          break;
        }
      }
    }
  } else strHTML = setImagesForRendering();
  return strHTML;
}

function getCurrMeme() {
  return gMeme;
}

function setkeyWordsMap() {
  for (let i = 0; i < gImgs.length; i++) {
    let currImg = gImgs[i];
    for (let j = 0; j < currImg.keyWords.length; j++) {
      if (!gKeyWordsMap[currImg.keyWords[j]])
        gKeyWordsMap[currImg.keyWords[j]] = 0;
      gKeyWordsMap[currImg.keyWords[j]]++;
    }
  }
}

function getPopularKeyWordlist() {
  var keyWords = [];
  for (let key in gKeyWordsMap) {
    if (keyWords.length < 6) {
      keyWords.push({ key: key, searchAmount: 0 });
      keyWords.sort(function(a, b) {
        return gKeyWordsMap[a.key] > gKeyWordsMap[b.key];
      });
    } else {
      if (gKeyWordsMap[key] > gKeyWordsMap[keyWords[0].key])
        keyWords[0] = { key: key, searchAmount: 0 };
      keyWords.sort(function(a, b) {
        return gKeyWordsMap[a.key] > gKeyWordsMap[b.key];
      });
    }
  }
  return keyWords;
}

function setKeyWordsForRendering(keyWords) {
  var htmlSTR = "";
  for (let i = 0; i < keyWords.length; i++) {
    htmlSTR += `<li onclick="filterBy(this)" value=${
      keyWords[i].searchAmount
    }>${keyWords[i].key}</li>`;
  }
  return htmlSTR;
}

function setCurrMeme(imageId) {
  gMeme.selectedImgId = imageId;
}

function clearMeme() {
  gMeme.txts = [
    {
      lineIdx: 0,
      content: "",
      fontFamily: "impact",
      fontSize: 35,
      posHor: 0.5,
      posVert: 0.2,
      color: "white",
      shadow: "no",
      stroke: "yes"
    }
  ];
  gMeme.selectedLineIdx = 0;
}

function addLine() {
  var currColor = gMeme.txts[gMeme.selectedLineIdx].color;
  var currFontSize = gMeme.txts[gMeme.selectedLineIdx].fontSize;
  var lineIdx = gMeme.txts.length;
  if (gMeme.txts.length === 1) var birthPos = 0.9;
  else var birthPos = 0.55;
  gMeme.txts.push({
    lineIdx: lineIdx,
    content: "--New Line--",
    fontFamily: "impact",
    fontSize: currFontSize,
    posHor: 0.5,
    posVert: birthPos,
    color: currColor,
    shadow: "no",
    stroke: "yes"
  });
  gMeme.selectedLineIdx = lineIdx;
}


function saveToStorage(value) {
    localStorage.setItem('searchClicks', JSON.stringify(value));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('searchClicks'));
}