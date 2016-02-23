'use strict';

var fs = require('fs');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

if (process.argv.length>2) {
	
	var word = process.argv[2];

	var infile = './dict/words8';
	console.log('Processing '+infile);
	var input = [];
	input = fs.readFileSync(infile,'utf8').split('\n');
	console.log('Words: '+input.length);
	
	var lookup = [];
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

	for (var l=0;l<26;l++) {
		var addLetter = String.fromCharCode('a'.charCodeAt(0)+l);
		var newLookup = (wordLookup+addLetter).split('').sort().join('');
		//console.log('Checking addition of ' + addLetter + ' ' + newLookup);
		for (var i=0;i<input.length;i++) {
			if (lookup[i] == newLookup) {
				console.log(wordLookup + ' + ' + addLetter + ' -> ' + input[i]);
			}
		}
		
	}
}
else {
	console.log('Usage: scrabble word');
}