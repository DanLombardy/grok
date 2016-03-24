"use strict";

var natural = require('natural');


module.exports = function(inputObj) {

  let finalArray = [];


  finalArray.push(inputObj)
  let count= 0;


  for(var obj in inputObj){
    let wordObj = {},
        wordArray = natural.PorterStemmer.tokenizeAndStem(inputObj[obj].value),
        i = 0;

        let length = wordArray.length;

        while(i < length){
          if(!wordObj[wordArray[i]]){
            wordObj[wordArray[i]] = 0;
          }
          wordObj[wordArray[i]]++;
          ++i;
        }

        for (let prop in wordObj){
          let finalObj = {};
          finalObj.text = prop;
          finalObj.wordCount = wordObj[prop];
          finalObj.color = inputObj[obj].color;

          console.log("build final obj")
          console.log(finalObj);
          finalArray.push(finalObj);
        }
        count+= i;
  }

  finalArray.forEach(function(obj){
    obj.size = obj.wordCount/count * 300;
  })

  finalArray[0]["totalWordCount"] = count;
  return finalArray;
};
