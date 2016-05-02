'use strict';

var natural = require('natural');

// input will always be array
module.exports = function(input) {
	console.log('this is input');
	let reviews = input;
	let finalArray = [];
	let wordArray;
	let stringSum = '';

	reviews.forEach(function(review) {
		stringSum += review.people + review.time + review.quality + review.soul;
	});

	wordArray = natural.PorterStemmer.tokenizeAndStem(stringSum);

	let length = wordArray.length;
	let wordMap = {};
	let i = 0;

	while (i < length) {
		if (!wordMap[wordArray[i]]) {
			wordMap[wordArray[i]] = 1;
		}
		else {
			wordMap[wordArray[i]]++;
		}
		i++;
	}

	for (let prop in wordMap) {
		let tokenWord = {};

		tokenWord.count = wordMap[prop];
		tokenWord.text = prop;
		tokenWord.size = wordMap[prop]/length * 100 + 10 ;

		finalArray.push(tokenWord);
	}

	return finalArray;
};
