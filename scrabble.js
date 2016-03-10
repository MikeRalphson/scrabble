'use strict';

var fs = require('fs');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var input = [];
var lookup = [];
var seen = [];

function addLetters(wordLookup,original,limit,display) {
	for (var l=0;l<26;l++) {
		var addLetter = String.fromCharCode('a'.charCodeAt(0)+l);
		var newLookup = (wordLookup+addLetter).split('').sort().join('');
		if (newLookup.length<limit) {
			addLetters(newLookup,original,limit,addLetter + ' + ' + display);
		}
		for (var i=0;i<input.length;i++) {
			if ((lookup[i] == newLookup) && (seen.indexOf(input[i]) < 0)) {
				seen.push(input[i]);
				console.log(original + ' + ' + display + addLetter + ' -> ' + input[i]);
			}
		}
	}
}

if (process.argv.length>2) {

	var word = process.argv[2];

	var infile = './dict/words8';
	console.log('Processing '+infile);
	input = fs.readFileSync(infile,'utf8').split('\n');
	console.log('Words: '+input.length);

	var temp = [];
	for (var i=0;i<input.length;i++) {
		temp = input[i].split(',');
		input[i] = temp[0];
		lookup.push(temp[1]);
	}

	var wordLookup = word.split('').sort().join('');

	//console.log(word + ' ' + wordLookup);

	for (var i=0;i<input.length;i++) {
		if (lookup[i] == wordLookup) {
			console.log(wordLookup + ' -> ' + input[i]);
		}
	}

	for (var i=wordLookup.length;i<9;i++) {
		addLetters(wordLookup,wordLookup,i,'');
	}
	
	// check 6 letter words8
	var first = false;
	for (var i=0;i<wordLookup.length;i++) {
		var s = wordLookup;
		s = s.substring(0,i)+s.substring(i+1);
		for (var j=0;j<lookup.length;j++) {
			if ((lookup[j] == s) && (seen.indexOf(input[j])<0)) {
				if (first) {
					console.log('------');
					first = false;
				}
				console.log(input[j]);
				seen.push(input[j]);
			}
		}
		addLetters(s,s,7,'');
	}

}
else {
	console.log('Usage: scrabble {letters}');
}